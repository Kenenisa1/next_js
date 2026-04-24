import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PHProvider } from "./providers";
import { Suspense } from "react";
import Script from 'next/script';
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hawassa Pulse | Event Management",
  description: "Next.js high-end event platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">
        {/* GLOBAL CLOUDINARY SCRIPT */}
        <Script 
          src="https://upload-widget.cloudinary.com/global/all.js" 
          strategy="beforeInteractive" 
        />

        <Suspense fallback={<LoadingSpinner />}>
          <PHProvider>
            {/* Simplified Navbar logic. 
              If you want to hide Navbar on admin pages, 
              it's better handled via path checking or separate layout folders.
            */}
            <Navbar />
             <Toaster 
          theme="dark" 
          position="top-right"
          toastOptions={{
            style: { background: '#000', border: '1px solid #18181b', color: '#fff' },
          }} 
        />
            <main className="flex-grow">
              {children}
              
            </main>

            <Footer />
          </PHProvider>
        </Suspense>
      </body>
    </html>
  );
}

// Reusable Loading Spinner for clean code
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <svg
        className="animate-spin h-10 w-10 text-sky-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
}