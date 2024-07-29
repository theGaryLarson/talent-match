import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import {
    CertDTO,
    CurrentGrade,
    DegreeType,
    EdProgram,
    EducationInfoDTO,
    JsEducationDTO, ProjectExpDTO
} from '@/data/dtos/JobSeekerProfileCreationDTOs';
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {JobseekerSkillDTO} from "@/data/dtos/JobseekerSkillDTO";

const prisma: PrismaClient = getPrismaClient();

export const mapToEnum = (value: string, enumType: any): any => {
    const enumValues = Object.values(enumType);
    return enumValues.includes(value) ? value : null;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {userId} = body;
        if (!userId) {
            return NextResponse.json({error: 'User ID is required'}, {status: 400});
        }

        // Fetch the jobseeker data
        const jobseeker = await prisma.jobseekers.findUnique({
            where: {user_id: userId},
            select: {
                user_id: true,
                current_enrolled_ed_program: true,
                highest_level_of_study_completed: true,
                current_grade_level: true,
                is_enrolled_ed_program: true,
                jobseeker_education: {
                    select: {
                        jobseekerEdId: true,
                        edInstitutionId: true,
                        eduInstitutions: {
                            select: {
                                name: true,
                            }
                        },
                        edProgram: true,
                        edSystem: true,
                        isEnrolled: true,
                        startDate: true,
                        gradDate: true,
                        degreeType: true,
                        major: true,
                        minor: true,
                        description: true,
                    }
                },
                certificates: {
                    select: {
                        certId: true,
                        name: true,
                        logoUrl: true,
                        issuingOrg: true,
                        credentialId: true,
                        credentialUrl: true,
                        issueDate: true,
                        expiryDate: true,
                        description: true,
                    }
                },
                project_experiences: {
                    select: {
                        projectId: true,
                        projTitle: true,
                        projectRole: true,
                        startDate: true,
                        completionDate: true,
                        problemSolvedDescription: true,
                        teamSize: true,
                        demoUrl: true,
                        repoUrl: true,
                        project_has_skills: {
                            select: {
                                skills: {
                                    select: {
                                        skill_id: true,
                                        skill_subcategory_id: true,
                                        skill_name: true,
                                        skill_info_url: true,
                                    }

                                }
                            }
                        },
                    },
                },
            },
        });

        if (!jobseeker) {
            return NextResponse.json({error: 'Jobseeker not found'}, {status: 404});
        }

        // Map the jobseeker data to DTOs
        const edHistory: EducationInfoDTO[] = jobseeker.jobseeker_education.map((edu) => ({
            jobseekerEdId: edu.jobseekerEdId,
            edInstitutionId: edu.edInstitutionId,
            institutionName: edu.eduInstitutions.name ?? undefined, // TODO: fix this
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

        const certs: CertDTO[] = jobseeker.certificates.map((cert) => ({
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

        const projects: ProjectExpDTO[] = jobseeker.project_experiences.map((proj) => ({
            projectId: proj.projectId,
            projTitle: proj.projTitle,
            projectRole: proj.projectRole,
            startDate: proj.startDate.toISOString(),
            completionDate: proj.completionDate.toISOString(),
            problemSolvedDescription: proj.problemSolvedDescription,
            teamSize: proj.teamSize.toString(),
            repoUrl: proj.repoUrl,
            demoUrl: proj.demoUrl,
            skills: proj.project_has_skills.map( (s: JobseekerSkillDTO) => ({
                    skill_id: s.skills.skill_id,
                    skill_name: s.skills.skill_name,
                    skill_info_url: s.skills.skill_info_url,
            })),
        }));

        const result: JsEducationDTO = {
            userId: jobseeker.user_id,
            currentEdProgram: mapToEnum(jobseeker.current_enrolled_ed_program ?? "None", EdProgram),
            highestLevelOfStudy: mapToEnum(jobseeker.highest_level_of_study_completed ?? "None", DegreeType),
            currentGrade: mapToEnum(jobseeker.current_grade_level ?? "None", CurrentGrade),
            isEnrolledEdProgram: jobseeker.is_enrolled_ed_program,
            schools: edHistory,
            certifications: certs,
            projects: projects,
        };

        return NextResponse.json({
            success: true,
            result,
        }, {status: 200});
    } catch (e: any) {
        console.log(e.message);
        return NextResponse.json({error: `Failed to fetch jobseeker data.\n${e.message} `}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
