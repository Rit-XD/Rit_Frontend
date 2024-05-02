import { Database } from '@/src/types/database.type'
import {createServerClient} from '@supabase/ssr'
import {cookies} from 'next/headers'

export const createSupabaseForServerComponent = async () => {
  // Note that set and remove will not work in a server component, only in a route of server action
  const cookieStore = cookies()
  const supabase = await createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value
      }
    }
  )
  return supabase
}
