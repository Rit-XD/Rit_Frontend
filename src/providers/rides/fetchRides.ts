'use server'
import {Ride} from '@/types/ride.type'
import {supabaseAdmin} from '@/utils/supabase/supabaseAdmin'
import {User} from '../user/User'

export const fetchRides = async (user: User): Promise<Ride[] | null> => {
  let query = supabaseAdmin
    .from('Rides')
    .select('*')
    .eq('carecenter_id', user?.id)
    .order('timestamp', {ascending: true})
  const {data: rides} = await query
  return rides || []
}

export const deleteRide = async (rideId: string) => {
  await supabaseAdmin.from('Rides').delete().eq('id', rideId)
}
