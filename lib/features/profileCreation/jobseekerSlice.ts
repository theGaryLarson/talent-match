'use client';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../jobseekerStore';
import {
  HighestCompletedEducationLevel,
  JsDisclosuresPostDTO,
  JsEducationPageDTO,
  JsIntroPostDTO,
  JsPreferencesDTO,
  JsShowcaseDTO,
  JsWorkExpDTO,
  JsWorkDTO,
} from '@/data/dtos/JobSeekerProfileCreationDTOs';

interface JsWorkExpStringDateDTO extends Omit<JsWorkExpDTO, 'workExperiences'> {
  workExperiences?: JsWorkStringDateDTO[];
}

interface JsWorkStringDateDTO extends Omit<JsWorkDTO, 'startDate' | 'endDate'> {
  startDate: string;
  endDate: string | null;
}

// Define a type for the slice state
export interface JobseekerState {
  introduction: JsIntroPostDTO;
  education: JsEducationPageDTO;
  workExperience: JsWorkExpStringDateDTO;
  showcase: JsShowcaseDTO;
  preferences: JsPreferencesDTO;
  disclosures: JsDisclosuresPostDTO;
}

// Define the initial state using that type
export const initialState: JobseekerState = {
  introduction: {
    userId: '',
    photoUrl: null,
    firstName: '',
    lastName: '',
    birthDate: '',
    phoneCountryCode: null,
    phone: null,
    zipCode: '',
    state: null,
    city: null,
    county: null,
    email: '',
    introHeadline: null,
    currentJobTitle: null,
    resumeUrl: null,
  },
  education: {
    userId: '',
    jobseekerId: '',
    highestLevelOfStudy: HighestCompletedEducationLevel.NoFormalEducation,
    educations: [],
    certifications: [],
    projects: [],
  },
  workExperience: {
    userId: '',
    yearsWorkExperience: '',
    monthsInternshipExperience: null,
    isAuthorizedToWorkUsa: undefined,
    requiresSponsorship: undefined,
    workExperiences: [],
  },
  showcase: {
    userId: '',
    skills: [],
    portfolioUrl: null,
    portfolioPassword: null,
    video_url: null,
  },
  preferences: {
    userId: '',
    targetedPathwayId: null,
    targetedPathway: null,
    preferredEmploymentType: null,
  },
  disclosures: {
    userId: '',
    isVeteran: '',
    disability: '',
    gender: '',
    race: '',
    ethnicity: '',
    hasReadTerms: false,
  },
};

// Actions
export const jobseekerSlice = createSlice({
  name: 'jobseeker',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,

  // REVIEW: each field will need its own reducer? unsure if best, seems there should be a way to deconstruct ...state then update this.id/param specific?
  reducers: {
    setIntroduction: (state, action: PayloadAction<JsIntroPostDTO>) => {
      state.introduction = action.payload;
    },
    setEducation: (state, action: PayloadAction<JsEducationPageDTO>) => {
      state.education = action.payload;
    },
    setWorkExperience: (
      state,
      action: PayloadAction<JsWorkExpStringDateDTO>,
    ) => {
      state.workExperience = action.payload;
    },
    setShowcase: (state, action: PayloadAction<JsShowcaseDTO>) => {
      state.showcase = action.payload;
    },
    setPreferences: (state, action: PayloadAction<JsPreferencesDTO>) => {
      state.preferences = action.payload;
    },
    setDisclosures: (state, action: PayloadAction<JsDisclosuresPostDTO>) => {
      state.disclosures = action.payload;
    },
  },
});

export const {
  setIntroduction,
  setEducation,
  setWorkExperience,
  setShowcase,
  setPreferences,
  setDisclosures,
} = jobseekerSlice.actions;

// TODO: Review if needed in future
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default jobseekerSlice.reducer;
