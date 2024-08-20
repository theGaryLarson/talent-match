import {NextResponse} from 'next/server';
import {
    PrismaClient,
    ProjectExperiences,
    jobseekers,
    certificates,
    jobseekers_education,
} from '@prisma/client';
import {
    CertDTO,
    HighestDegreeType,
    EdProgram,
    EducationInfoDTO,
    JsEducationDTO,
    ProjectExpDTO, CollegeDegreeType
} from '@/data/dtos/JobSeekerProfileCreationDTOs';
import {v4 as uuidv4} from 'uuid';
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {mapToEnum} from "@/app/lib/utils";
import {toMidnightUTC} from "@/app/lib/utils";
import {SkillDTO} from "@/data/dtos/SkillDTO";
import {JobseekerSkillDTO} from "@/data/dtos/JobseekerSkillDTO";

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
    try {
        const body: JsEducationDTO = await request.json();

        const {
            userId,
            highestLevelOfStudy,
            educations,
            certifications,
            projects,
        } = body;

        const result = await prisma.$transaction(async (prisma) => {
            const createdCerts: certificates[] = [];
            const upsertedProjects: ProjectExperiences[] = [];
            const upsertedSchools: jobseekers_education[] = [];
            let upsertedJobseeker: jobseekers | null;
            // Find the jobseeker_id or generate a new one
            const jobseeker = await prisma.jobseekers.findUnique({
                where: {user_id: userId},
                select: {
                    jobseeker_id: true,
                    targeted_pathway: true,
                    is_enrolled_ed_program: true
                }
            });

            const jobseekerId: string = jobseeker?.jobseeker_id || uuidv4();
            const isEnrolledEdProgram = jobseeker?.is_enrolled_ed_program || false;

            upsertedJobseeker = await prisma.jobseekers.upsert({
                where: {user_id: userId},
                update: {
                    highest_level_of_study_completed: highestLevelOfStudy,
                    is_enrolled_ed_program: isEnrolledEdProgram,
                },
                create: {
                    jobseeker_id: jobseekerId,
                    user_id: userId,
                    targeted_pathway: undefined,
                    is_enrolled_ed_program: isEnrolledEdProgram,
                    highest_level_of_study_completed: highestLevelOfStudy,
                    intern_hours_required: undefined,
                    intro_headline: undefined,
                    current_job_title: undefined,
                    resume_url: undefined,
                    years_work_exp: undefined,
                    portfolio_url: undefined,
                    video_url: undefined,
                    employment_type_sought: undefined,
                },
            });

            const certPromises = certifications.map(async (cert: CertDTO) => {
                const existingCert = await prisma.certificates.findFirst({
                    where: {
                        certId: cert.certId,
                    },
                });

                const updateData = {
                    name: cert.name,
                    logoUrl: undefined,
                    issuingOrg: cert.issuingOrg,
                    credentialId: cert.credentialId,
                    credentialUrl: cert.credentialUrl,
                    issueDate: new Date(cert.issueDate).toISOString(),
                    expiryDate: new Date(cert.expiryDate).toISOString(),
                    description: cert.description,
                };

                if (existingCert) {
                    const updatedCert = await prisma.certificates.update({
                        where: {certId: cert.certId},
                        data: updateData,
                    });
                    createdCerts.push(updatedCert);
                } else {
                    const createdCert = await prisma.certificates.create({
                        data: {
                            certId: cert.certId,
                            ...updateData,
                            jobseekers: {
                                connect: {
                                    jobseeker_id: jobseekerId,
                                },
                            },
                        },
                    });
                    createdCerts.push(createdCert);
                }
            });
            await Promise.all(certPromises);

            const schoolPromises = educations.map(async (school: EducationInfoDTO) => {
                let eduInstitution = await prisma.edu_providers.findUnique({
                    where: {id: school.eduProviderId}
                });
                if (!eduInstitution) {
                    await prisma.edu_providers.create({
                        data: {
                            id: school.eduProviderId,
                            name: school.edProviderName,
                            contact_email: null,
                            edu_url: null,
                        }
                    });
                }

                const existingEducation = await prisma.jobseekers_education.findFirst({
                    where: {
                        jobseekerId: jobseekerId,
                        edProviderId: school.eduProviderId,
                        startDate: {
                            equals: toMidnightUTC(school.startDate)
                        },
                        gradDate: {
                            equals: toMidnightUTC(school.gradDate)
                        }
                    }
                });
                if (existingEducation) {
                    school.jobseekerEdId = existingEducation.id;
                }
                // Build update object and filter undefined values
                const eduUpdateData: Partial<EducationInfoDTO> = {
                    jobseekerEdId: school.jobseekerEdId,
                    edProgram: school.edProgram,
                    edSystem: school.edSystem,
                    isEnrolled: school.isEnrolled,
                    startDate: new Date(school.startDate).toISOString(),
                    gradDate: new Date(school.gradDate).toISOString(),
                    degreeType: school.degreeType,
                    major: school.major,
                    minor: school.minor,
                    description: school.description,
                };
                if (existingEducation) {
                    const updatedEducation = await prisma.jobseekers_education.update({
                        where: {id: existingEducation.id},
                        data: eduUpdateData
                    });
                    upsertedSchools.push(updatedEducation);
                } else {
                    const createdEducation = await prisma.jobseekers_education.create({
                        data: {
                            id: school.jobseekerEdId,
                            edProgram: school.edProgram ?? "None",
                            edSystem: school.edSystem,
                            isEnrolled: school.isEnrolled,
                            startDate: new Date(school.startDate).toISOString(),
                            gradDate: new Date(school.gradDate).toISOString(),
                            degreeType: school.degreeType,
                            major: school.major,
                            minor: school.minor,
                            description: school.description,
                            jobseekers: {
                                connect: {
                                    jobseeker_id: jobseekerId,
                                }
                            },
                            eduProviders: {
                                connect: {
                                    id: school.eduProviderId
                                }
                            }
                        }
                    });
                    upsertedSchools.push(createdEducation);
                }
            });
            await Promise.all(schoolPromises);

            const projPromises = projects.map(async (proj: ProjectExpDTO) => {
                const existingProject = await prisma.projectExperiences.findUnique({
                    where: {
                        projectId: proj.projectId,
                    },
                    select: {
                        projectId: true,
                        projTitle: true,
                        projectRole: true,
                        startDate: true,
                        completionDate: true,
                        problemSolvedDescription: true,
                        teamSize: true,
                        repoUrl: true,
                        demoUrl: true,
                        project_has_skills: {
                            select: {
                                skills: {
                                    select: {
                                        skill_id: true,
                                        skill_name: true,
                                        skill_info_url: true,
                                    }
                                }
                            }
                        }


                    },

                });
                const updateProjectData: Partial<ProjectExperiences> = {
                    projTitle: proj.projTitle,
                    projectRole: proj.projectRole,
                    startDate: new Date(proj.startDate),
                    completionDate: new Date(proj.completionDate),
                    problemSolvedDescription: proj.problemSolvedDescription,
                    teamSize: parseInt(proj.teamSize, 10),
                    repoUrl: proj?.repoUrl,
                    demoUrl: proj?.demoUrl,

                };
                if (existingProject) {
                    // Delete existing skills and add the updated skills
                    await prisma.project_has_skills.deleteMany({
                        where: {proj_exp_id: existingProject.projectId}
                    });

                    await prisma.project_has_skills.createMany({
                        data: proj.skills.map((skill) => ({
                            proj_exp_id: existingProject.projectId,
                            skill_id: skill.skill_id
                        }))
                    });
                    const updatedProject = await prisma.projectExperiences.update({
                        where: {projectId: existingProject.projectId},
                        data: updateProjectData,
                        include: {
                            project_has_skills: {
                                include: {
                                    skills: {
                                        select: {
                                            skill_id: true,
                                            skill_name: true,
                                            skill_info_url: true,
                                        }
                                    }
                                }
                            }
                        }
                    });
                    upsertedProjects.push(updatedProject);


                } else {
                    const createdProject = await prisma.projectExperiences.create({
                        data: {
                            projectId: proj.projectId,
                            projTitle: proj.projTitle,
                            projectRole: proj.projectRole,
                            startDate: new Date(proj.startDate),
                            completionDate: new Date(proj.completionDate),
                            problemSolvedDescription: proj.problemSolvedDescription,
                            teamSize: parseInt(proj.teamSize, 10),
                            repoUrl: proj?.repoUrl,
                            demoUrl: proj?.demoUrl,
                            jobseekers: {
                                connect: {
                                    jobseeker_id: jobseekerId,
                                },
                            },
                            project_has_skills: {
                                create: proj.skills.map((skill) => ({
                                    skills: {
                                        connect: {skill_id: skill.skill_id},
                                    },
                                })),
                            },
                        },
                        include: {
                            project_has_skills: {
                                include: {
                                    skills: {
                                        select: {
                                            skill_id: true,
                                            skill_name: true,
                                            skill_info_url: true
                                        }
                                    }
                                },
                            },
                        },
                    });
                    upsertedProjects.push(createdProject);

                }
            });
            await Promise.all(projPromises);


            // Map the school data to DTO
            const mappedEdHistory: EducationInfoDTO[] = upsertedSchools.map((jsEdu) => ({
                jobseekerEdId: jsEdu.id,
                eduProviderId: jsEdu.edProviderId,
                edProgram: mapToEnum(jsEdu.edProgram, EdProgram),
                edSystem: jsEdu.edSystem,
                isEnrolled: jsEdu.isEnrolled,
                startDate: jsEdu.startDate.toISOString(),
                gradDate: jsEdu.gradDate.toISOString(),
                degreeType: mapToEnum(jsEdu.degreeType ?? "None", CollegeDegreeType),
                major: jsEdu?.major,
                minor: jsEdu?.minor,
                description: jsEdu.description
            }));

            // Map the certificate data to DTO
            const mappedCerts: CertDTO[] = createdCerts.map((cert) => ({
                certId: cert.certId,
                name: cert.name,
                logoUrl: cert.logoUrl,
                issuingOrg: cert.issuingOrg,
                credentialId: cert.credentialId,
                credentialUrl: cert.credentialUrl,
                issueDate: cert.issueDate.toISOString(),
                expiryDate: cert.issueDate.toISOString(),
                description: cert.description,
            }));

            // Map the projects data to DTO
            const mappedProjects: ProjectExpDTO[] = upsertedProjects.map((proj: any) => {
                const skills: SkillDTO[] = proj.project_has_skills.map((s: JobseekerSkillDTO) => ({
                    skill_id: s.skills.skill_id,
                    skill_name: s.skills.skill_name,
                    skill_info_url: s.skills.skill_info_url
                }));
                return {
                    projectId: proj.projectId,
                    projTitle: proj.projTitle,
                    projectRole: proj.projectRole,
                    startDate: proj.startDate.toISOString(),
                    completionDate: proj.completionDate.toISOString(),
                    problemSolvedDescription: proj.problemSolvedDescription,
                    teamSize: proj.teamSize.toString(),
                    repoUrl: proj.repoUrl,
                    demoUrl: proj.demoUrl,
                    skills: skills
                };
            });

            // Return consistent result using JSEducationDTO
            const result: JsEducationDTO = {
                userId: upsertedJobseeker.user_id,
                highestLevelOfStudy: mapToEnum(upsertedJobseeker.highest_level_of_study_completed ?? "None", HighestDegreeType),
                educations: mappedEdHistory,
                certifications: mappedCerts,
                projects: mappedProjects,
            }
            return result
        });

        return NextResponse.json({
            success: true,
            result
        }, {status: 200});
    } catch (e: any) {
        console.log(e.message);
        return NextResponse.json({error: `Failed to create jobseeker education.\n${e.message} `}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
