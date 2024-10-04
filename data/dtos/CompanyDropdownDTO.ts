export type CompanyDropdownDTO = {
  companyId: string;
  companyName: string;
  companyLogoUrl?: string;
  industrySectorId?: string;
  companyWebsite: string | null;
  companyEmail: string;
  companyPhone: string | null;
  yearFounded: number | null;
  companySize: string;
  predictedHires: string;
  approvedCompany: boolean;
};
