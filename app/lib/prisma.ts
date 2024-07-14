import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllJobSeekerCardView(): Promise<any> {
    const jobSeekerCardViews = await prisma.jobseekers.findMany({
        select: {
            jobseeker_id: true,
            user_id: true,
            intro_headline: true,
            pathways: {
                select: {
                    pathway_title: true,
                }
            },
            contacts: {
                select: {
                    role: true,
                    first_name: true,
                    last_name: true,
                    photo_url: true,
                },
            },
            edu_institutions: {
                select: {
                    name: true,
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
    // console.log(JSON.stringify(jobSeekerCardViews, null, 2));
    return jobSeekerCardViews;
}

export async function getJobSeekerEmployerView(jobSeekerId: string) {
    const empView = await prisma.jobseekers.findFirst({
        where: {
            jobseeker_id: jobSeekerId,
        },
        select: {
            current_job_title: true,
            current_enrolled_ed_program: true,
            current_grade_level: true,
            years_work_exp: true,
            employment_type_sought: true,
            targeted_pathway: true,
            resume_url: true,
            portfolio_url: true,
            contacts: {
                select: {
                    user_id: true,
                    first_name: true,
                    last_name:true,
                    photo_url: true,
                    email: true,
                    phone: true,
                }
            },
            work_experiences: {
              select: {
                  company: true,
                  job_title: true,
                  is_internship: true,
                  is_current_job: true,
                  responsibilities: true,
              }
            },
            edu_institutions: { // TODO: refactor jobseeker education into its own table...
                select: {
                    name: true, // TODO: add start and graduation times to database
                }
            },
            project_experiences: {
                select: {
                    project_title: true,
                    start_date: true,
                    completion_date: true,
                    team_size: true,
                    repo_url: true,
                    demo_url: true,
                    problem_solved_description: true,
                    project_has_skills: { select:
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
    console.log('///// EMPLOYER VIEW //////');
    console.log(JSON.stringify(empView, null, 2));
    return empView;
}

export async function getJobSeekersFilteredBySkills(skills: string[]) {
    if (!skills || skills.length === 0) {
        // Return all jobseekers if no skills are provided
        return getAllJobSeekerCardView();
    }
    // Filter job seekers based on skills
    const filteredJobSeekers = await prisma.jobseekers.findMany({
        where: {
            OR: [
                {
                    jobseeker_has_skills: {
                        some: {
                            skills: {
                                skill_name: {
                                    in: skills,
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
                                            in: skills,
                                        }
                                    },
                                },
                            },
                        },
                    },
                },
            ],
        },
        include: {
            contacts: true,
            edu_institutions: true,
            jobseeker_has_skills: {
                include: {
                    skills: true,
                },
            },
            project_experiences: true, // Adjust this if necessary
        },
    });
    console.log(JSON.stringify(filteredJobSeekers, null, 2))
    return filteredJobSeekers;
}
