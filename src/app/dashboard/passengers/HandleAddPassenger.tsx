'use server'

import {fetchUser} from '@/providers/user/fetchUser'
import { useUser } from '@/providers/user/useUser'
import {supabaseAdmin} from '@/utils/supabase/supabaseAdmin'

export const getPassengers = async () => {
  const {user} = useUser()
  const {data: passengers, error} = await supabaseAdmin
    .from('Passengers')
    .select('*')
    .eq('carecenter_id', user!.id)
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
  const {user} = useUser()
  if (!user) return {error: ''}

  let query = supabaseAdmin
    .from('Passengers')
    .insert([
      {
        carecenter_id: user?.id,
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
  return {error: '', ...res.data}
}
