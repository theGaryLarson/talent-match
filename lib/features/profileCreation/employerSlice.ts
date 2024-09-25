'use client';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../jobseekerStore';
import {
  PostEmployerPersonalDTO,
  PostCompanyInfoDTO,
  PostEmployerAboutDTO,
  PostEmployerVideoDTO,
  PostEmployerMissionDTO,
  PostEmployerWorkDTO,
} from '@/data/dtos/EmployerProfileCreationDTOs';

// Define a type for the slice state
export interface EmployerState {
  personal: PostEmployerPersonalDTO;
  company: PostCompanyInfoDTO;
  about: PostEmployerAboutDTO;
  mission: PostEmployerMissionDTO;
  video: PostEmployerVideoDTO;
  disclosures: PostEmployerWorkDTO;
}

// Define the initial state using that type
export const initialState: EmployerState = {
  personal: {
    userId: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    phoneCountryCode: null,
    phone: null,
    photoUrl: null,
  },
  company: {
    userId: '',
    employerId: '',
    companyId: '',
    industrySectorId: null,
    industrySectorTitle: null,
    companyName: '',
    // REVIEW: Should just import PostAddressDTO?
    companyAddresses: [] as PostAddressDTO[], // Gary switched this from null. and uncommented it out in EmployerProfileCreationDTO.ts --> PostCompanyInfoDTO
    logoUrl: null,
    aboutUs: null, //ABOUT
    companyEmail: '',
    yearFounded: '',
    websiteUrl: null,
    videoUrl: null, //VIDEO
    phoneCountryCode: null,
    companyPhone: null,
    mission: null, //MISSION
    vision: null,
    size: '',
    estimatedAnnualHires: '',
  },
  about: {
    companyId: '',
    aboutUs: '',
  },
  mission: {
    companyId: '',
    mission: '',
  },
  disclosures: {
    userId: '',
    currentJobTitle: '',
    linkedInUrl: '',
    workAddressId: '',
  },
  video: {
    companyId: '',
    videoUrl: '',
  },
};

// Actions
export const employerSlice = createSlice({
  name: 'employer',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,

  // REVIEW: each field will need its own reducer? unsure if best, seems there should be a way to deconstruct ...state then update this.id/param specific?
  reducers: {
    initializeAbout: (state, action: PayloadAction<PostEmployerAboutDTO>) => {
      state.about = action.payload;
    },
    setAbout: (state, action: PayloadAction<PostEmployerAboutDTO>) => {
      state.about = action.payload;
    },
    initializeMission: (
      state,
      action: PayloadAction<PostEmployerMissionDTO>,
    ) => {
      state.mission = action.payload;
    },
    setMission: (state, action: PayloadAction<PostEmployerMissionDTO>) => {
      state.mission = action.payload;
    },
    initializeVideo: (state, action: PayloadAction<PostEmployerVideoDTO>) => {
      state.video = action.payload;
    },
    setVideo: (state, action: PayloadAction<PostEmployerVideoDTO>) => {
      state.video = action.payload;
    },
    initializeDisclosures: (
      state,
      action: PayloadAction<PostEmployerWorkDTO>,
    ) => {
      state.disclosures = action.payload;
    },
    setDisclosures: (state, action: PayloadAction<PostEmployerWorkDTO>) => {
      state.disclosures = action.payload;
    },
    initializePersonal: (
      state,
      action: PayloadAction<PostEmployerPersonalDTO>,
    ) => {
      state.personal = action.payload;
    },
    setPersonal: (state, action: PayloadAction<PostEmployerPersonalDTO>) => {
      state.personal = action.payload;
    },
    initializeCompany: (state, action: PayloadAction<PostCompanyInfoDTO>) => {
      state.company = action.payload;
    },
    setCompany: (state, action: PayloadAction<PostCompanyInfoDTO>) => {
      state.company = action.payload;
    },
  },
});

export const {
  initializeAbout,
  setAbout,
  initializeMission,
  setMission,
  initializeVideo,
  setVideo,
  initializeDisclosures,
  setDisclosures,
  initializePersonal,
  setPersonal,
  initializeCompany,
  setCompany,
} = employerSlice.actions;

export default employerSlice.reducer;
