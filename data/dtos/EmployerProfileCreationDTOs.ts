export type PostEmployerPersonalDTO = {
  userId: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phoneCountryCode?: string | null;
  phone?: string | null;
  photoUrl?: string | null;
};

export type ReadEmployerPersonalDTO = {
  employerId?: string | null;
  userId?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  birthDate?: string | null;
  email?: string | null;
  phoneCountryCode?: string | null;
  phone?: string | null;
  photoUrl?: string | null;
};

export type PostEmployerWorkDTO = {
  userId: string;
  currentJobTitle: string;
  linkedInUrl: string;
  workAddressId?: string;
  hasAgreedTerms: boolean;
};

export type ReadEmployerWorkDTO = {
  userId?: string | null;
  employerId?: string | null;
  currentJobTitle?: string | null;
  linkedInUrl?: string | null;
  workAddressId?: string | null;
  isVerifiedEmployee?: boolean | null;
};

export type CompanyInfoSummaryDTO = {
  companyId?: string;
  companyName?: string;
  companyLogoUrl?: string;
  isVerifiedCompany?: boolean;
  companyAddress?: ReadAddressDTO;
};

export type ReadAddressDTO = {
  addressId: string;
  city: string;
  state: string;
  stateCode: string;
  zip: string;
  county: string;
  lat?: string;
  lon?: string;
} | null;

export type PostAddressDTO = {
  addressId?: string;
  city?: string;
  state?: string;
  stateCode?: string;
  zip: string;
  county?: string;
  lat?: string;
  lon?: string;
};

export type PostCompanyInfoDTO = {
  userId: string;
  employerId?: string;
  companyId?: string;
  industrySectorId?: string | null;
  industrySectorTitle?: string | null;
  companyName: string;
  companyAddresses?: PostAddressDTO[] | null;
  logoUrl?: string | null;
  aboutUs?: string | null;
  companyEmail: string;
  yearFounded: string;
  websiteUrl?: string | null;
  videoUrl?: string | null;
  phoneCountryCode?: string | null;
  companyPhone?: string | null;
  mission?: string | null;
  vision?: string | null;
  companySize: string;
  estimatedAnnualHires: string;
};

export type ReadCompanyInfoDTO = {
  companyId: string;
  industrySectorId?: string | null;
  industrySectorTitle?: string | null;
  companyName: string;
  companyAddresses?: ReadAddressDTO[];
  logoUrl?: string | null;
  aboutUs: string;
  companyEmail: string;
  yearFounded: string;
  websiteUrl?: string | null;
  videoUrl?: string | null;
  phoneCountryCode?: string | null;
  companyPhone?: string | null;
  mission?: string | null;
  vision?: string | null;
  employeeCount?: string | null;
  estimatedAnnualHires?: string | null;
  isApproved?: boolean | null;
  createdBy: string;
};

export type PostEmployerAboutDTO = {
  companyId: string;
  aboutUs: string;
};

export type ReadEmployerAboutDTO = {
  companyId?: string;
  aboutUs?: string | null;
};

export type PostEmployerMissionDTO = {
  // companyId: string;
  mission: string;
};

export type ReadEmployerMissionDTO = {
  companyId?: string;
  mission?: string | null;
};

export type PostEmployerVideoDTO = {
  companyId: string;
  videoUrl: string;
};

export type ReadEmployerVideoDTO = {
  companyId?: string;
  videoUrl?: string | null;
};

export type PostCompanyTestimonialsDTO = {
  companyId: string;
  employerId: string;
  text: string;
  author: string;
};

export type ReadCompanyTestimonialsDTO = {
  testimonyId: string;
  companyId?: string;
  employerId?: string | null;
  text?: string;
  author?: string;
};

export type PostCompanySocialLinkDTO = {
  companyId: string;
  socialPlatformId: string;
  employerId: string;
  socialUrl: string;
};

export type ReadCompanySocialLinkDTO = {
  companySocialId?: string;
  socialPlatformId?: string;
  companyId?: string;
  employerId?: string | null;
  socialUrl?: string;
  platform?: string;
  platformIconUrl?: string;
};
