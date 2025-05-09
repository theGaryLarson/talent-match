import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { auth } from "@/auth";
import { Role } from "@/data/dtos/UserInfoDTO";

const prisma = new PrismaClient();
const SIMILARITY_THRESHOLD = 0.3;

export type ICTRecommendationResult = {
  id: string;
  jobseeker_id: string;
  first_name: string;
  last_name: string;
  email: string;
  hasResume: boolean;
  pathway_title: string;
  role_id: string;
  title: string;
  jobDescription: string | null;
  final_score: number;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ roleId: string }> },
) {
  const [session, { roleId }] = await Promise.all([auth(), params]);

  if (
    !session?.user.roles.includes(Role.CASE_MANAGER) &&
    !session?.user.roles.includes(Role.ADMIN)
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!roleId) {
    return NextResponse.json({ error: "roleId is required" }, { status: 400 });
  }

  try {
    const recommendationsQuery = Prisma.sql`
          WITH JobRoleSkills AS (
            SELECT
              jrs.jobRoleId   AS role_id,
              s.skill_id      AS role_skill_id,
              s.embedding     AS role_embedding
            FROM JobRoleSkill jrs
            JOIN skills s ON jrs.skillId = s.skill_id
            WHERE s.embedding IS NOT NULL
            AND jrs.jobRoleId = ${roleId}
          ),

          JobseekerSkills AS (
            SELECT
              js.jobseeker_id AS jobseeker_id,
              s.skill_id      AS jobseeker_skill_id,
              s.embedding     AS jobseeker_embedding
            FROM jobseeker_has_skills js
            JOIN skills s ON js.skill_id = s.skill_id
            WHERE s.embedding IS NOT NULL
          ),

          BestMatchPerRoleSkill AS (
            SELECT
              jrs.role_id,
              jsk.jobseeker_id,
              jrs.role_skill_id,
              MAX(1.0 - VECTOR_DISTANCE('COSINE', jrs.role_embedding, jsk.jobseeker_embedding)) AS best_similarity_for_role_skill
            FROM JobRoleSkills jrs
            CROSS JOIN JobseekerSkills jsk
            GROUP BY
              jrs.role_id,
              jsk.jobseeker_id,
              jrs.role_skill_id
          ),

          FilteredBestMatch AS (
            SELECT
                role_id,
                jobseeker_id,
                role_skill_id,
                best_similarity_for_role_skill
            FROM BestMatchPerRoleSkill
            WHERE best_similarity_for_role_skill >= 0 AND best_similarity_for_role_skill <= 1.0
          ),

          TotalPerRole AS (
            SELECT
              jobseeker_id,
              role_id,
              SUM(best_similarity_for_role_skill) AS sum_similarity
            FROM FilteredBestMatch
            GROUP BY jobseeker_id, role_id
          ),

          RoleSkillCounts AS (
            SELECT
              role_id,
              COUNT(DISTINCT role_skill_id) AS total_role_skill_count
            FROM JobRoleSkills
            GROUP BY role_id
          ),

          FinalScores AS (
            SELECT
              tpr.jobseeker_id,
              tpr.role_id,
              jr.title,
              pw.pathway_title,
              j.hasResume,
              u.first_name,
              u.last_name,
              u.email,
              u.id,
              CASE
                WHEN rsc.total_role_skill_count > 0 THEN tpr.sum_similarity / CAST(rsc.total_role_skill_count AS float)
                ELSE 0
              END AS final_score
            FROM TotalPerRole tpr
            JOIN RoleSkillCounts rsc ON tpr.role_id = rsc.role_id
            JOIN JobRole jr          ON jr.id         = tpr.role_id
            JOIN pathways pw         ON pw.pathway_id = jr.pathwayId
            JOIN jobseekers j        ON j.jobseeker_id = tpr.jobseeker_id
            JOIN users u             ON u.id = j.user_id
            WHERE tpr.role_id = ${roleId}
          )

          SELECT
            fs.id,
            fs.jobseeker_id,
            fs.first_name,
            fs.last_name,
            fs.hasResume,
            fs.email,
            fs.role_id,
            fs.title,
            fs.pathway_title,
            fs.final_score
          FROM FinalScores fs
          WHERE fs.final_score > ${SIMILARITY_THRESHOLD}
          ORDER BY fs.final_score DESC;
        `;

    const results =
      await prisma.$queryRaw<ICTRecommendationResult[]>(recommendationsQuery);

    if (results.length === 0) {
      return NextResponse.json(
        { message: "No matching candidates found for this role." },
        { status: 200 },
      );
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching recommendations for role:", roleId, error);
    return NextResponse.json(
      { error: "Failed to fetch recommendations" },
      { status: 500 },
    );
  }
}
