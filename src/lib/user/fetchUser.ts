"use server";

import { createSupabaseForServerComponent } from "@/src/utils/supabase/createSupabaseForServerComponent";
import { User, careCenterRow } from "./User";
import { supabaseAdmin } from "@/src/utils/supabase/supabaseAdmin";

const selectQuery = "*";

export async function fetchUser(): Promise<User | null> {
  const supabase = await createSupabaseForServerComponent();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabaseAdmin
    .from("Carecenter")
    .select(selectQuery)
    .eq("id", user.id)
    .maybeSingle()
    .throwOnError();

  const carecenter = data as unknown as careCenterRow | undefined;
  if (!carecenter) return null;

  return {
    _id: user.id,
    email: user.email!,
    carecenter,
  };
}
