import { Database } from "@/types/database.type";

export type User = {
    _id: string,
    // cars: any,
    // name: string,
    // supaBaseId: string,
    // address: string,
    // phone: string,
    email: string,
    // logo: string,
    carecenter: careCenterRow
}

export type careCenterRow = Database['public']['Tables']['Carecenter']['Row'];