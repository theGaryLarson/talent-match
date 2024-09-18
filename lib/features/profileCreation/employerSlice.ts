'use client';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../jobseekerStore';
import { PostEmployerPersonalDTO, PostCompanyInfoDTO } from '@/data/dtos/EmployerProfileCreationDTOs';

// Define a type for the slice state
export interface EmployerState {
  personal: PostEmployerPersonalDTO;
  company: PostCompanyInfoDTO;
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
    companyAddresses: PostAddressDTO[],
    logoUrl: null,
    aboutUs: null,
    companyEmail: '',
    yearFounded: '',
    websiteUrl: null,
    videoUrl: null,
    phoneCountryCode: null,
    companyPhone: null,
    mission: null,
    vision: null,
    size: '',
    estimatedAnnualHires: '',
  }
};

// Actions
export const employerSlice = createSlice({
  name: 'employer',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,

  // REVIEW: each field will need its own reducer? unsure if best, seems there should be a way to deconstruct ...state then update this.id/param specific?
  reducers: {
    initializePersonal: (state, action: PayloadAction<PostEmployerPersonalDTO>) => {
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

export const { initializePersonal, setPersonal, initializeCompany, setCompany } =
  employerSlice.actions;

// TODO: Review if needed in future
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default employerSlice.reducer;
