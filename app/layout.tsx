import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TypeMaster - Ultimate Typing Speed Test",
  description: "Test your typing speed (WPM) and accuracy with TypeMaster. Track your progress, compete on the leaderboard, and improve your skills.",
  openGraph: {
    title: "TypeMaster - Ultimate Typing Speed Test",
    description: "Test your typing speed (WPM) and accuracy with TypeMaster.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
