"use server"
import { supabaseAdmin } from "@/utils/supabase/supabaseAdmin"
import { Driver } from "@/types/driver.type"

export const fetchDriver = async (id: string): Promise<Driver | null> => {
    let query = supabaseAdmin
      .from('Driver')
      .select('*')
      .eq('id', id)
      .single();
    const {data: driver} = await query
    return driver;
}