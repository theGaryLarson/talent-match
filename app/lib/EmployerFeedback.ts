import { Prisma, PrismaClient } from "@prisma/client";
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import { auth } from "@/auth";
const prisma:PrismaClient = getPrismaClient();
export async function getictjobs(){
    try{
    const res = await prisma.jobRole.findMany({include:{skills:{
        include:{
            skill:{
                select:{
                    skill_name:true
                }
            }
        }
    }}})
    return res;
    }catch(e){
        return []
    }
}


type SkillRatings = {
  [key: string]: number; // key is skill ID, value is the rating (likely between 1-5)
};


interface FeedbackResult {
  success: boolean;
  message: string;
}

export async function TakeEmployerFeedBack(
  jobRoleId: string,
  skillRatings: SkillRatings,
  projectedHires: number
): Promise<FeedbackResult> {
  try {

    const session = await auth()
    if(!session?.user.id) return{
        success:false,
        message:"user id needed"
    } 
    
    const submiterId = session.user.id;
        const validSkills = await prisma.skills.findMany({
      select: {
        skill_id: true,
      },
    });

    // Convert validSkills to a set for fast lookup
    const validSkillIds = new Set(validSkills.map((skill) => skill.skill_id));
    console.log(Object.entries(skillRatings))
    // Filter the skillRatings to only include valid skillIds
    const feedbacks = Object.entries(skillRatings)
      .filter(([skillId]) => validSkillIds.has(skillId))
      .map(([skillId, likertRating]) => ({
        jobRoleId,
        skillId,
        likertRating,
        submiterid: submiterId,
      }));

    console.log("Multiple feedbacks inserted successfully:", feedbacks);
    return {
      success: true,
      message: 'Feedback processed successfully.',
    };
  } catch (error) {
    console.error('Error in processing feedback:', error);
    return {
      success: false,
      message: 'An error occurred while processing feedback.',
    };
  }
}