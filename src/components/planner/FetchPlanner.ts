'use server'
import {fetchUser} from '@/lib/user/fetchUser'
import {supabaseAdmin} from '@/utils/supabase/supabaseAdmin'

export const getUser = async () => {
  const user = await fetchUser()
  return user
}

export const fetchPassengers = async () => {
  const user = await getUser()
  if (!user) return [];

  let query = supabaseAdmin
    .from('Passengers')
    .select('*')
    .eq('carecenter_id', user?._id);
    const {data: passengers} = await query;
  return passengers || [];

}
