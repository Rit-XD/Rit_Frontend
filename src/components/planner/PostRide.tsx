'use server'

import { useUser } from '@/lib/user/useUser';
import { Ride } from '@/types/ride.type';
import {supabaseAdmin} from '@/utils/supabase/supabaseAdmin'


export const postRide = async (
  carecenter_id: string,
  origin: string,
  destination: string,
  distance: number,
  duration: number,
  car: string,
  timestamp: string,
  passenger_1: string,
  passenger_2: string | null = null
) => {

  const ride: Ride = {        
    carecenter_id: carecenter_id,
    origin: origin,
    destination: destination,
    duration: duration,
    distance: distance,
    driver: null,
    passenger_1: passenger_1,
    passenger_2: passenger_2,
    car: car,
    timestamp: timestamp
  }
  let query = supabaseAdmin
    .from('Rides')
    .insert([ride])
    .select();
  const res = await query;
  console.log(res);
  return res || []
}