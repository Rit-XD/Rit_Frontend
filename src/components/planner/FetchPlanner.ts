'use server'

import { User } from '@/lib/user/User'
import {supabaseAdmin} from '@/utils/supabase/supabaseAdmin'


export const fetchPassengers = async (user: User) => {
  if (!user) return []
  let query = supabaseAdmin
    .from('Passengers')
    .select('*')
    .eq('carecenter_id', user.id)
  const {data: passengers} = await query
  return passengers || []
}
