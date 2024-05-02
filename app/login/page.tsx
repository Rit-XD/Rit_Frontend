"use server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import Image from "next/image";
import { createSupabaseForServer } from "@/utils/supabase/createSupabaseForServer";
import { supabaseAdmin } from "@/utils/supabase/supabaseAdmin";
import { generatePasswordFromIcons } from "@/utils/supabase/constructPassword";
import { useFormState } from "react-dom";
import { LoginSteps } from "./LoginSteps";

//TODO: remove state

export type LoginState =
  | { step: "username"; error?: string }
  | { step: "password"; email: string; error?: string };

export async function handleLogin(
  state: LoginState,
  formData: FormData
): Promise<LoginState> {
  const supabase = await createSupabaseForServer();

  switch (state.step) {
    case "username":
      const username = String(formData.get("username")).toLowerCase();
      const isEmail = username.includes("@") && username.includes(".");
      if (isEmail) {
        return { step: "password", email: username };
      }

      const { error: queryError, data: record } = await supabaseAdmin
        .from("Carecenter")
        .select()
        .eq("username", username)
        .maybeSingle();

      if (queryError) return { step: "username", error: queryError.message };
      if (!record || !record?.email)
        return {
          step: "username",
          error:
            "Er is geen gebruiker gekoppeld aan de gebruikersnaam of het e-mailadres.",
        };
      return { step: "password", email: record.email };

    case "password":
      if (formData.get("back")) return { step: "username" };

      const password = String(formData.get("password"));
      const email = state.email.toLowerCase();

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: generatePasswordFromIcons(password),
      });
      if (signInError) {
        if (signInError.message === "Invalid login credentials") {
          console.error(signInError);
          return { step: "password", email, error: "Ongeldig wachtwoord" };
        } else {
          return { step: "password", email, error: signInError.message };
        }
      } else {
        // Clear failed attempts
        //TODO: add failed attempts
        //   await supabaseAdmin
        //     .from("password_failed_verification_attempts")
        //     .delete()
        //     .eq("email", email);
      }
      redirect("/dashboard");
  }
  return state;
}

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  // const signIn = async (formData: FormData) => {
  //   "use server";

  //   const email = formData.get("email") as string;
  //   const password = formData.get("password") as string;
  //   const supabase = createClient();

  //   const { data, error } = await supabase.auth.signInWithPassword({
  //     email,
  //     password,
  //   });

  //   if (error) {
  //     const path = "/login?message="+error.message;
  //     return redirect(path);
  //   }
  //   // const user = await getUser(data.user.id);

  //   return redirect("/dashboard");
  // };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 bg-white text-black py-8 rounded-xl">
      <Image
        src="/images/logo-rit.png"
        alt="Logo Rit"
        width={64}
        height={64}
        className="self-center pb-5"
      ></Image>
      <h1 className="self-center font-bold text-xl">Log in</h1>
      <LoginSteps />
    </div>
  );
}
