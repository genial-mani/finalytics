import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ToastProvider from "@/providers/ToastProvider";
import MaxWidthProvider from "@/providers/MaxWidthProvider";

export const metadata: Metadata = {
  title: "Finalytics",
  description: "A simple finance visualizer and tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="poppins relative dark min-h-screen">
        <div
          className="absolute inset-0 -z-1"
          style={{
            background: "#020617",
            backgroundImage: `
        linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
        radial-gradient(circle at 50% 60%, rgb(153, 30, 249, 0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
      `,
            backgroundSize: "40px 40px, 40px 40px, 100% 100%",
            backgroundAttachment: "fixed"
          }}
        />
        <Navbar />
        <ToastProvider>
          <MaxWidthProvider>{children}</MaxWidthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
