import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { signUpUser } from "@/lib/signup";

export default function SignUp({
  searchParams,
}: {
  searchParams: { message: string };
}) 
{
  const logIn = () => {
    return redirect("/login");
  }
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }


    return redirect("/protected");
  };

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
      return redirect("/login?message=Could not authenticate user");
    }
    console.log(data?.user?.id);
  
    await signUpUser(email, data?.user?.id as string);


    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <label className="text-md" htmlFor="email">Email</label>
        <input className="rounded-md px-4 py-2 bg-inherit border mb-6" name="email" placeholder="you@example.com" required/>
        
        <label className="text-md" htmlFor="password">Password</label>
        <input className="rounded-md px-4 py-2 bg-inherit border mb-6" type="password" name="password" placeholder="••••••••" required/>
        
        <label className="text-md" htmlFor="email">Email</label>
        <input className="rounded-md px-4 py-2 bg-inherit border mb-6" name="email" placeholder="you@example.com" required/>
        
        <SubmitButton formAction={signUp} className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2" pendingText="Signing Up...">Sign Up </SubmitButton>
        <p>Already have an account?{" "}<Link href="/login" className="">Log in</Link></p>
        {searchParams?.message && ( 
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">{searchParams.message}</p>
        )}
      </form>
    </div>
  );
}
