import {Database} from '@/lib/database.types'
import {CookieOptions, createServerClient} from '@supabase/ssr'
import {cookies} from 'next/headers'

export const createSupabaseForServer = async () => {
  // Note that set and remove will not work in a server component, only in a route of server action
  const cookieStore = cookies()
  const supabase = await createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({name, value, ...options})
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({name, value: '', ...options})
        }
      }
    }
  )
  return supabase
}
