import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import Image from "next/image";
import { useAppDispatch } from "@/lib/store";
import { setAuthState } from "@/lib/features/slices/authslice";
import { getUser } from "@/lib/getuser";

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  const dispatch = useAppDispatch();

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const path = "/login?message="+error.message;
      return redirect(path);
    }
    const user = await getUser(data.user.id);
    dispatch(setAuthState(user));

    return redirect("/dashboard");
  };
  


  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 bg-white text-black py-8 rounded-xl">
      <Image src="/images/logo-rit.png" alt="Logo Rit" width={64} height={64} className="self-center pb-5"></Image>
      <h1 className="self-center font-bold text-xl">Log in</h1>
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-background">
        <label className="text-md" htmlFor="email">
          E-mail
        </label>
        <input className="px-4 py-3 bg-inherit border border-slate-200 rounded-full focus:outline-orange-500 focus:border-0 focus:outline-none" name="email" placeholder="naam@voorbeeld.com" required />
        <label className="text-md" htmlFor="password">
          Wachtwoord
        </label>
        <input className="rounded-full px-4 py-3 bg-inherit border border-slate-200 mb-6 focus:outline-orange-500 focus:border-0 focus:outline-none" type="password" name="password" placeholder="••••••••" required />
        <SubmitButton formAction={signIn} className="px-4 py-2 text-foreground mb-2 rounded-full bg-orange-500" pendingText="Signing In...">
          Log in
        </SubmitButton>
        <p className="px-4 py-2 text-background mb-2 self-center">
        Heb je nog geen account?{" "}
        <Link href="/signup" className="border px-4 py-2 text-background mb-2 text-orange-500 hover:underline">
          Registreer je nu
        </Link>
        </p>
        {searchParams?.message && <p className="mt-4 p-4 bg-background/10 text-foreground text-center">{searchParams.message}</p>}
      </form>
    </div>
  );
}
