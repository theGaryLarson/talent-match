export type PostEmployerPersonalDTO = {
    userId: string,
    firstName: string,
    lastName: string,
    birthDate: string,
    email: string,
    phoneCountryCode?: string,
    phone?: string,
    gender: string,
    race: string,
    photoUrl?: string,
}

export type ReadEmployerPersonalDTO = {
    employerId?: string | null,
    userId?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    birthDate?: string | null,
    email?: string | null,
    phoneCountryCode?: string | null,
    phone?: string | null,
    gender?: string | null,
    race?: string | null,
    photoUrl?: string | null,
}

export type PostEmployerWorkDTO = {
    userId: string,
    currentJobTitle: string,
    linkedInUrl: string,
    workAddressId?: string,
}

export type ReadEmployerWorkDTO = {
    userId?: string | null,
    employerId?: string | null,
    currentJobTitle?: string | null,
    linkedInUrl?: string | null,
    workAddressId?: string | null
    isVerifiedEmployee?: boolean | null
}

export type CompanyInfoSummaryDTO = {
    companyId?: string,
    companyName?: string,
    companyLogoUrl?: string,
    companyAddress?: ReadAddressDTO
}

export type ReadAddressDTO = {
    addressId?: string,
    city?: string | null,
    state?: string | null,
    zipCode?: string | null,
    county?: string | null,
    lat?: string | null,
    lon?: string | null,
}

export type PostAddressDTO = {
    city: string,
    state?: string,
    zipCode: string,
    county?: string  | null,
    lat?: number | null,
    lon?: number | null,
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
    phoneCountryCode?: string | null,
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
    phoneCountryCode?: string | null,
    companyPhone?: string | null,
    mission?: string | null,
    vision?: string | null,
    employeeCount: string,
    estimatedAnnualHires?: string | null,
    isApproved: boolean,
}

export type PostCompanyTestimonialsDTO = {
    companyId: string,
    employerId: string,
    text: string,
    author: string,
}

export type ReadCompanyTestimonialsDTO = {
    testimonyId: string,
    companyId?: string,
    employerId?: string,
    text?: string,
    author?: string,
}

export type PostCompanySocialLinkDTO = {
    companyId: string,
    socialPlatformId: string,
    employerId: string,
    socialUrl: string,
}

export type ReadCompanySocialLinkDTO = {
    companySocialId?: string,
    socialPlatformId?: string,
    companyId?: string,
    employerId?: string,
    socialUrl?: string,
    platform?: string,
    platformIconUrl?: string,
}
