"use client";

import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import { devLog } from "@/app/lib/utils";
import { useEffect, useState } from "react";

interface props {
  className?: string;
  deletionDate?: Date;
}

export default function DeletionFlag({ className, deletionDate }: props) {
  let formattedDate;
  let timeLeftMessage;
  if (deletionDate) {
    let currTime = Date.now();
    console.log(currTime);
    let timeLeft = (deletionDate.getTime() - currTime) / (1000 * 60 * 60 * 24);
    timeLeftMessage =
      timeLeft < 1
        ? `${Math.floor(timeLeft * 24)} hours and ${Math.floor(((timeLeft * 24) % 1) * 60)} minutes left`
        : `${Math.floor(timeLeft)} full days left`;
    formattedDate = `${deletionDate.getMonth()}/${deletionDate.getDate()}/${deletionDate.getFullYear()}`;
  }
  //   console.log(deletionDate.toTimeString());

  return deletionDate ? (
    <Alert severity="warning" color="error" className={className}>
      <AlertTitle>Warning!</AlertTitle>
      Your profile is incomplete and flagged for deletion by{" "}
      {`${formattedDate} (${timeLeftMessage}).`}
    </Alert>
  ) : (
    <></>
  );
}
