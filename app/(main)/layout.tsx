import Header from "@/app/ui/Header";
import Footer from "@/app/ui/Footer";
import theme from "@/mui.theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
