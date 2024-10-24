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
    HighestCompletedEducationLevel,
    EducationLevel,
    JsEducationInfoDTO,
    JsEducationPageDTO,
    ProjectExpDTO, CollegeDegreeType, HighSchoolDegreeType, PreAEduSystem
} from '@/data/dtos/JobSeekerProfileCreationDTOs';
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {mapToEnum, mapToEnumOrThrow} from "@/app/lib/utils";
import {normalizeDate} from "@/app/lib/utils";
import {SkillDTO} from "@/data/dtos/SkillDTO";
import {JobseekerSkillDTO} from "@/data/dtos/JobseekerSkillDTO";
import { auth } from '@/auth';
import { setPoolWithSession } from "@/app/lib/jobseeker";

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
    try {
        // Get essentials from session, not the request
        let session = await auth();
        const userId: string = session?.user.id!;
        const jobseekerId: string = session?.user.jobseekerId!;

        const body: JsEducationPageDTO = await request.json();

        const {
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

            const isEnrolledEdProgram = jobseeker?.is_enrolled_ed_program || false;

            upsertedJobseeker = await prisma.jobseekers.upsert({
                where: {user_id: userId},
                update: {
                    highest_level_of_study_completed: highestLevelOfStudy,
                    is_enrolled_ed_program: isEnrolledEdProgram,
                    updatedAt: new Date(),
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
                    issueDate: cert.issueDate ? new Date(cert.issueDate).toISOString() : undefined,
                    expiryDate: cert.expiryDate ? new Date(cert.expiryDate).toISOString() : undefined,
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

            // create the entry for edu_provider if it doesn't exist before mapping over them.
            await ensureEduProvidersExist(educations);
            await ensureProgramsExist(educations);

            const schoolPromises = educations.map(async (edEntry: JsEducationInfoDTO) => {

                const existingJobseekerEducation = await prisma.jobseekers_education.findUnique({
                    where: {
                        id: edEntry.id,
                    },
                    include: {
                        program: true,
                    }
                });

                if (existingJobseekerEducation) {
                    // Build update object and filter undefined values
                    const eduUpdateData: Partial<JsEducationInfoDTO> = {
                        id: edEntry.id,
                        edLevel: edEntry.edLevel,
                        preAppEdSystem: edEntry.preAppEdSystem || undefined,
                        isEnrolled: edEntry.isEnrolled,
                        enrollmentStatus: edEntry.enrollmentStatus,
                        startDate: new Date(edEntry.startDate).toISOString(),
                        gradDate: new Date(edEntry.gradDate).toISOString(),
                        degreeType: edEntry.degreeType,
                        programId: edEntry.programId,
                        gpa: edEntry.gpa,
                        description: edEntry.description,
                    };

                    const updatedEducation = await prisma.jobseekers_education.update({
                        where: { id: existingJobseekerEducation.id },
                        data: eduUpdateData,
                        include: {
                            program: true, // Include the related program information
                            eduProviders: true,
                        }
                    });

                    upsertedSchools.push(updatedEducation);

                } else {
                    const createdEducation = await prisma.jobseekers_education.create({
                        data: {
                            id: edEntry.id,
                            edLevel: edEntry.edLevel ?? "None",
                            preAppEdSystem: edEntry.preAppEdSystem,
                            isEnrolled: edEntry.isEnrolled,
                            startDate: normalizeDate(edEntry?.startDate),
                            gradDate: normalizeDate(edEntry?.gradDate),
                            degreeType: edEntry.degreeType,
                            gpa: edEntry.gpa,
                            description: edEntry.description,
                            jobseekers: {
                                connect: {
                                    jobseeker_id: jobseekerId,
                                }
                            },
                            eduProviders: {
                                connect: {
                                    id: edEntry.edProviderId
                                }
                            },
                            program: {
                                connect: {
                                    id: edEntry.programId,
                                }
                            }
                        },
                        include: {
                            program: true, // Include the related program information
                            eduProviders: true,
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
                    startDate: proj?.startDate ? new Date(proj.startDate.toString()) : undefined,
                    completionDate: proj?.completionDate ? new Date(proj.completionDate.toString()) : undefined,
                    problemSolvedDescription: proj.problemSolvedDescription,
                    teamSize: parseInt(proj.teamSize, 10),
                    repoUrl: proj?.repoUrl,
                    demoUrl: proj?.videoDemoUrl,

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
                            startDate: proj?.startDate ? new Date(proj.startDate.toString()) : '',
                            completionDate: proj?.completionDate ? new Date(proj.completionDate.toString()) : '',
                            problemSolvedDescription: proj.problemSolvedDescription,
                            teamSize: parseInt(proj.teamSize, 10),
                            repoUrl: proj?.repoUrl,
                            demoUrl: proj?.videoDemoUrl,
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
                            }
                        }
                    });
                    upsertedProjects.push(createdProject);

                }
            });
            await Promise.all(projPromises);

            // Map the school data to DTO
            const mappedEdHistory: JsEducationInfoDTO[] = upsertedSchools.map((jsEdu: any ) => ({
                id: jsEdu.id,
                edLevel: mapToEnumOrThrow(jsEdu.edLevel, EducationLevel),
                edProviderId: jsEdu.eduProviderId,
                eduProviderName: undefined,
                isEnrolled: jsEdu.isEnrolled,
                enrollmentStatus: jsEdu.enrollmentStatus,
                isTechDegree: jsEdu.isTechDegree,
                startDate: jsEdu.startDate.toISOString(),
                gradDate: jsEdu.gradDate.toISOString(),
                degreeType: mapToEnum(jsEdu.degreeType ?? null, HighSchoolDegreeType) ??
                    mapToEnumOrThrow(jsEdu.degreeType ?? null, CollegeDegreeType)
                            ,
                programId: jsEdu.program?.id || null,
                programName: jsEdu.program?.title || null,
                gpa: jsEdu.gpa,
                preAppEdSystem: jsEdu.edSystem ? mapToEnumOrThrow(jsEdu.edSystem, PreAEduSystem) : undefined,
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
                issueDate: cert?.issueDate?.toISOString(),
                expiryDate: cert?.issueDate?.toISOString(),
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
                    startDate: proj.startDate,
                    completionDate: proj.completionDate,
                    problemSolvedDescription: proj.problemSolvedDescription,
                    teamSize: proj.teamSize.toString(),
                    repoUrl: proj.repoUrl,
                    videoDemoUrl: proj.demoUrl,
                    skills: skills
                };
            });

            // Return consistent result using JSEducationDTO
            const result: JsEducationPageDTO = {
                userId: upsertedJobseeker.user_id,
                jobseekerId: upsertedJobseeker.jobseeker_id,
                highestLevelOfStudy: mapToEnumOrThrow(upsertedJobseeker.highest_level_of_study_completed, HighestCompletedEducationLevel),
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
        await setPoolWithSession();
        await prisma.$disconnect();
    }
}

async function ensureEduProvidersExist(educations: JsEducationInfoDTO[]) {
    const processedProviders = new Set(); // To avoid redundant checks and creations

    for (const edEntry of educations) {
        const { edProviderId, edProviderName } = edEntry;

        // Skip if we've already processed this provider ID
        if (processedProviders.has(edProviderId)) continue;

        // Check if the edu_provider exists
        let eduProvider = await prisma.edu_providers.findUnique({
            where: { id: edProviderId },
        });

        // If edu_provider does not exist, create a new one
        if (!eduProvider) {
            await prisma.edu_providers.create({
                data: {
                    id: edProviderId,
                    name: edProviderName,
                    contact_email: null,
                    edu_url: null,
                    isAdminReviewed: false,
                },
            });
        } else {
            console.log(`edu_provider with id: ${edProviderId} already exists.`);
        }

        // Mark this provider as processed
        processedProviders.add(edProviderId);
    }
}

async function ensureProgramsExist(educations: JsEducationInfoDTO[]) {
    const processedPrograms = new Set(); // To avoid redundant checks and creations

    for (const edEntry of educations) {
        const { programId, programName } = edEntry;

        // Skip if we've already processed this program ID
        if (processedPrograms.has(programId) || !programId) continue;

        // Check if the program exists
        let program = await prisma.programs.findUnique({
            where: { id: programId },
        });

        // If program does not exist, create a new one
        if (!program) {
            await prisma.programs.create({
                data: {
                    id: programId,
                    title: programName,  // Provide a fallback title if not available
                },
            });
        }

        // Mark this program as processed
        processedPrograms.add(programId);
    }
}

