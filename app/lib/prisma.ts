
import {PrismaClient, programs} from '@prisma/client';
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import { SkillDTO } from '@/data/dtos/SkillDTO';
import { EducationProviderDTO } from '@/data/dtos/EducationProviderDTO';
import { GeneralProgramDTO } from '@/data/dtos/GeneralProgramDTO';
import { v4 as uuidv4 } from 'uuid';

// used singleton pattern to avoid connection timeouts due to reaching connection limit
const prisma: PrismaClient = getPrismaClient();

export async function searchSkills(searchTerm:string): Promise<SkillDTO[]> {
  const MAX_RESULTS = 10;

  if (searchTerm.length === 0) {
    return [];
  }
  else {
    const exactResults = (await prisma.skills.findMany({
      where: {
        OR: [
          {
            skill_name:{
              equals: searchTerm
            }
          },
          {
            skill_name:{
              startsWith: searchTerm + " ("
            }
          },
          {
            skill_name:{
              contains: "(" + searchTerm + ")"
            }
          }
        ]
      },
      take: 5
    })).sort((itemA : SkillDTO, itemB : SkillDTO) => {
      if (itemA.skill_name > itemB.skill_name) {
        return 1;
      }
      if (itemA.skill_name < itemB.skill_name) {
        return -1;
      }
      return 0;
    });

    const startsWithResults = (await prisma.skills.findMany({
      where: {
        AND: [
          {
            skill_name:{
              startsWith: searchTerm
            }
          },
          {
            NOT: {
              skill_name:{
                equals: searchTerm
              }
            }
          },
          {
            NOT: {
              skill_name:{
                startsWith: searchTerm + " ("
              }
            }
          },
          {
            NOT: {
              skill_name:{
                contains: "(" + searchTerm + ")"
              }
            }
          }
        ]
      },
      take: MAX_RESULTS - exactResults.length
    })).sort((itemA : SkillDTO, itemB : SkillDTO) => {
      if (itemA.skill_name > itemB.skill_name) {
        return 1;
      }
      if (itemA.skill_name < itemB.skill_name) {
        return -1;
      }
      return 0;
    });

    const containsResults =
      (exactResults.length + startsWithResults.length < MAX_RESULTS) ?
        (await prisma.skills.findMany({
          where: {
            AND: [
              {
                skill_name: {
                  contains: searchTerm
                }
              },
              {
                NOT: {
                  skill_name: {
                    startsWith: searchTerm
                  }
                }
              },
              {
                NOT: {
                  skill_name:{
                    contains: "(" + searchTerm + ")"
                  }
                }
              }
            ]
          },
          take: MAX_RESULTS - exactResults.length - startsWithResults.length
        })).sort((itemA : SkillDTO, itemB : SkillDTO) => {
          if (itemA.skill_name > itemB.skill_name) {
            return 1;
          }
          if (itemA.skill_name < itemB.skill_name) {
            return -1;
          }
          return 0;
        })
      : []
    // Had to query them separately to guarantee Exact and StartsWith
    //   matches were found since I'm limiting the results, and OR
    //   clauses do not guarantee results in the order of the filters
    return [...exactResults, ...startsWithResults, ...containsResults];
  }
}

export async function searchEduProviders(searchTerm:string): Promise<EducationProviderDTO[]> {
  const MAX_RESULTS = 10;
  if (searchTerm.length === 0) {
    return [];
  }
  else {
    const exactResults = (await prisma.edu_providers.findMany({
      where: {
        name:{
          equals: searchTerm
        }
      },
      take: 1
    })).map(eduProvider => ({
      id: eduProvider.id,
      name: eduProvider.name
    }));

    const startsWithResults = (await prisma.edu_providers.findMany({
      where: {
        AND: [
          {
            name:{
              startsWith: searchTerm
            }
          },
          {
            NOT: {
              name:{
                equals: searchTerm
              }
            }
          }
        ]
      },
      take: MAX_RESULTS - exactResults.length
    })).sort((itemA : EducationProviderDTO, itemB : EducationProviderDTO) => {
      const itemAName = itemA.name ?? "ZZZZZ";
      const itemBName = itemB.name ?? "ZZZZZ";
      if (itemAName > itemBName) {
        return 1;
      }
      if (itemAName < itemBName) {
        return -1;
      }
      return 0;
    }).map(eduProvider => ({
      id: eduProvider.id,
      name: eduProvider.name
    }));

    const containsResults =
      (exactResults.length + startsWithResults.length < MAX_RESULTS) ?
        (await prisma.edu_providers.findMany({
          where: {
            AND: [
              {
                name: {
                  contains: searchTerm
                }
              },
              {
                NOT: {
                  name: {
                    startsWith: searchTerm
                  }
                }
              }
            ]
          },
          take: MAX_RESULTS - exactResults.length - startsWithResults.length
        })).sort((itemA : EducationProviderDTO, itemB : EducationProviderDTO) => {
          const itemAName = itemA.name ?? "ZZZZZ";
          const itemBName = itemB.name ?? "ZZZZZ";
          if (itemAName > itemBName) {
            return 1;
          }
          if (itemAName < itemBName) {
            return -1;
          }
          return 0;
        }).map(eduProvider => ({
          id: eduProvider.id,
          name: eduProvider.name
        }))
      : []
    // Had to query them separately to guarantee Exact and StartsWith
    //   matches were found since I'm limiting the results, and OR
    //   clauses do not guarantee results in the order of the filters
    return [...exactResults, ...startsWithResults, ...containsResults];
  }
}

export async function searchEduProviderHighSchoolPrograms(searchTerm:string): Promise<GeneralProgramDTO[]> {
  return searchPrograms(searchTerm);
}

export async function searchEduProviderCollegePrograms(searchTerm:string): Promise<GeneralProgramDTO[]> {
  return searchPrograms(searchTerm);
}

export async function searchEduProviderPreApprenticeshipPrograms(searchTerm:string): Promise<GeneralProgramDTO[]> {
    return searchPrograms(searchTerm);
}

export async function searchPrograms(searchTerm:string): Promise<programs[]> {
  const MAX_RESULTS = 10;
  if (searchTerm.length === 0) {
    return [];
  }
  else {
    const exactResults = (await prisma.programs.findMany({
      where: {
          title:{
          equals: searchTerm
        }
      },
      take: 1
    }));

    const startsWithResults = (await prisma.programs.findMany({
      where: {
        AND: [
          {
            title:{
              startsWith: searchTerm
            }
          },
          {
            NOT: {
                title:{
                equals: searchTerm
              }
            }
          }
        ]
      },
      take: MAX_RESULTS - exactResults.length
    })).sort((itemA : programs, itemB : programs) => {
      const itemAName = itemA.title ?? "ZZZZZ";
      const itemBName = itemB.title ?? "ZZZZZ";
      if (itemAName > itemBName) {
        return 1;
      }
      if (itemAName < itemBName) {
        return -1;
      }
      return 0;
    });

    const containsResults =
      (exactResults.length + startsWithResults.length < MAX_RESULTS) ?
        (await prisma.programs.findMany({
          where: {
            AND: [
              {
                  title: {
                  contains: searchTerm
                }
              },
              {
                NOT: {
                    title: {
                    startsWith: searchTerm
                  }
                }
              }
            ]
          },
          take: MAX_RESULTS - exactResults.length - startsWithResults.length
        })).sort((itemA : programs, itemB : programs) => {
          const itemAName = itemA.title ?? "ZZZZZ";
          const itemBName = itemB.title ?? "ZZZZZ";
          if (itemAName > itemBName) {
            return 1;
          }
          if (itemAName < itemBName) {
            return -1;
          }
          return 0;
        })
      : []
    // Had to query them separately to guarantee Exact and StartsWith
    //   matches were found since I'm limiting the results, and OR
    //   clauses do not guarantee results in the order of the filters
    return [...exactResults, ...startsWithResults, ...containsResults];
  }
}

export const jobSeekerCardViewSelect = {
    jobseeker_id: true,
    user_id: true,
    intro_headline: true,
    pathways: {
        select: {
            pathway_id: true,
            pathway_title: true,
        }
    },
    users: {
        select: {
            id: true,
            role: true,
            first_name: true,
            last_name: true,
            photo_url: true,
        },
    },
    jobseeker_education: {
        select: {
            eduProviders: {
                select: {
                    id: true,
                    name: true,
                },
            },
            id: true,
            edLevel: true,
            isEnrolled: true,
            startDate: true,
            gradDate: true,
            degreeType: true,
            programs: {
                select: {
                    id: true,
                    title: true,
                }
            }
        },
    },
    jobseeker_has_skills: {
        select: {
            skills: {
                select: {
                    skill_id: true,
                    skill_name: true,
                    skill_info_url: true,
                },
            },
        },
    },
};

export async function getAllJobSeekerCardView() {
    const jobSeekerCardViews = await prisma.jobseekers.findMany({
        select: jobSeekerCardViewSelect
    });
    return jobSeekerCardViews;
}

export async function getJobSeekerEmployerView(jobSeekerId: string) {
    const empView = await prisma.jobseekers.findFirst({
        where: {
            jobseeker_id: jobSeekerId,
        },
        select: {
            intro_headline:true,
            video_url:true,
            current_job_title: true,
            current_enrolled_ed_program: true,
            current_grade_level: true,
            years_work_exp: true,
            employment_type_sought: true,
            targeted_pathway: true,
            resume_url: true,
            portfolio_url: true,
            users: {
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    photo_url: true,
                    email: true,
                    phone: true,
                }
            },
            jobseeker_education: {
                select: {
                    eduProviders: {
                        select: {
                            name: true,
                        }
                    },
                    id: true,
                    edLevel: true,
                    preAppEdSystem: true,
                    isEnrolled: true,
                    startDate: true,
                    gradDate: true,
                    degreeType: true,
                    programs: {
                        select: {
                            id: true,
                            title: true,
                        }
                    },
                    minor: true,
                    description: true,
                }
            },
            work_experiences: {
                select: {
                    workId: true,
                    company: true,
                    jobTitle: true,
                    isInternship: true,
                    isCurrentJob: true,
                    responsibilities: true,
                    startDate:true,
                    endDate:true
                }
            },
            project_experiences: {
                select: {
                    projectId: true,
                    projTitle: true,
                    startDate: true,
                    completionDate: true,
                    teamSize: true,
                    repoUrl: true,
                    demoUrl: true,
                    problemSolvedDescription: true,
                    project_has_skills: {
                        select:
                            {
                                skills: {
                                    select: {
                                        skill_name: true,
                                        skill_info_url: true,
                                    }
                                }
                            }
                    }
                }
            },
            pathways: {
                select: {
                    pathway_title: true,
                }
            },
            jobseeker_has_skills: {
                select: {
                    skills: {
                        select: {
                            skill_id: true,
                            skill_name: true,
                            skill_info_url: true,
                        },
                    },
                },
            },

        }
    });
    return empView;
}

// intended for use with the search bar. Currently, supports searching by combinations of skills and work experience.
// If skills is [] or contains empty strings [''] will disregard and only focus on work experience.
// If work experience is not a query parameter it should be set to 0
export async function getFilteredJobSeekerCardView(skills: string[] = [], yearsWorkExp: number = 0) {
    // Normalize skills array
    const normalizedSkills = skills.filter(skill => skill && skill.trim() !== '');

    // Construct the AND conditions array
    const andConditions: any[] = [];

    // If skills are provided, add the OR condition for skills
    if (normalizedSkills.length > 0) {
        const orConditions = [
            {
                jobseeker_has_skills: {
                    some: {
                        skills: {
                            skill_name: {
                                in: normalizedSkills,
                            },
                        },
                    },
                },
            },
            {
                project_experiences: {
                    some: {
                        project_has_skills: {
                            some: {
                                skills: {
                                    skill_name: {
                                        in: normalizedSkills,
                                    }
                                },
                            },
                        },
                    },
                },
            }
        ];
        andConditions.push({OR: orConditions});
    }

    // Add the condition for years of work experience
    andConditions.push({
        years_work_exp: {
            gte: yearsWorkExp,
        }
    });


    // Filter jobseekers based on skills and years of work experience
    const filteredJobSeekers = await prisma.jobseekers.findMany({
        where: andConditions.length > 0 ? {AND: andConditions} : undefined,
        select: jobSeekerCardViewSelect
    });

    return filteredJobSeekers;
}

// returns those jobseekers with at least yearsExp in a profession
export async function getJobSeekerCardViewByWorkExperience() {

}
