'use server'

import {User} from '@/providers/user/User'
import {fetchUser} from '@/providers/user/fetchUser'
import {supabaseAdmin} from '@/utils/supabase/supabaseAdmin'

export const getUser = async () => {
  const user = await fetchUser()
  return user
}

export const fetchCars = async (user: User) => {
  let query = supabaseAdmin
    .from('Car')
    .select('*')
    .eq('carecenter_id', user?.id)
  const {data: cars} = await query
  return cars || []
}
