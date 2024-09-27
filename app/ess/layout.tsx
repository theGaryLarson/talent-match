import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Nav from "./ui/nav";
import MyMsalProvider from "./my-msal-provider";
import { Box, ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./mui.theme";

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
          <ThemeProvider theme={theme}>
            <CssBaseline>
              <Nav />
              {children}
            </CssBaseline>
          </ThemeProvider>
        </MyMsalProvider>
      </Box>
    </html>
  );
}
