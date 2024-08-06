export type PostEmployerPersonalDTO = {
    userId: string,
    firstName: string,
    lastName: string,
    birthDate: string,
    email: string,
    phone?: string,
    gender: string,
    race: string,
    photoUrl?: string,
}

export type ReadEmployerPersonalDTO = {
    userId?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    birthDate?: string | null,
    email?: string | null,
    phone?: string | null,
    gender?: string | null,
    race?: string | null,
    photoUrl?: string | null,
}

export type PostEmployerWorkDTO = {
    userId: string,
    currentJobTitle: string,
    linkedInUrl: string,
    workLocation: string,
}

export type ReadEmployerWorkDTO = {
    employerId?: string | null,
    currentJobTitle?: string | null,
    linkedInUrl?: string | null,
    workLocation?: string | null
    isVerifiedEmployee?: boolean | null
}

export type CompanyInfoSummaryDTO = {
    companyId?: string,
    companyName?: string,
    companyLogoUrl?: string,
    companyAddress?: ReadAddressDTO
}

export type ReadAddressDTO = {
    addressId: string,
    city?: string,
    state?: string,
    zipCode?: string,
    county?: string,
}

export type PostAddressDTO = {
    city: string,
    state: string,
    zipCode: string,
    county: string,
}

export type PostCompanyInfoDTO = {
    userId: string,
    companyId: string,
    industrySectorId?: string | null,
    industrySectorTitle?: string | null,
    companyName: string,
    companyAddresses: PostAddressDTO[],
    logoUrl?: string | null,
    aboutUs: string,
    companyEmail: string,
    yearFounded: string,
    websiteUrl?: string | null,
    videoUrl?: string | null,
    companyPhone?: string | null,
    mission?: string | null,
    vision?: string | null,
    employeeCount: string,
    estimatedAnnualHires: string,
}

export type ReadCompanyInfoDTO = {
    companyId: string,
    industrySectorId?: string | null,
    industrySectorTitle?: string | null,
    companyName: string,
    companyAddresses: ReadAddressDTO[],
    logoUrl?: string | null,
    aboutUs: string,
    companyEmail: string,
    yearFounded: string,
    websiteUrl?: string | null,
    videoUrl?: string | null,
    companyPhone?: string | null,
    mission?: string | null,
    vision?: string | null,
    employeeCount: string,
    estimatedAnnualHires?: string | null,
    isApproved: boolean,
}
