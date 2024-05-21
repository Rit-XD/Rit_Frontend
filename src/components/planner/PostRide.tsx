'use server'

import {supabaseAdmin} from '@/utils/supabase/supabaseAdmin'



export const postRide = async (
  carecenter_id: string,
  origin: string,
  destination: string,
  car: string,
  timestamp: string,
  passenger_1: string,
  passenger_2: string | null = null
) => {
  let query = supabaseAdmin
    .from('Rides')
    .insert([
      {
        carecenter_id: carecenter_id,
        origin: origin,
        destination: destination,
        driver: null,
        passenger_1: passenger_1,
        passenger_2: passenger_2,
        car: car,
        timestamp: timestamp
      }
    ])
    .select();
  const res = await query;
  console.log(res);
  return res || []
}