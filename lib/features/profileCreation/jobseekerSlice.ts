'use client';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

// Define a type for the slice state
export interface JobseekerState {
    fName: string,
    lName: string
}

// Define the initial state using that type
const initialState: JobseekerState = {
    fName: '',
    lName: ''
}

// Actions
export const jobseekerSlice = createSlice({
    name: 'counter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,

    // REVIEW: each field will need its own reducer? unsure if best, seems there should be a way to deconstruct ...state then update this.id/param specific?
    reducers: {
        initializeJobseeker: (state, action: PayloadAction<JobseekerState>) => {
            state.fName = action.payload.fName;
            state.lName = action.payload.lName;
        },
        setFirstName: (state, action: PayloadAction<string>) => { state.fName = action.payload },
        setLastName: (state, action: PayloadAction<string>) => { state.lName = action.payload },
        submitForm: (state) => {
            // ...state
            // state.this = action.payload;
            console.log(state);
            console.log(state.fName, state.lName);
        }
    }
});

export const { initializeJobseeker, setFirstName, setLastName, submitForm } = jobseekerSlice.actions;

// TODO: Review if needed in future
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default jobseekerSlice.reducer;