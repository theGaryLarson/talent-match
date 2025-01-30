"use client";

import { useEffect, useState } from "react";
import { devLog } from "@/app/lib/utils";

export default function UpdateJobListingForm() {
  const [joblistings, setJobListings] = useState();
  useEffect(() => {
    fetch("/api/joblistings/getall")
      .then((r) => {
        return r.json();
      })
      .then((res) => {
        setJobListings(res);
        devLog(joblistings); // just logged this so its complete if conflict remove this line.
      });
  });
  return <form></form>;
}
