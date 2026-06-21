import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Digital Heroes",
  description: "Golf Charity Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#0f172a",
          color: "white",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* GLOBAL NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main style={{ minHeight: "100vh" }}>
          {children}
        </main>
      </body>
    </html>
  );
}