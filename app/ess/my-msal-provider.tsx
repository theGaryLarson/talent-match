"use client";

import { MsalProvider } from "@azure/msal-react";
import msalInstance from "../../msal-instance";
import { useEffect, useState } from "react";

export default function MyMsalProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeMsal = async () => {
      try {
        await msalInstance.initialize();
        setIsInitialized(true);
      } catch (error) {
        console.error("Error initializing MSAL", error);
      }
    };

    initializeMsal();
  }, []);

  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
}
