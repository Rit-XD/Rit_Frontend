'use server'

import {fetchUser} from '@/lib/user/fetchUser'
import {supabaseAdmin} from '@/utils/supabase/supabaseAdmin'
import { publicDecrypt } from 'crypto'

export const getUser = async () => {
  const user = await fetchUser()
  return user
}

export const postRide = async (
  destination: string,
  car: string,
  timestamp: string,
  passenger_1: string,
  passenger_2?: string | null
) => {
  const user = await getUser()
  if (!user) return []
  console.log("post");
  let query = supabaseAdmin
    .from('Rides')
    .insert([
      {
        carecenter: user?.carecenter.id,
        origin: user?.carecenter.street + ' ' + user?.carecenter.number + ', ' + user?.carecenter.postal + ' ' + user?.carecenter.city,
        destination: destination,
        driver: null,
        passenger_1: passenger_1,
        passenger_2: passenger_2 || null,
        car: car,
        timestamp: timestamp
      }
    ])
    .select();
  const res = await query;
  console.log("ride", res);
  return res || []
}