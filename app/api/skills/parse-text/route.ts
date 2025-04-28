import { parseTextForSkills, vectorSearchSkills } from "@/app/lib/prisma";
import { SkillDTO } from "@/data/dtos/SkillDTO";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { text } = body;

  const parseResult = JSON.parse((await parseTextForSkills(text)) ?? "");
  const parsedSkills = parseResult.skills || [];
  if (parsedSkills.length === 0) {
    console.log("No skills parsed from text.");
    return NextResponse.json([]);
  }
  const searchPromises = parsedSkills.map(
    async (sk: {
      skillName: string;
      subcategory: string;
    }): Promise<SkillDTO | null> => {
      try {
        const searchResults: SkillDTO[] = await vectorSearchSkills(
          sk.skillName,
        );
        if (searchResults && searchResults.length > 0) {
          return searchResults[0];
        } else {
          return null;
        }
      } catch (searchError) {
        console.error(
          `Error during vector search for skill "${sk.skillName}":`,
          searchError,
        );
        return null;
      }
    },
  );
  const allSearchResults = await Promise.all(searchPromises);
  const topSkills: SkillDTO[] = allSearchResults.filter(
    (skill): skill is SkillDTO => skill !== null,
  );
  return NextResponse.json(topSkills);
}
