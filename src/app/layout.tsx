import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import { ResponsiveProvider } from "./context/ResponsiveContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatlY",
  description: "A chat application in nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ResponsiveProvider>
          <AuthProvider>
            <ChatContextProvider>
              {children}
              <Toaster />
            </ChatContextProvider>
          </AuthProvider>
        </ResponsiveProvider>
      </body>
    </html>
  );
}
