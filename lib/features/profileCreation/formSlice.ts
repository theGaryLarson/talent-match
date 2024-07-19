'use client';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

// Define a type for the slice state
export interface FormField {
    id: string;
    label: string;
    value: string | number;
    type: 'text' | 'email' | 'number' | 'select' | 'radio';
    options?: { value: string | number; label: string }[];
}

export interface FormState {
    fields: FormField[];
    isSubmitting: boolean;
    error: string | null;
}


// Define the initial state using that type
const initialState: FormState = {
    fields: [],
    isSubmitting: false,
    error: null,
}

// Actions
export const formSlice = createSlice({
    name: 'form',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,

    reducers: {
        addField: (state, action: PayloadAction<{ id: string; label: string; value: string | number; type: 'text' | 'email' | 'number' | 'select' | 'radio'; options?: { value: string | number; label: string }[] }>) => {
            state.fields.push({
                id: action.payload.id,
                label: action.payload.label,
                value: action.payload.value,
                type: action.payload.type,
                options: action.payload.options,
            });
        },
        updateField: (state, action: PayloadAction<{ id: string; value: string | number }>) => {
            const { id, value } = action.payload;
            const field = state.fields.find((field) => field.id === id);
            if (field) {
                field.value = value;
            }
        },
        submitForm: (state) => {
            state.isSubmitting = true;
            state.error = null;
        },
        submitFormSuccess: (state) => {
            state.isSubmitting = false;
        },
        submitFormFailure: (state, action: PayloadAction<string>) => {
            state.isSubmitting = false;
            state.error = action.payload;
        },
    }
});
    
export const { addField, updateField, submitForm, submitFormSuccess, submitFormFailure } = formSlice.actions;
export default formSlice.reducer;