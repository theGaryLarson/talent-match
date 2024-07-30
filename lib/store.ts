// NOTE: Request instance Store per Nextjs Redux starter here: https://redux.js.org/usage/nextjs#folder-structure
import { Middleware } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit'
import jobseekerReducer from './features/profileCreation/jobseekerSlice'
import formReducer from './features/profileCreation/formSlice'

// const loggerMiddleware: Middleware = (storeAPI) => (next) => (action) => {
//     console.log('Dispatching:', action);
//     const result = next(action);
//     console.log('Next state:', storeAPI.getState());
//     return result;
// };

export const makeStore = (preloadedState?: any) => {
    const configureStoreOptions : ConfigureStoreOptions = {
        reducer: {
            jobseeker: jobseekerReducer,
            form: formReducer,
        },
        preloadedState,
        devTools: process.env.NODE_ENV !== 'production',
        // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
    };

    return configureStore(configureStoreOptions);
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']