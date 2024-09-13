'use client';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { JsIntroPostDTO } from '@/data/dtos/JobSeekerProfileCreationDTOs';

// Define a type for the slice state
export interface JobseekerState {
    introduction: JsIntroPostDTO
}

// Define the initial state using that type
const initialState: JobseekerState = {
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
        resumeUrl: null
    }
}

// Actions
export const jobseekerSlice = createSlice({
    name: 'jobseeker',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,

    // REVIEW: each field will need its own reducer? unsure if best, seems there should be a way to deconstruct ...state then update this.id/param specific?
    reducers: {
        initializeIntroduction: (state, action: PayloadAction<JsIntroPostDTO>) => {
            state.introduction = action.payload;
        },
        setIntroduction: (state, action: PayloadAction<JsIntroPostDTO>) => { state.introduction = action.payload }
    }
});

export const { initializeIntroduction, setIntroduction } = jobseekerSlice.actions;

// TODO: Review if needed in future
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default jobseekerSlice.reducer;