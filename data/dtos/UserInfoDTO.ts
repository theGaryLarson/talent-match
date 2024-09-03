export type ReadUserInfoDTO = {
    userId: string,
    roles: Role[],
    email: string,
    jobseekerId?: string | null,
    employerId?: string | null,
    companyId?: string | null,
    companyIsApproved: boolean,
    employeeIsApproved: boolean,
}

export type CreateUserDTO = {
    email: string,
    firstName: string,
    lastName: string,
    roles: Role[]
}

export enum Role {
    NONE = 'NONE',
    ADMIN = 'ADMIN',
    JOBSEEKER = 'JOBSEEKER',
    EMPLOYER = 'EMPLOYER',
    EDUCATOR = 'EDUCATOR',
    VOLUNTEER = 'VOLUNTEER',
}