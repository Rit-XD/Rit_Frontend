'use server'

import { useUser } from '@/providers/user/useUser'
import { supabaseAdmin } from '@/utils/supabase/supabaseAdmin'

export const getPassengers = async () => {
  const {user} = useUser()

  const {data: passengers, error} = await supabaseAdmin
    .from('Passengers')
    .select('*')
    .eq('carecenter_id', user!.id)
  return passengers || []
}

export async function handleDeletePassenger(
  state: {error: string},
  passenger_id: string
): Promise<{error: string}> {

  let query = supabaseAdmin.from('Passengers').delete().eq('id', passenger_id)
  const {error} = await query
  return {error: String(error) || ''}
}
