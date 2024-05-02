import {Database} from '@/src/types/database.type'
import {createBrowserClient} from '@supabase/ssr'

export function createSupabaseForBrowser() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}