import { Box } from "@mui/material";
import Header from "@/app/ui/components/mui/Header";
import Footer from "../ui/Footer";
import "@/app/ui/global.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box>
      <Header />
      {children}
      <Footer />
    </Box>
  );
}
