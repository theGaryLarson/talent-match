import { NextResponse } from 'next/server';
import { PrismaClient, ProjectExperiences, jobseekers, certificates, jobseekers_education } from '@prisma/client';
import {
    CertDTO,
    CurrentGrade,
    DegreeType,
    EdProgram,
    EducationInfoDTO,
    JsEducationDTO,
    ProjectExpDTO
} from '@/data/dtos/JobSeekerProfileCreationDTOs';
import { v4 as uuidv4 } from 'uuid';
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {mapToEnum} from "@/app/lib/utils";
import {toMidnightUTC} from "@/app/lib/utils";

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
    try {
        const body: JsEducationDTO = await request.json();

        const {
            userId,
            highestLevelOfStudy,
            currentEdProgram,
            currentGrade,
            schools,
            certifications,
            projects,
        } = body;

        const result = await prisma.$transaction(async (prisma) => {
            const createdCerts: certificates[] = [];
            const createdProjects: ProjectExperiences[] = [];
            const createdSchools: jobseekers_education[] = [];
            let updatedJobseeker: jobseekers | null;
            // Find the jobseeker_id or generate a new one
            const jobseeker = await prisma.jobseekers.findUnique({
                where: { user_id: userId },
                select: {
                    jobseeker_id: true,
                    targeted_pathway: true,
                    is_enrolled_ed_program: true
                }
            });

            const jobseekerId: string = jobseeker?.jobseeker_id || uuidv4();
            const isEnrolledEdProgram = jobseeker?.is_enrolled_ed_program || false;

            // Find or create the targeted pathway for 'Undecided'
            let targetedPathway = jobseeker?.targeted_pathway;
            if (!targetedPathway) {
                let pathway = await prisma.pathways.findUnique({
                    where: { pathway_title: 'Undecided' },
                    select: { pathway_id: true }
                });

                if (!pathway) {
                    pathway = await prisma.pathways.create({
                        data: {
                            pathway_id: uuidv4(),
                            pathway_title: 'Undecided'
                        },
                        select: { pathway_id: true }
                    });
                }
                targetedPathway = jobseeker?.targeted_pathway || pathway.pathway_id;
            }

            updatedJobseeker = await prisma.jobseekers.upsert({
                where: { user_id: userId },
                update: {
                    highest_level_of_study_completed: highestLevelOfStudy,
                    current_grade_level: currentGrade,
                    current_enrolled_ed_program: currentEdProgram,
                    is_enrolled_ed_program: isEnrolledEdProgram,
                },
                create: {
                    jobseeker_id: jobseekerId,
                    user_id: userId,
                    targeted_pathway: targetedPathway,
                    is_enrolled_ed_program: isEnrolledEdProgram,
                    highest_level_of_study_completed: highestLevelOfStudy,
                    current_grade_level: currentGrade,
                    current_enrolled_ed_program: currentEdProgram,
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
                        where: { certId: cert.certId },
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

            const schoolPromises = schools.map(async (school: EducationInfoDTO) => {
                let eduInstitution = await prisma.edu_institutions.findUnique({
                    where: { edu_institution_id: school.edInstitutionId }
                });
                if (!eduInstitution) {
                    await prisma.edu_institutions.create({
                        data: {
                            edu_institution_id: school.edInstitutionId,
                            name: school.institutionName,
                            contact_email: null,
                            edu_url: null,
                        }
                    });
                }

                const existingEducation = await prisma.jobseekers_education.findFirst({
                    where: {
                        jobseekerId: jobseekerId,
                        edInstitutionId: school.edInstitutionId,
                        startDate: {
                            equals: toMidnightUTC(school.startDate)
                        },
                        gradDate: {
                            equals: toMidnightUTC(school.gradDate)
                        }
                    }
                });
                if (existingEducation) {
                    school.jobseekerEdId = existingEducation.jobseekerEdId;
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
                        where: { jobseekerEdId: existingEducation.jobseekerEdId },
                        data: eduUpdateData
                    });
                    createdSchools.push(updatedEducation);
                } else {
                    const createdEducation = await prisma.jobseekers_education.create({
                        data: {
                            jobseekerEdId: school.jobseekerEdId,
                            edProgram: school.edProgram??"None",
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
                            eduInstitutions: {
                                connect: {
                                    edu_institution_id: school.edInstitutionId
                                }
                            }
                        }
                    });
                    createdSchools.push(createdEducation);
                }
            });
            await Promise.all(schoolPromises);

            const projPromises = projects.map(async (proj: ProjectExpDTO) => {
                const existingProject = await prisma.projectExperiences.findUnique({
                    where: {
                        projectId: proj.projectId,
                    },
                });

                const updateData: Partial<ProjectExperiences> = {
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
                    const updatedProject = await prisma.projectExperiences.update({
                        where: { projectId: existingProject.projectId },
                        data: updateData,
                    });
                    createdProjects.push(updatedProject);
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
                                        connect: { skill_id: skill.skill_id },
                                    },
                                })),
                            },
                        },
                    });
                    createdProjects.push(createdProject);
                }
            });
            await Promise.all(projPromises);

            // Map the school data to DTO
            const edHistory: EducationInfoDTO[] = createdSchools.map((edu) => ({
                jobseekerEdId: edu.jobseekerEdId,
                edInstitutionId: edu.edInstitutionId,
                edProgram: mapToEnum(edu.edProgram, EdProgram),
                edSystem: edu.edSystem,
                isEnrolled: edu.isEnrolled,
                startDate: edu.startDate.toISOString(),
                gradDate: edu.gradDate.toISOString(),
                degreeType: mapToEnum(edu.degreeType ?? "None", DegreeType),
                major: edu?.major,
                minor: edu?.minor,
                description: edu.description
            }));

            // Map the certificate data to DTO
            const certs: CertDTO[] = createdCerts.map((cert) => ({
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

            // Return consistent result using JSEducationDTO
            const result: JsEducationDTO = {
                userId: updatedJobseeker?.user_id,
                currentEdProgram: mapToEnum(updatedJobseeker?.current_enrolled_ed_program ?? "None", EdProgram),
                highestLevelOfStudy: mapToEnum(updatedJobseeker?.highest_level_of_study_completed ?? "None", DegreeType),
                currentGrade: mapToEnum(updatedJobseeker?.current_grade_level ?? "None", CurrentGrade),
                isEnrolledEdProgram: updatedJobseeker?.is_enrolled_ed_program,
                schools: edHistory,
                certifications: certs,
                projects: projects,
            }
            return result
        });

        return NextResponse.json({
            success: true,
            result
        }, { status: 200 });
    } catch (e: any) {
        console.log(e.message);
        return NextResponse.json({ error: `Failed to create jobseeker education.\n${e.message} ` }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
