import { PrismaClient, Skill, User } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsers(): Promise<User[]> {
  return await prisma.user.findMany({where:{
    role:{
      equals: 'Jobseeker'
    }
  }});
}

export async function searchSkills(searchTerm:string): Promise<string[]> {
  const MAX_RESULTS = 10;

  if (searchTerm.length === 0) {
    return [];
  }
  else {
    const exactResults = (await prisma.skill.findMany({
      where: {
        OR: [
          {
            skill:{
              equals: searchTerm
            }
          },
          {
            skill:{
              equals: searchTerm + " (Programming Language)"
            }
          }
        ]
      },
      take: 2
    })).map((val) => val.skill).sort();

    const startsWithResults = (await prisma.skill.findMany({
      where: {
        AND: [
          {
            skill:{
              startsWith: searchTerm
            }
          },
          {
            NOT: {
              skill:{
                equals: searchTerm
              }
            }
          },
          {
            NOT: {
              skill:{
                equals: searchTerm + " (Programming Language)"
              }
            }
          }
        ]
      },
      take: MAX_RESULTS - exactResults.length
    })).map((val) => val.skill).sort();

    const containsResults =
      (exactResults.length + startsWithResults.length < MAX_RESULTS) ?
        (await prisma.skill.findMany({
          where: {
            AND: [
              {
                skill: {
                  contains: searchTerm
                }
              },
              {
                NOT: {
                  skill: {
                    startsWith: searchTerm
                  }
                }
              }
            ]
          },
          take: MAX_RESULTS - exactResults.length - startsWithResults.length
        })).map((val) => val.skill).sort()
      : []

    // Had to query them separately to guarantee Exact and StartsWith
    //   matches were found since I'm limiting the results, and OR
    //   clauses do not guarantee results in the order of the filters
    return [...exactResults, ...startsWithResults, ...containsResults];
  }
}