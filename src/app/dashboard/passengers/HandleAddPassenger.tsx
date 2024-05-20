'use server'

import {fetchUser} from '@/lib/user/fetchUser'
import {supabaseAdmin} from '@/utils/supabase/supabaseAdmin'

export const getUser = async () => {
  const user = await fetchUser()
  return user
}

export const handleAddPassenger = async (
  firstname: string,
  lastname: string,
  dateofbirth: string,
  emergency_contact: string,
  emergency_relation: string,
  wheelchair: boolean,
  extra: string
) => {
  const user = await getUser()
  if (!user) return []
  let query = supabaseAdmin
    .from('Passengers')
    .insert([
      {
        carecenter_id: user?.carecenter.id,
        firstname: firstname,
        lastname: lastname,
        dateofbirth: dateofbirth,
        emergency_contact: emergency_contact,
        emergency_relation: emergency_relation,
        wheelchair: wheelchair,
        extra: extra
      }
    ])
    .select()
  const res = await query
  return res || []
}
