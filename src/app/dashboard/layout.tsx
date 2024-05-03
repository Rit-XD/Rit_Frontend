import { GeistSans } from "geist/font/sans";
import "../globals.css";
import { useContext } from "react";
import { UserProvider } from "@/src/lib/user/useUser";
import { fetchUser } from "@/src/lib/user/fetchUser";
import { redirect } from "next/navigation";
import Link from "next/link";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Rit | Dashboard",
  description: "Revolution in transport",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <UserProvider>
          <nav>
            <ul>
              <li>
                <Link href={"/dashboard"}>Home</Link>
              </li>
              <li>
                <Link href={"/dashboard/settings"}>Settings</Link>
              </li>
            </ul>
          </nav>
          <main className="min-h-screen flex flex-col items-center">
            Layout voor mijn dashboard
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
