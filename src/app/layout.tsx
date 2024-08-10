import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Neural Network | Handwritten Digit Recognition",
    description: "A neural network that recognises handwritten digits.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className="container mx-auto py-10">
                    {children}
                </main>
            </body>
        </html>
    );
}
