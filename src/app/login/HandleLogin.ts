"use server";

import { generatePasswordFromIcons } from "@/src/utils/supabase/constructPassword";
import { createSupabaseForServer } from "@/src/utils/supabase/createSupabaseForServer";
import { supabaseAdmin } from "@/src/utils/supabase/supabaseAdmin";
import { redirect } from "next/navigation";
import { LoginState } from "./page";

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
