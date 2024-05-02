"use server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import Image from "next/image";
import { createSupabaseForServer } from "@/src/utils/supabase/createSupabaseForServer";
import { supabaseAdmin } from "@/src/utils/supabase/supabaseAdmin";
import { generatePasswordFromIcons } from "@/src/utils/supabase/constructPassword";
import { useFormState } from "react-dom";
import { LoginSteps } from "./LoginSteps";

//TODO: remove state

export type LoginState =
  | { step: "username"; error?: string }
  | { step: "password"; email: string; error?: string };

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
