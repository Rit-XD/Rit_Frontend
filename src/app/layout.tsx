import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { useContext } from "react";
import { UserProvider } from "@/src/lib/user/useUser";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Rit | Dashboard",
  description: "Revolution in transport",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
