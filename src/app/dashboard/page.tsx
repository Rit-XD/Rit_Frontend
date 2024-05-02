import { fetchUser } from "@/src/lib/user/fetchUser";
import AuthButton from "../components/AuthButton";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await fetchUser();
  // if (!user) redirect(`/login`);
  console.log(user);
  return (
    <main>
      <AuthButton />
      {/* we use serverside page and only import small client side component*/}
    </main>
  );
}
