import { fetchUser } from "@/src/lib/user/fetchUser";
import AuthButton from "../../components/AuthButton";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Dashboard() {
  const user = await fetchUser();
  if (!user) redirect(`/login`);

  return (
    <main>
      <AuthButton />
      {/* we use serverside page and only import small client side component*/}
      <Link href="/dashboard/settings">Settings</Link>
    </main>
  );
}
