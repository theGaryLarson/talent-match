import "@/app/ui/global.css";
import Footer from "@/app/ui/Footer";
import SignupHeader from "@/app/ui/SignupHeader";

export const metadata = {
  title: "Tech Workforce Coalition - Signin",
  description: "Tech Workforce Coalition Signin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex min-h-screen flex-col`}>
      <SignupHeader />
      {children}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
