// NOTE: Request instance Store per Nextjs Redux starter here: https://redux.js.org/usage/nextjs#folder-structure
import { Middleware } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { configureStore } from '@reduxjs/toolkit'
import jobseekerReducer, { JobseekerState } from './features/profileCreation/jobseekerSlice'
import employerReducer, { EmployerState } from './features/profileCreation/employerSlice'
import formReducer, { FormState } from './features/profileCreation/formSlice'
import counterReducer, { CounterState } from './features/profileCreation/counterSlice'

// const loggerMiddleware: Middleware = (storeAPI) => (next) => (action) => {
//     console.log('Dispatching:', action);
//     const result = next(action);
//     console.log('Next state:', storeAPI.getState());
//     return result;
// };

interface PreloadedState {
    jobseeker: JobseekerState,
    employer: EmployerState,
    form: FormState,
    counter: CounterState
}

// WARNING: preloadedState MUST utilize the interface which MUST match the same slices used for the reducers
// WARNING: The ConfigureStoreOptions MUST be passed directly into configureStore without having its type specified
export const makeStore = (preloadedState?:PreloadedState) => configureStore({
    reducer: {
        jobseeker: jobseekerReducer,
        employer: employerReducer,
        form: formReducer,
        counter: counterReducer
    },
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']