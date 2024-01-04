import type { Metadata } from "next";
import "@/ui/globals.css";

export const metadata: Metadata = {
  title: "Next trening",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body className={""}>{children}</body>
    </html>
  );
}
