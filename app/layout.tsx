import { roboto } from "@/app/ui/fonts";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/mui.theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ChatProvider } from "./contexts/ChatContext";
import ChatBot from "./ui/components/ChatBot";
import "@/app/ui/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SessionProvider>
              <ChatProvider>
                <ChatBot />
                {children}
              </ChatProvider>
            </SessionProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
