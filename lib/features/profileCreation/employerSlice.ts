'use client';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { PostEmployerPersonalDTO } from '@/data/dtos/EmployerProfileCreationDTOs';

// Define a type for the slice state
export interface EmployerState {
  personal: PostEmployerPersonalDTO;
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
  },
});

export const { initializePersonal, setPersonal } =
  employerSlice.actions;

// TODO: Review if needed in future
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default employerSlice.reducer;
