import { auth } from "@/auth";
import { Role } from "@/data/dtos/UserInfoDTO";
import { NextResponse } from "next/server";
import { AzureOpenAI } from "openai";

export async function POST(request: Request) {
  const session = await auth();
  if (
    !session?.user.roles.includes(Role.CASE_MANAGER) &&
    !session?.user.roles.includes(Role.ADMIN)
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { jobDescription, resumeText } = body;

    if (!jobDescription || !resumeText) {
      return NextResponse.json(
        { message: "Missing jobDescription or resumeText in request body" },
        { status: 400 },
      );
    }

    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    const apiVersion = process.env.AZURE_OPENAI_API_VERSION;
    const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;

    if (!endpoint || !apiKey || !apiVersion || !deploymentName) {
      console.error(
        "Azure OpenAI environment variables are not fully configured.",
      );
      return NextResponse.json(
        { message: "AI service configuration error on server." },
        { status: 500 },
      );
    }

    const client = new AzureOpenAI({
      endpoint,
      apiKey,
      apiVersion,
      deployment: deploymentName,
    });

    const systemPrompt = `You are an expert HR analyst. Your task is to compare a candidate's resume with a job description.
    Provide a concise analysis highlighting the candidate's strengths (pros) and potential weaknesses or gaps (cons) concerning the specific requirements of the job description.
    Format your output clearly. For example:

    Pros:
    - [Strength 1 related to job description]
    - [Strength 2 related to job description]

    Cons:
    - [Weakness or gap 1 related to job description]
    - [Weakness or gap 2 related to job description]

    Focus solely on the information present in the resume and how it relates to the job description. Do not invent information or make assumptions beyond the provided texts.
    If the resume text is very short, seems incomplete, or provides insufficient detail for a thorough analysis, acknowledge this limitation.
    The analysis should be objective and professional.
    Keep the analysis relatively brief, aiming for a few key points for both pros and cons.`;

    const userPrompt = `Job Description:
    ---
    ${jobDescription}
    ---

    Candidate's Resume Text:
    ---
    ${resumeText}
    ---

    Please provide your analysis:`;

    const completion = await client.chat.completions.create({
      model: deploymentName,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0.2,
      max_completion_tokens: 32768,
    });

    const analysis = completion.choices[0]?.message?.content;

    if (!analysis) {
      console.error("Azure OpenAI API did not return an analysis.");
      return NextResponse.json(
        { message: "Failed to generate analysis from AI service." },
        { status: 500 },
      );
    }

    return NextResponse.json({ analysis });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 },
    );
  }
}
