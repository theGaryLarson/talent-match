import {
  companies,
  edu_providers,
  PostalGeoData,
  PrismaClient,
  programs,
  skills,
} from '@prisma/client';
import getPrismaClient from '@/app/lib/prismaClient.mjs';
import { SkillDTO } from '@/data/dtos/SkillDTO';
import { EducationProviderDTO } from '@/data/dtos/EducationProviderDTO';
import { CompanyDropdownDTO } from '@/data/dtos/CompanyDropdownDTO';

import { GeneralProgramDTO } from '@/data/dtos/GeneralProgramDTO';
import { v4 as uuidv4 } from 'uuid';
import {Role} from "@/data/dtos/UserInfoDTO";

// used singleton pattern to avoid connection timeouts due to reaching connection limit
const prisma: PrismaClient = getPrismaClient();

type SearchOptions<T> = {
  searchTerm: string;
  entity: keyof PrismaClient;
  fields: (keyof T)[];
  maxResults: number;
  exactMatchOnly?: boolean;
  sortField?: keyof T;
};

// Utility function for sorting by name
function sortByName<T>(array: T[], field: keyof T): T[] {
  return array.sort((a, b) =>
    (a[field] as string).localeCompare(b[field] as string),
  );
}

// Generic search function with sorting
async function genericSearch<T>({
  searchTerm,
  entity,
  fields,
  maxResults,
  exactMatchOnly,
  sortField,
}: SearchOptions<T>): Promise<T[]> {
  if (!searchTerm.length) return [];

  // Assert the correct type for `prisma[entity]` as any model type
  const model = prisma[entity] as any; // Type assertion to any model type

  const sortResults = (results: T[]): T[] => {
    if (!sortField) return results; // If no sort field is provided, return unsorted
    return sortByName(results, sortField); // Use utility function to sort
  };

  const exactResults = sortResults(
    await model.findMany({
      where: {
        OR: fields.map((field) => ({ [field]: { equals: searchTerm } })),
      },
      take: exactMatchOnly ? maxResults : 5,
    }),
  );

  if (exactMatchOnly) return exactResults;

  const startsWithResults = sortResults(
    await model.findMany({
      where: {
        AND: [
          ...fields.map((field) => ({ [field]: { startsWith: searchTerm } })),
          ...fields.map((field) => ({
            [field]: { not: { equals: searchTerm } },
          })),
        ],
      },
      take: maxResults - exactResults.length,
    }),
  );

  const containsResults =
    exactResults.length + startsWithResults.length < maxResults
      ? sortResults(
          await model.findMany({
            where: {
              AND: [
                ...fields.map((field) => ({
                  [field]: { contains: searchTerm },
                })),
                ...fields.map((field) => ({
                  [field]: { not: { startsWith: searchTerm } },
                })),
              ],
            },
            take: maxResults - exactResults.length - startsWithResults.length,
          }),
        )
      : [];

  return [...exactResults, ...startsWithResults, ...containsResults];
}

// Specialized search functions
export async function searchEduProviders(
  searchTerm: string,
): Promise<EducationProviderDTO[]> {
  return genericSearch<edu_providers>({
    searchTerm,
    entity: 'edu_providers',
    fields: ['name'],
    maxResults: 10,
    sortField: 'name', // Sort by name
  }).then((results) =>
    results.map((provider) => ({ id: provider.id, name: provider.name })),
  );
}

export async function searchCompanies(searchTerm: string): Promise<
  {
    companyId: string;
    companyEmail: string;
    companyLogoUrl: string | null;
    companyPhone: string | null;
    industrySectorId: string | null;
    companyName: string;
    predictedHires: number | null;
    companyWebsite: string | null;
    yearFounded: number;
    companySize: string;
    approvedCompany: boolean;
  }[]
> {
  return genericSearch<companies>({
    searchTerm,
    entity: 'companies',
    fields: ['company_name'],
    maxResults: 10,
    sortField: 'company_name', // Sort by name
  }).then((results) =>
    results.map((company) => ({
      companyId: company.company_id,
      companyName: company.company_name,
      companyLogoUrl: company.company_logo_url,
      industrySectorId: company.industry_sector_id,
      companyWebsite: company.company_website_url,
      companyEmail: company.company_email,
      companyPhone: company.company_phone,
      yearFounded: company.year_founded,
      companySize: company.size,
      predictedHires: company.estimated_annual_hires,
      approvedCompany: company.is_approved,
    })),
  );
}

export async function searchEduProviderHighSchoolPrograms(
  searchTerm: string,
): Promise<GeneralProgramDTO[]> {
  return searchPrograms(searchTerm);
}

export async function searchEduProviderCollegePrograms(
  searchTerm: string,
): Promise<GeneralProgramDTO[]> {
  return searchPrograms(searchTerm);
}

export async function searchEduProviderPreApprenticeshipPrograms(
  searchTerm: string,
): Promise<GeneralProgramDTO[]> {
  return searchPrograms(searchTerm);
}

export async function searchEduProviderOtherPrograms(
  searchTerm: string,
): Promise<GeneralProgramDTO[]> {
  return searchPrograms(searchTerm);
}

export async function searchEduProviderTrainingProviderPrograms(
  searchTerm: string,
): Promise<GeneralProgramDTO[]> {
  return searchPrograms(searchTerm);
}

export async function searchPrograms(
  searchTerm: string,
): Promise<GeneralProgramDTO[]> {
  return genericSearch<programs>({
    searchTerm,
    entity: 'programs',
    fields: ['title'],
    maxResults: 10,
    sortField: 'title', // Sort by title
  });
}

export async function searchPostalGeoData(
  postalCode: string,
  field: keyof PostalGeoData = 'zip',
): Promise<PostalGeoData[]> {
  return genericSearch<PostalGeoData>({
    searchTerm: postalCode,
    entity: 'postalGeoData',
    fields: [field],
    maxResults: 10,
    sortField: field == 'county' || field == 'city' ? 'city' : field,
  });
}

export async function searchSkills(searchTerm: string): Promise<SkillDTO[]> {
  const MAX_RESULTS = 10;

  if (searchTerm.length === 0) {
    return [];
  } else {
    const exactResults = (
      await prisma.skills.findMany({
        where: {
          OR: [
            {
              skill_name: {
                equals: searchTerm,
              },
            },
            {
              skill_name: {
                startsWith: searchTerm + ' (',
              },
            },
            {
              skill_name: {
                contains: '(' + searchTerm + ')',
              },
            },
          ],
        },
        take: 5,
      })
    ).sort((itemA: SkillDTO, itemB: SkillDTO) => {
      if (itemA.skill_name > itemB.skill_name) {
        return 1;
      }
      if (itemA.skill_name < itemB.skill_name) {
        return -1;
      }
      return 0;
    });

    const startsWithResults = (
      await prisma.skills.findMany({
        where: {
          AND: [
            {
              skill_name: {
                startsWith: searchTerm,
              },
            },
            {
              NOT: {
                skill_name: {
                  equals: searchTerm,
                },
              },
            },
            {
              NOT: {
                skill_name: {
                  startsWith: searchTerm + ' (',
                },
              },
            },
            {
              NOT: {
                skill_name: {
                  contains: '(' + searchTerm + ')',
                },
              },
            },
          ],
        },
        take: MAX_RESULTS - exactResults.length,
      })
    ).sort((itemA: SkillDTO, itemB: SkillDTO) => {
      if (itemA.skill_name > itemB.skill_name) {
        return 1;
      }
      if (itemA.skill_name < itemB.skill_name) {
        return -1;
      }
      return 0;
    });

    const containsResults =
      exactResults.length + startsWithResults.length < MAX_RESULTS
        ? (
            await prisma.skills.findMany({
              where: {
                AND: [
                  {
                    skill_name: {
                      contains: searchTerm,
                    },
                  },
                  {
                    NOT: {
                      skill_name: {
                        startsWith: searchTerm,
                      },
                    },
                  },
                  {
                    NOT: {
                      skill_name: {
                        contains: '(' + searchTerm + ')',
                      },
                    },
                  },
                ],
              },
              take:
                MAX_RESULTS - exactResults.length - startsWithResults.length,
            })
          ).sort((itemA: SkillDTO, itemB: SkillDTO) => {
            if (itemA.skill_name > itemB.skill_name) {
              return 1;
            }
            if (itemA.skill_name < itemB.skill_name) {
              return -1;
            }
            return 0;
          })
        : [];
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
  years_work_exp: true, // added this to the select statement as it is something that can be filtered. Probably should get some UX feedback regarding if it should be viewable in the card.
  highest_level_of_study_completed: true,
  pathways: {
    select: {
      pathway_id: true,
      pathway_title: true,
    },
  },
  work_experiences: {
    select: {
      industrySector: {
        select: {
          industry_sector_id: true,
          sector_title: true,
        },
      },
    },
  },
  users: {
    select: {
      id: true,
      role: true,
      first_name: true,
      last_name: true,
      photo_url: true,
      locationData: {
        select: {
          zip: true,
          state: true,
          stateCode: true,
          county: true,
          city: true
        }
      }
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
      program: {
        select: {
          id: true,
          title: true,
        },
      },
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

export const jobseekerQueryTestSelect = {
  jobseeker_id: true,
  user_id: true,
  years_work_exp: true,
  users: {
    select: {
      user_addresses: {
        select: {
          zip: true,
        },
      },
    },
  },
  work_experiences: {
    select: {
      industrySector: {
        select: {
          industry_sector_id: true,
          sector_title: true,
        },
      },
    },
  },
  highest_level_of_study_completed: true,
};

export async function getAllJobSeekerCardView() {
  const jobSeekerCardViews = await prisma.jobseekers.findMany({
    select: jobSeekerCardViewSelect,
  });
  return jobSeekerCardViews;
}

export async function getJobSeekerEmployerView(jobSeekerId: string) {
  const empView = await prisma.jobseekers.findFirst({
    where: {
      jobseeker_id: jobSeekerId,
    },
    select: {
      jobseeker_id: true,
      intro_headline: true,
      video_url: true,
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
          preAppEdSystem: true,
          isEnrolled: true,
          startDate: true,
          gradDate: true,
          degreeType: true,
          program: {
            select: {
              id: true,
              title: true,
            },
          },
          minor: true,
          major: true,
          description: true,
        },
      },
      work_experiences: {
        select: {
          workId: true,
          company: true,
          jobTitle: true,
          isInternship: true,
          isCurrentJob: true,
          responsibilities: true,
          startDate: true,
          endDate: true,
        },
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
            select: {
              skills: {
                select: {
                  skill_name: true,
                  skill_info_url: true,
                },
              },
            },
          },
        },
      },
      pathways: {
        select: {
          pathway_title: true,
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
    },
  });
  return empView;
}

// intended for use with the search bar. Currently, supports searching by combinations of skills and work experience.
// If skills is [] or contains empty strings [''] will disregard and only focus on work experience.
// If work experience is not a query parameter it will be set to 0
export async function getFilteredJobSeekerCardView(
  skills: string[] = [],
  yearsWorkExp: number = 0,
) {
  // Normalize skills array
  const normalizedSkills = skills.filter(
    (skill) => skill && skill.trim() !== '',
  );
  // TODO: add other options from Jobseeker ListView
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
                  },
                },
              },
            },
          },
        },
      },
    ];
    andConditions.push({ OR: orConditions });
  }

  // Add the condition for years of work experience
  andConditions.push({
    years_work_exp: {
      gte: yearsWorkExp,
    },
  });

  // Filter jobseekers based on skills and years of work experience
  const filteredJobSeekers = await prisma.jobseekers.findMany({
    where: andConditions.length > 0 ? { AND: andConditions } : undefined,
    select: jobSeekerCardViewSelect,
  });

  return filteredJobSeekers;
}

// returns those jobseekers with at least yearsExp in a profession
export async function getJobSeekerCardViewByWorkExperience() {}

export async function getIndustrySectors() {
  const industrySectors = await prisma.industry_sectors.findMany({
    where: {},
    select: {
      industry_sector_id: true,
      sector_title: true,
    },
  });
  return industrySectors;
}

export async function getTechnologyAreas() {
  const technologyAreas = await prisma.technology_areas.findMany({
    where: {},
    select: {
      id: true,
      title: true,
    },
  });
  return technologyAreas;
}

export async function deleteUser(role: Role, userId: string, date: Date) {
  // TODO: create delete user & remove jobseeker/soft-delete from api-routes
  // jobseeker cannot be deleted if they have participated in a partner training provider program
}
