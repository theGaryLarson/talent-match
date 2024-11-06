import { SkillDTO } from '@/data/dtos/SkillDTO';

export type JsIntroDTO = {
  email: string;
  userId: string;
  birthDate?: string | Date | null;
  city?: string | null;
  county?: string | null;
  currentJobTitle?: string | null;
  firstName?: string | null;
  introHeadline?: string | null;
  lastName?: string | null;
  phone?: string | null;
  phoneCountryCode?: string | null;
  photoUrl?: string | null;
  resumeUrl?: string | null;
  state?: string | null;
  zipCode?: string | null;
};

export type JsIntroPostDTO = {
  email: string;
  userId: string;
  birthDate?: string | Date;
  city?: string | null;
  county?: string | null;
  currentJobTitle?: string | null;
  firstName?: string;
  introHeadline?: string | null;
  lastName?: string;
  phone?: string | null;
  phoneCountryCode?: string | null;
  photoUrl?: string | null;
  resumeUrl?: string | null;
  state?: string | null;
  zipCode?: string;
};

export type CertDTO = {
  certId: string;
  issuingOrg: string;
  name: string;
  credentialId?: string | null;
  credentialUrl?: string | null;
  description?: string | null; // ADD description
  expiryDate?: string;
  issueDate?: string;
  logoUrl?: string | null; // ADD logoUrl
};

export type ProjectExpDTO = {
  completionDate: string | null;
  problemSolvedDescription: string;
  projectId: string;
  projectRole: string;
  projTitle: string;
  skills: SkillDTO[];
  startDate: string | null;
  teamSize: string;
  repoUrl?: string | null; // ADD repoUrl
  videoDemoUrl?: string | null; // ADD videoDemoUrl
};

// Updated to match WJI grant reporting data (do not modify)
export enum HighestCompletedEducationLevel {
  // VocationalQualification = 'Vocational Qualification / Certification',
  NoFormalEducation = 'Less than high school diploma',
  GED = 'GED',
  HighSchool = 'High School',
  PostHighSchool = 'Some post high school, no degree or certificate',
  Certificate = 'Certificate (less than two years)',
  Associates = 'Associates',
  Bachelors = 'Bachelors',
  Masters = 'Masters',
  Doctorate = 'Doctorate',
}

// Rank mapping for the enum
export const educationRank: Record<HighestCompletedEducationLevel, number> = {
  [HighestCompletedEducationLevel.NoFormalEducation]: 0,
  [HighestCompletedEducationLevel.GED]: 1,
  [HighestCompletedEducationLevel.HighSchool]: 2,
  [HighestCompletedEducationLevel.PostHighSchool]: 3,
  [HighestCompletedEducationLevel.Certificate]: 4,
  [HighestCompletedEducationLevel.Associates]: 5,
  [HighestCompletedEducationLevel.Bachelors]: 6,
  [HighestCompletedEducationLevel.Masters]: 7,
  [HighestCompletedEducationLevel.Doctorate]: 8,
};

// included for WJI grant reporting (do not modify)
export enum ProgramEnrollmentStatus {
  Applied = 'Admitted, not yet enrolled',
  Enrolled = 'Currently active in program',
  Graduated = 'Graduated / Completed',
  Withdrawn = 'Withdrawn / terminated',
}
export enum CollegeDegreeType {
  AssociatesDegree = "Associate's Degree",
  BachelorsDegree = "Bachelor's Degree",
  MastersDegree = "Master's Degree",
  DoctoralDegree = 'Doctoral Degree',
}

export enum HighSchoolDegreeType {
  None = 'None',
  HighSchool = 'Diploma',
  GED = 'GED',
}

export enum EducationLevel {
  Unselected = '',
  HighSchool = 'High School',
  College = 'College',
  TrainingProgram = 'Training Program / Bootcamp',
  PreApprenticeship = 'Pre-Apprenticeship',
  Other = 'Other',
}

export enum PreAEduSystem {
  HighSchool = 'High School',
  College = 'College',
  Other = 'Other',
}

export type JsEducationInfoDTO = {
  gradDate: string;
  id: string;
  isEnrolled: boolean;
  preAppEdSystem: PreAEduSystem | null;
  programId: string;
  programName: string;
  startDate: string;
  degreeType?: CollegeDegreeType | HighSchoolDegreeType | null;
  description?: string | null;
  edLevel?: EducationLevel;
  edProviderId?: string; // use name lookup to find ID.
  edProviderName?: string;
  enrollmentStatus?: ProgramEnrollmentStatus;
  gpa?: string | null;
};

export type JsEducationPageDTO = {
  highestLevelOfStudy: HighestCompletedEducationLevel;
  userId: string;
  certifications: CertDTO[];
  educations: JsEducationInfoDTO[];
  projects: ProjectExpDTO[];
  jobseekerId?: string;
};

export type JsWorkExpDTO = {
  userId: string;
  yearsWorkExperience: string;
  workExperiences?: JsWorkDTO[];
  isAuthorizedToWorkUsa?: boolean; // TODO: encrypt
  monthsInternshipExperience?: string | null;
  requiresSponsorship?: boolean; // TODO: encrypt
};

export type JsWorkDTO = {
  company: string;
  endDate: Date | null;
  isCurrentJob: boolean;
  isInternship: boolean; // ADD isInternship
  jobseekerId: string;
  jobTitle: string;
  responsibilities: string;
  sectorId: string | null;
  startDate: Date;
  techAreaId: string | null;
  workId: string;
};

export type JsShowcaseDTO = {
  userId: string;
  skills: SkillDTO[];
  introduction?: string | null;
  portfolioPassword?: string | null; // TODO: encrypt. password for employer to view portfolio if jobseeker has portfolio pw setup.
  portfolioUrl?: string | null;
  resume_url?: string | null;
  video_url?: string | null;
};

export type JsPreferencesDTO = {
  userId: string;
  preferredEmploymentType?: string | null;
  targetedPathway?: string | null;
  targetedPathwayId?: string | null;
};

// TODO: this needs to be secure
export type JsDisclosuresDTO = {
  hasReadTerms: boolean; //users.has_read_terms
  ethnicity?: string | null; // users.ethnicity
  gender?: string | null;
  hasDisability?: string | null; // privateDetails
  isVeteran?: string | null; // privateDetails
  jobseekerId?: string | null; // jsDetails
  race?: string | null;
};

export type JsDisclosuresPostDTO = {
  disability: string; // jobseekers[0].jobseekers_private_data[0].has_disability
  ethnicity: string;
  gender: string; // users.gender
  hasReadTerms: boolean; //users.has_read_terms
  isVeteran: string; // jobseekers[0].jobseekers_private_data[0].is_veteran
  race: string; //users.race
  userId: string;
};
