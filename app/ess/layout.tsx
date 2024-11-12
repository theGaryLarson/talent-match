import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Nav from "./ui/nav";
import MyMsalProvider from "./my-msal-provider";
import { Box, ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./mui.theme";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import { SessionProvider } from 'next-auth/react';
import '@/app/ui/global.css';

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Career Launch Programs - Occupations",
  description: "Learn about our programs to launch your career in tech",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Box component={"body"} className={roboto.className} sx={{ margin: 0 }}>
        <MyMsalProvider>
          <SessionProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline>
                <Header />
                {children}
                <Footer />
              </CssBaseline>
            </ThemeProvider>
          </SessionProvider>
        </MyMsalProvider>

      </Box>
    </html>
  );
}
