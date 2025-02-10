"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import "@/app/ui/profile-creation.css";
import { roboto } from "@/app/ui/fonts";
import ProfileCreationHeader from "@/app/ui/ProfileCreationHeader";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/mui.theme";

// REVIEW: You can locate the store in the layout component if all the routes using that layout need the store.
import EmployerStoreProvider from "../../../EmployerStoreProvider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { SessionProvider } from "next-auth/react";

export default function ProfileCreationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
          <AppRouterCacheProvider>
            <SessionProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <ProfileCreationHeader />
                <EmployerStoreProvider>{children}</EmployerStoreProvider>
              </ThemeProvider>
            </SessionProvider>
          </AppRouterCacheProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
