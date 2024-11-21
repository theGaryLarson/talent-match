import { SkillDTO } from '@/data/dtos/SkillDTO';

export type JsIntroDTO = {
  userId: string;
  photoUrl?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  birthDate?: string | Date | null;
  phoneCountryCode?: string | null;
  phone?: string | null;
  zipCode?: string | null;
  state?: string | null;
  city?: string | null;
  county?: string | null;
  email: string;
  introHeadline?: string | null;
  currentJobTitle?: string | null;
};

export type JsIntroPostDTO = {
  userId: string;
  photoUrl?: string | null;
  firstName: string;
  lastName: string;
  birthDate: string | Date;
  phoneCountryCode?: string | null;
  phone?: string | null;
  zipCode: string;
  state?: string | null;
  city?: string | null;
  county?: string | null;
  email: string;
  introHeadline?: string | null;
  currentJobTitle?: string | null;
};

export type CertDTO = {
  certId: string;
  name: string;
  logoUrl?: string | null; // ADD logoUrl
  issuingOrg: string;
  credentialId?: string | null;
  credentialUrl?: string | null;
  issueDate?: string;
  expiryDate?: string;
  description?: string | null; // ADD description
};

export type ProjectExpDTO = {
  projectId: string;
  projTitle: string;
  projectRole: string;
  startDate: string | null;
  completionDate: string | null;
  problemSolvedDescription: string;
  teamSize: string;
  repoUrl?: string | null; // ADD repoUrl
  videoDemoUrl?: string | null; // ADD videoDemoUrl
  skills: SkillDTO[];
};

// Updated to match WJI grant reporting data (do not modify)
export enum HighestCompletedEducationLevel {
  // VocationalQualification = 'Vocational Qualification / Certification',
  NoFormalEducation = 'Not yet completed High School',
  GED = 'GED',
  HighSchool = 'High School Diploma',
  PostHighSchool = 'Some training or study post high school',
  Certificate = 'Certificate (less than two years)',
  Associates = "Associates's Degree",
  Bachelors = "Bachelor's Degree",
  Masters = "Master's Degree",
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
  id: string;
  edLevel?: EducationLevel;
  edProviderId?: string; // use name lookup to find ID.
  edProviderName?: string;
  preAppEdSystem: PreAEduSystem | null;
  isEnrolled: boolean;
  enrollmentStatus?: ProgramEnrollmentStatus;
  startDate: string;
  gradDate: string;
  degreeType?: CollegeDegreeType | HighSchoolDegreeType | null;
  programId: string;
  programName: string;
  gpa?: string | null;
  description?: string | null;
};

export type JsEducationPageDTO = {
  userId: string;
  jobseekerId?: string;
  highestLevelOfStudy: HighestCompletedEducationLevel;
  educations: JsEducationInfoDTO[];
  certifications: CertDTO[];
  projects: ProjectExpDTO[];
};

export type JsWorkExpDTO = {
  userId: string;
  yearsWorkExperience: string;
  monthsInternshipExperience?: string | null;
  isAuthorizedToWorkUsa?: boolean | null;
  requiresSponsorship?: boolean | null;
  workExperiences?: JsWorkDTO[];
};

export type JsWorkDTO = {
  workId: string;
  jobseekerId: string;
  techAreaId: string | null;
  sectorId: string | null;
  company: string;
  isInternship: boolean; // ADD isInternship
  jobTitle: string;
  isCurrentJob: boolean;
  startDate: Date;
  endDate: Date | null;
  responsibilities: string;
};

export type JsShowcaseDTO = {
  userId: string;
  introduction?: string | null;
  skills: SkillDTO[];
  portfolioUrl?: string | null;
  portfolioPassword?: string | null; // TODO: encrypt. password for employer to view portfolio if jobseeker has portfolio pw setup.
  video_url?: string | null;
  linkedin_url?: string | null;
};

export type JsPreferencesDTO = {
  userId: string;
  targetedPathwayId?: string | null;
  targetedPathway?: string | null;
  preferredEmploymentType?: string | null;
};

// TODO: this needs to be secure
export type JsDisclosuresDTO = {
  jobseekerId?: string | null; // jsDetails
  isVeteran?: string | null; // privateDetails
  disability?: string | null; // privateDetails
  disabilityStatus?: string | null; // privateDetails
  gender?: string | null;
  race?: string | null;
  ethnicity?: string | null; // users.ethnicity
};

export type JsDisclosuresPostDTO = {
  userId: string;
  isVeteran: string; // jobseekers[0].jobseekers_private_data[0].is_veteran
  disability: string; // jobseekers[0].jobseekers_private_data[0].has_disability
  disabilityStatus: string;
  gender: string; // users.gender
  race: string; //users.race
  ethnicity: string;
};
