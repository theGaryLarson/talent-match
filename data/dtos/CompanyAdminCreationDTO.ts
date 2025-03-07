export interface CompanyAdminCreationDTO {
  companyId: string;
  industrySectorId?: string;
  companyName: string;
  companyLogoUrl?: string;
  aboutUs: string;
  companyEmail: string;
  yearFounded: number;
  companyWebsiteUrl?: string;
  companyVideoUrl?: string;
  companyPhone?: string; // TODO: default phoneCountryCode to 'United States +1 in page.tsx'
  companyMission?: string;
  companyVision?: string;
  size: string;
  estimatedAnnualHires?: number;
  isApproved: boolean;
  // Relations
  companyAddresses?: string[];
  companySocialLinks?: string[];
  companyTestimonials?: string[];
  logoUrl?: string | null;
}
