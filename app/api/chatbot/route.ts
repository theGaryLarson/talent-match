import { jobseekerJobAnalysis, jobGapAnalysis } from "@/app/lib/jobseeker";
import { getCompletionsClient } from "@/app/lib/openAiClients";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { ChatCompletionTool } from "openai/resources/index.mjs";

const tools: ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "jobseekerJobMatches",
      description:
        "Get top 3 job matches for the authenticated jobseeker. Returns an array of job objects each containing jobPostingId, title, and company.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
        additionalProperties: false,
      },
      strict: true,
    },
  },
  {
    type: "function",
    function: {
      name: "jobGapAnalysis",
      description:
        "Compares the student's resume to the job description and gives a gap analysis",
      parameters: {
        type: "object",
        properties: {
          jobPostingId: {
            type: "string",
            description:
              "Exact job posting ID from jobseekerJobAnalysis results",
            pattern:
              "^[0-9a-fA-F]{8}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{12}$",
          },
        },
        required: ["jobPostingId"],
        additionalProperties: false,
      },
      strict: true,
    },
  },
];

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ reply: "Unauthorized" }, { status: 401 });
    }
    if (!session.user.jobseekerId) {
      return NextResponse.json({ reply: "Unauthorized" }, { status: 401 });
    }

    const { messages, resumeText } = await req.json();
    const client = getCompletionsClient();

    const systemContent =
      "You are a helpful assistant. You have access to tools to match jobseekers to jobs and analyze gaps. Key rules:\n" +
      "1. When user asks for top matches, call jobseekerJobAnalysis\n" +
      "2. When user asks for gap analysis, use the exact jobPostingId from previous results\n" +
      "3. Never make up job IDs - only use IDs from jobseekerJobAnalysis\n" +
      "Format responses in GitHub Flavored Markdown.";
    const systemMessage = {
      role: "system",
      content: systemContent,
    };
    const conversation = [systemMessage, ...messages];
    const initialResponse = await client.chat.completions.create({
      model: "",
      messages: conversation,
      tools,
      tool_choice: "auto",
      store: false,
    });

    const responseMessage = initialResponse.choices[0].message;
    const toolCalls = responseMessage.tool_calls;

    if (toolCalls) {
      conversation.push(responseMessage);

      // Execute each tool call and gather the results
      for (const toolCall of toolCalls) {
        let result;
        if (toolCall.function.name === "jobseekerJobMatches") {
          result = await jobseekerJobAnalysis(session.user.jobseekerId);
        } else if (toolCall.function.name === "jobGapAnalysis") {
          const args = JSON.parse(toolCall.function.arguments);
          const jobPostingId = args.jobPostingId;
          console.log(args);
          result = await jobGapAnalysis(resumeText, jobPostingId);
        }
        // Add the tool's result to the conversation history
        conversation.push({
          tool_call_id: toolCall.id,
          role: "tool",
          name: toolCall.function.name,
          content: JSON.stringify(result),
        });
      }

      // Make a second API call to get the final, user-facing response from the model
      const secondResponse = await client.chat.completions.create({
        model: "",
        messages: conversation,
      });

      return new Response(
        JSON.stringify({ reply: secondResponse.choices[0].message.content }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // If no function call needed, return direct response
    return NextResponse.json({
      reply: responseMessage.content || "I didn't get that",
    });
  } catch (error) {
    console.error("OpenAI error:", error);
    return NextResponse.json(
      { reply: "Sorry, I'm having trouble right now" },
      { status: 500 },
    );
  }
}
