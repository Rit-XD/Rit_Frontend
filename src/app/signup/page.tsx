import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/src/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import Image from "next/image";
import { signUpUser } from "@/src/lib/signup";

export default function SignUp({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      const path = "/signup?message=" + error.message;
      return redirect(path);
    }

    await signUpUser(
      email,
      data?.user?.id as string,
      formData.get("phone") as string,
      formData.get("address") as string
    );

    return redirect("/login?message=Log in to continue");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 bg-white text-black py-8 rounded-xl">
      <Image
        src="/images/logo-rit.png"
        alt="Logo Rit"
        width={64}
        height={64}
        className="self-center pb-5"
      ></Image>
      <h1 className="self-center font-bold text-xl">Registreren</h1>
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-background">
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="px-4 py-3 bg-inherit border border-slate-200 rounded-full focus:outline-orange-500 focus:border-0 focus:outline-none"
          name="email"
          placeholder="you@example.com"
          required
        />

        <label className="text-md" htmlFor="password">
          Wachtwoord
        </label>
        <input
          className="px-4 py-3 bg-inherit border border-slate-200 rounded-full focus:outline-orange-500 focus:border-0 focus:outline-none"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />

        <label className="text-md" htmlFor="phone">
          Telefoon
        </label>
        <input
          className="px-4 py-3 bg-inherit border border-slate-200 rounded-full focus:outline-orange-500 focus:border-0 focus:outline-none"
          name="phone"
          placeholder="+32..."
          required
        />

        <label className="text-md" htmlFor="address">
          Adres
        </label>
        <input
          className="px-4 py-3 mb-6 bg-inherit border border-slate-200 rounded-full focus:outline-orange-500 focus:border-0 focus:outline-none"
          name="address"
          placeholder="Straatnaam 123"
          required
        />
        <SubmitButton
          formAction={signUp}
          className="px-4 py-2 text-foreground mb-2 rounded-full bg-orange-500"
          pendingText="Signing Up..."
        >
          Registreren
        </SubmitButton>
        <p className="px-4 py-2 text-background mb-2 self-center">
          Heb je al een account?{" "}
          <Link
            href="/login"
            className="border px-4 py-2 text-background mb-2 text-orange-500 hover:underline"
          >
            Log in
          </Link>
        </p>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
