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

export async function handleEditPassenger(
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
  const passenger_id = String(formData.get('passenger_id'))
  const {user} = useUser()
  if (!user) return {error: ''}

  let query = supabaseAdmin
    .from('Passengers')
    .update({
      firstname,
      lastname,
      dateofbirth,
      emergency_contact,
      emergency_relation,
      wheelchair,
      extra
    })
    .eq('id', passenger_id)
    .select()
  const res = await query
  return {error: '', ...res.data}
}
