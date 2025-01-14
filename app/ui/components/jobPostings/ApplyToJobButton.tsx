'use client';

import React, { MouseEvent, useOptimistic, startTransition } from 'react';
import RoundedButton from '@/app/ui/components/RoundedButton';
import { JobStatus } from '@/app/lib/jobseekerJobTracking';

interface Props {
  id: string;
  appliedStatus?: string;
}

export default function ApplyToJobButton({ id, appliedStatus = '' }: Props) {
  // Initial state based on appliedStatus
  const initialAppliedState =
    appliedStatus == JobStatus.Accepted ||
    appliedStatus == JobStatus.Applied ||
    appliedStatus == JobStatus.Interviewing ||
    appliedStatus == JobStatus.Negotiating ||
    appliedStatus == JobStatus.NoResponse ||
    appliedStatus == JobStatus.NotSelected;

  const [optimisticHasApplied, updateOptimisticHasApplied] = useOptimistic(
    initialAppliedState,
    (state, newValue: boolean) => newValue,
  );

  const handleApplicationClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    try {
      if (!optimisticHasApplied) {
        startTransition(() => {
          updateOptimisticHasApplied(true);
        });

        const response = await fetch(`/api/joblistings/apply/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.log('error', response);
          startTransition(() => {
            updateOptimisticHasApplied(false);
          });
          throw new Error('Failed to update application status.');
        }
      } else {
        startTransition(() => {
          updateOptimisticHasApplied(false);
        });

        const response = await fetch(`/api/joblistings/withdraw/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          startTransition(() => {
            updateOptimisticHasApplied(true);
          });
          throw new Error('Failed to update application status');
        }
      }
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  return (
    <RoundedButton
      content={optimisticHasApplied ? 'Withdraw Application' : 'Apply'}
      invertColor
      snug
      newColors
      bold={false}
      className="capitalize"
      onClick={handleApplicationClick}
    />
  );
}
