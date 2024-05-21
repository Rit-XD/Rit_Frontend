'use server'

import { User } from '@/lib/user/User'
import {fetchUser} from '@/lib/user/fetchUser'
import { Passenger } from '@/types/passenger.type'
import { Ride } from '@/types/ride.type'
import {supabaseAdmin} from '@/utils/supabase/supabaseAdmin'

export const getUser = async () => {
  const user = await fetchUser()
  return user
}

export const fetchRides = async (user: User) => {
  let query = supabaseAdmin
    .from('Rides')
    .select('*')
    .eq('carecenter_id', user?.id)
  const {data: rides} = await query
  return rides || []
}

export const fetchPassengerById = async (id: string) => {
    const {data: passenger} = await supabaseAdmin
        .from('Passengers')
        .select('*')
        .eq('id', id)
//TODO: add carecenterid filter
    return passenger?.[0] as Passenger;
}