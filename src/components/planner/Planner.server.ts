import { fetchUser } from "@/lib/user/fetchUser";
import { supabaseAdmin } from "@/utils/supabase/supabaseAdmin";

export const getUser = async () => {
  const user = await fetchUser();
  return user;
}

export const fetchPassengers = async () => {
    const user = await getUser();
    if (!user) return;

    let { data: Passengers, error } = await supabaseAdmin
    .from('Passengers')
    .select("*")
    .eq("carecenter_id", user?._id);

    if (error) {
        console.log(error);
    } 
    return Passengers;
}