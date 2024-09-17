'use client';
import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/lib/jobseekerStore';
import {
  JobseekerState,
  initializeIntroduction,
} from '@/lib/features/profileCreation/jobseekerSlice';

interface Props {
  jobseeker?: JobseekerState | null;
  children: React.ReactNode;
}

export default function StoreProvider({
  jobseeker = null,
  children,
}: Props) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    if (jobseeker !== null) {
      storeRef.current.dispatch(initializeIntroduction(jobseeker.introduction));
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
