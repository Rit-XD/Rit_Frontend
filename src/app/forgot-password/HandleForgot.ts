'use server'

import {createSupabaseForServer} from '@/utils/supabase/createSupabaseForServer'
import {supabaseAdmin} from '@/utils/supabase/supabaseAdmin'

export async function handleForgot(
  state: {error: string; success: string},
  formData: FormData
): Promise<{error: string; success: string}> {
  const supabase = await createSupabaseForServer()
  const email = String(formData.get('email'))

  const {error: queryError, data: record} = await supabaseAdmin
    .from('Carecenter')
    .select()
    .eq('email', email)
    .maybeSingle()

  if (queryError)
    return {
      error: queryError.message,
      success: ''
    }

  if (!record || !record?.email)
    return {
      error: 'Onjuist emailadres',
      success: ''
    }

  const {error, data} = await supabase.auth.resetPasswordForEmail(email)
  if (error) {
    return {error: error.message, success: ''}
  }

  return {error: '', success: 'Email is verzonden'}
}
