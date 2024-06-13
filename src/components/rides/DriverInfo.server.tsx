'use server'

import {fetchUser} from '@/providers/user/fetchUser'
import {Driver} from '@/types/driver.type'
import {supabaseAdmin} from '@/utils/supabase/supabaseAdmin'

export const getUser = async () => {
  const user = await fetchUser()
  return user
}

export const fetchDriver = async (
  rideDriverId: string
): Promise<Driver | null> => {
  let query = supabaseAdmin
    .from('Driver')
    .select('*')
    .eq('id', rideDriverId)
    .single()
  const {data} = await query
  return data
}
