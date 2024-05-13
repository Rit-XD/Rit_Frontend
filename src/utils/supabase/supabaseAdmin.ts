import {Database} from '@/types/database.type'
import {createServerClient} from '@supabase/ssr'

export const supabaseAdmin = createServerClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!,
  {cookies: {get: (name: string) => undefined}}
)
