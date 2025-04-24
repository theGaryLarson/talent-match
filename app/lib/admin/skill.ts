import { auth } from "@/auth";
import { Role } from "@/data/dtos/UserInfoDTO";
import {
  PrismaClient,
  PrismaPromise,
  skill_subcategories,
} from "@prisma/client";
import getPrismaClient from "../prismaClient.mjs";
import { v4 as uuidv4 } from "uuid";
import { SkillDTO } from "@/data/dtos/SkillDTO";
import { AzureOpenAI } from "openai";
const prisma: PrismaClient = getPrismaClient();

export async function adminCreateSkills(skillDataArray: SkillDTO[]) {
  const Session = await auth();
  if (!Session?.user.roles.includes(Role.ADMIN)) {
    throw new Error("Must Be Admin to complete this task");
  }
  if (!Session?.user.id) {
    throw new Error("Must Be a user to complete this task");
  }

  try {
    // First, get all existing skill names (case insensitive)
    const existingSkills = await prisma.skills.findMany({
      where: {
        skill_name: {
          in: skillDataArray.map((skill) => skill.skill_name),
        },
      },
      select: {
        skill_name: true,
      },
    });

    const existingSkillNames = new Set(
      existingSkills.map((skill) => skill.skill_name.toLowerCase()),
    );

    // Filter out skills that already exist
    const newSkills = skillDataArray.filter(
      (skill) => !existingSkillNames.has(skill.skill_name.toLowerCase()),
    );

    if (newSkills.length === 0) {
      return {
        count: 0,
        skipped: skillDataArray.length,
        message: "All skills already exist",
      };
    }

    // Create only the new skills
    const result = await prisma.skills.createMany({
      data: newSkills.map((skillData) => ({
        skill_id: uuidv4(),
        skill_name: skillData.skill_name,
        skill_subcategory_id: skillData.skill_subcategory_id || "",
        skill_info_url: skillData.skill_info_url || "",
      })),
    });

    return result;
  } catch (e) {
    console.error("Error creating skills:", e);
    throw e;
  }
}

export async function adminUpdateSkill(skillData: SkillDTO) {
  const Session = await auth();
  if (!Session?.user.roles.includes(Role.ADMIN)) {
    throw new Error("Must Be Admin to complete this task");
  }
  if (!Session?.user.id) {
    throw new Error("Must Be a user to complete this task");
  }

  try {
    const result = await prisma.skills.update({
      where: {
        skill_id: skillData.skill_id,
      },
      data: {
        skill_name: skillData.skill_name,
        skill_subcategory_id: skillData.skill_subcategory_id,
        skill_info_url: skillData.skill_info_url,
      },
    });

    return result;
  } catch (e) {
    console.error("Error updating skill:", e);
    throw e;
  }
}

export async function adminGetSkills() {
  const Session = await auth();
  if (!Session?.user.roles.includes(Role.ADMIN)) {
    throw new Error("Must Be Admin to complete this task");
  }
  if (!Session?.user.id) {
    throw new Error("Must Be a user to complete this task");
  }

  try {
    const result = await prisma.skills.findMany();
    return result;
  } catch (e) {
    console.error("Error getting skills:", e);
    throw e;
  }
}

export async function getSkillSubcategories() {
  try {
    const skillSubcategories = await prisma.skill_subcategories.findMany({
      include: {
        skills: true,
      },
    });
    return skillSubcategories;
  } catch (e) {
    console.error("Error fetching skill subcategories:", e);
    throw e;
  }
}

export async function adminCreateSkillSubcategory(
  subcategoryData: skill_subcategories,
) {
  const Session = await auth();
  if (!Session?.user.roles.includes(Role.ADMIN)) {
    throw new Error("Must Be Admin to complete this task");
  }
  if (!Session?.user.id) {
    throw new Error("Must Be a user to complete this task");
  }

  try {
    const result = await prisma.skill_subcategories.create({
      data: {
        skill_subcategory_id: uuidv4(),
        subcategory_name: subcategoryData.subcategory_name,
        subcategory_description: subcategoryData.subcategory_description,
      },
    });

    return result;
  } catch (e) {
    console.error("Error creating skill subcategory:", e);
    throw e;
  }
}

export async function generateSkillEmbeddings() {
  const endpoint = process.env.AZURE_OPENAI_EMBEDDING_ENDPOINT;
  const apiKey = process.env.AZURE_OPENAI_EMBEDDING_API_KEY;
  const apiVersion = process.env.AZURE_OPENAI_EMBEDDING_API_VERSION;
  const deploymentName = process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME;

  if (!endpoint || !apiKey || !apiVersion || !deploymentName) {
    throw new Error(
      "Missing required Azure OpenAI configuration: endpoint, apiKey, apiVersion, or deploymentName",
    );
  }
  const client = new AzureOpenAI({
    endpoint,
    apiKey,
    apiVersion,
    deployment: deploymentName,
  });

  try {
    const skills = await adminGetSkills();
    if (!skills || skills.length === 0) {
      throw new Error("No skills found");
    }
    const skill_names = skills.map((skill) => skill.skill_name);
    const skill_ids = skills.map((skill) => skill.skill_id);
    const BATCH_SIZE = 50;
    const updateOps: PrismaPromise<any>[] = [];
    // start < skill_names.length
    for (let start = 0; start < 0; start += BATCH_SIZE) {
      const batchNames = skill_names.slice(start, start + BATCH_SIZE);

      const resp = await client.embeddings.create({
        model: "",
        input: batchNames,
        dimensions: 1536,
      });

      for (const item of resp.data) {
        const idxInBatch = item.index;
        const globalIndex = start + idxInBatch;
        const skillId = skill_ids[globalIndex];
        const embedding = item.embedding;

        if (skillId == null) {
          console.warn(
            `missing skillId for index ${globalIndex} (“${batchNames[idxInBatch]}”), skipping`,
          );
          continue;
        }
        if (!Array.isArray(embedding)) {
          console.warn(`no embedding for skillId ${skillId}, skipping`);
          continue;
        }

        /*updateOps.push(
          prisma.skills.update({
            where: { skill_id: skillId },
            data: { embedding },
          }),
        );*/
      }
    }

    /*if (updateOps.length > 0) {
      await prisma.$transaction(updateOps);
      }*/
    return {
      updated: updateOps.length,
      total: skill_names.length,
    };
  } catch (error) {
    console.error("Error calling Azure OpenAI API:", error);
  }
}
