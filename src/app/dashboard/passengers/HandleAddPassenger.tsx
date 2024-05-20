'use server'

import {fetchUser} from '@/lib/user/fetchUser'
import {supabaseAdmin} from '@/utils/supabase/supabaseAdmin'

export const getUser = async () => {
  const user = await fetchUser()
  return user
}
export const getPassengers = async () => {
  const user = await getUser()
  const {data: passengers, error} = await supabaseAdmin
    .from('Passengers')
    .select('*')
    .eq('carecenter_id', user!.carecenter.id)
  return passengers || []
}

export async function handleAddPassenger(
  state: {error: string},
  formData: FormData
): Promise<{error: string}> {
  const firstname = String(formData.get('firstname'))
  const lastname = String(formData.get('lastname'))
  const dateofbirth = String(formData.get('dateofbirth'))
  const emergency_contact = String(formData.get('emergency_contact'))
  const emergency_relation = String(formData.get('emergency_relation'))
  const wheelchair = Boolean(formData.get('wheelchair'))
  const extra = String(formData.get('extra'))
  const user = await getUser()
  if (!user) return {error: ''}

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
  console.log(res)
  return {error: '', ...res.data}
}
