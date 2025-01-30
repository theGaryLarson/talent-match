"use client";

import { MsalProvider } from "@azure/msal-react";
import msalInstance from "../../msal-instance";
import { useEffect } from "react";

export default function MyMsalProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const initializeMsal = async () => {
      try {
        await msalInstance.initialize();
      } catch (error) {
        console.error("Error initializing MSAL", error);
      }
    };

    initializeMsal();
  }, []);

  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
}
