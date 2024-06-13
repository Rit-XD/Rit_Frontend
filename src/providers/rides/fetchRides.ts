"use server"
import { supabaseAdmin } from "@/utils/supabase/supabaseAdmin"
import { User } from "../user/User"
import { Ride } from "@/types/ride.type"

export const fetchRides = async (user: User): Promise<Ride[] | null> => {
    let query = supabaseAdmin
      .from('Rides')
      .select('*')
      .eq('carecenter_id', user?.id)
      .order('timestamp', {ascending: true})
    const {data: rides} = await query
    return rides || []
}