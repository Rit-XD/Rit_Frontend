import { config } from '@/config'
import {Database} from '@/types/database.type'
import {createBrowserClient} from '@supabase/ssr'

export function createSupabaseForBrowser() {
  const url = config.supabaseUrl;
  const serviceRole = config.supabaseServiceRole;
  return createBrowserClient<Database>(
    url!,
    serviceRole!
  )
}