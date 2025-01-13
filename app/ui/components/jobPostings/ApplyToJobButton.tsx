'use client'

import React, { MouseEvent, useState } from "react";
import RoundedButton from "@/app/ui/components/RoundedButton";
import { JobStatus } from "@/app/lib/jobseekerJobTracking";

interface Props {
  id: string;
  appliedStatus?: string;
}

export default function ApplyToJobButton({
  id,
  appliedStatus = "",
}: Props){
  const [fetchIsHappening, setFetchIsHappening] = useState<boolean>(false);
  const [hasApplied, setHasApplied] = useState<boolean>(
    appliedStatus == JobStatus.Accepted ||
    appliedStatus == JobStatus.Applied ||
    appliedStatus == JobStatus.Interviewing ||
    appliedStatus == JobStatus.Negotiating ||
    appliedStatus == JobStatus.NoResponse ||
    appliedStatus == JobStatus.NotSelected
  );

  const handleApplicationClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    try {
      setFetchIsHappening(true);
      if (!hasApplied) {
        const response = await fetch(`/api/joblistings/apply/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.log('error',response);
          throw new Error('Failed to update application status. ');
        }
        setHasApplied(true);
      }
      else {
        const response = await fetch(`/api/joblistings/withdraw/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to update application status');
        }
        setHasApplied(false);
      }
    } catch (error) {
      console.error('Error updating application:', error);
    } finally {
      setFetchIsHappening(false);
    }
  }

  return (
    <RoundedButton
      content={hasApplied ? 'Withdraw Application' : 'Apply'}
      invertColor
      snug
      newColors
      bold={false}
      className="capitalize"
      disabled={fetchIsHappening}
      onClick={handleApplicationClick}
    />
  );
}