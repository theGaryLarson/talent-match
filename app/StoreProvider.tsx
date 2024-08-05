// NOTE: Redux client to provide store using makeStore() from ../lib/store.ts per: https://redux.js.org/usage/nextjs#providing-the-store
'use client'
import React, { useRef } from 'react';
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'
import { JobseekerState, initializeJobseeker } from '../lib/features/profileCreation/jobseekerSlice'
import { FormState, initializeForm } from '../lib/features/profileCreation/formSlice'
import { CounterState, initializeCounter } from '../lib/features/profileCreation/counterSlice'

interface Props {
    jobseeker?: JobseekerState | null;
    form?: FormState | null;
    counter?: CounterState | null;
    children: React.ReactNode;
}

export default function StoreProvider({
    jobseeker = null,
    form = null,
    counter = null,
    children
}: Props) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
        if (jobseeker !== null) {
            storeRef.current.dispatch(initializeJobseeker(jobseeker))
        }
        if (form !== null) {
            storeRef.current.dispatch(initializeForm(form))
        }
        if (counter !== null) {
            storeRef.current.dispatch(initializeCounter(counter))
        }
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}