'use client';
import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/lib/store';
import {
  EmployerState,
  initializePersonal,
} from '@/lib/features/profileCreation/employerSlice';
import {
  FormField,
  FormState,
  initializeForm,
} from '@/lib/features/profileCreation/formSlice';
import {
  CounterState,
  initializeCounter,
} from '@/lib/features/profileCreation/counterSlice';

interface Props {
  employer?: EmployerState | null;
  form?: FormState | null; // Ensure this is of the correct type
  counter?: CounterState | null;
  children: React.ReactNode;
}

export default function StoreProvider({
  employer = null,
  form = null,
  counter = null,
  children,
}: Props) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    if (employer !== null) {
      storeRef.current.dispatch(initializePersonal(employer.personal));
    }
    if (form !== null) {
      // Convert form to the expected type if needed
      const formFields: FormField[] = Array.isArray(form) ? form : [];
      storeRef.current.dispatch(initializeForm(formFields));
    }
    if (counter !== null) {
      storeRef.current.dispatch(initializeCounter(counter));
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
