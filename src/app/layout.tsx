import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundGradient from "@/components/layout/BgGradient";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Family Tree",
    description: "Connect with your family and relatives",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased text-sm`}
            >
                <div className="h-screen bg-[#091325] relative overflow-hidden">
                    <BackgroundGradient />
                    {children}
                </div>
            </body>
        </html>
    );
}
