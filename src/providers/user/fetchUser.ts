'use server'

import {createSupabaseForServerComponent} from '@/utils/supabase/createSupabaseForServerComponent'
import {supabaseAdmin} from '@/utils/supabase/supabaseAdmin'
import {User} from './User'

const selectQuery = '*'

export async function fetchUser(): Promise<User | null> {
  const supabase = await createSupabaseForServerComponent()
  const {
    data: {user}
  } = await supabase.auth.getUser()

  if (!user) return null

  const {data} = await supabaseAdmin
    .from('Carecenter')
    .select(selectQuery)
    .eq('id', user.id)
    .maybeSingle()
    .throwOnError()

  const carecenter = data as unknown as User | undefined
  if (!carecenter) return null

  return {
    city: carecenter.city,
    country: carecenter.country!,
    email: carecenter.email!,
    id: carecenter.id,
    logo: carecenter.logo!,
    name: carecenter.name!,
    number: carecenter.number!,
    phone: carecenter.phone!,
    postal: carecenter.postal!,
    street: carecenter.street!
  }
}
