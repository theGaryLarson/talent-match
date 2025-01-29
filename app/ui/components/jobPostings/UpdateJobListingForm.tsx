"use client";

import { useEffect, useState } from "react";

export default function UpdateJobListingForm() {
  const [joblistings, setJobListings] = useState();
  useEffect(() => {
    fetch("/api/joblistings/getall")
      .then((r) => {
        return r.json();
      })
      .then((res) => {
        setJobListings(res);
      });
  });
  return <form></form>;
}
