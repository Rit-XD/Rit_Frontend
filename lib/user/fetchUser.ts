'use server'

import { createSupabaseForServerComponent } from "@/utils/supabase/createSupabaseForServerComponent";
import { User, careCenterRow } from "./User";

const selectQuery =
  '*';

  export async function fetchUser(): Promise<User | null> {
    const supabase = await createSupabaseForServerComponent();
    const {
      data: {session}
    } = await supabase.auth.getSession();
    if (!session) return null;
    const user = session.user;

    const {data} = await supabase
    .from('Carecenter')
    .select(selectQuery)
    .eq("id", user.id)
    .maybeSingle()
    .throwOnError();

    const carecenter = data as unknown as careCenterRow | undefined;
    if (!carecenter) return null;

    return {
        _id: user.id,
        email: user.email!,
        carecenter
      }
}


