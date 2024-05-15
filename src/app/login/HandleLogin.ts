'use server'

import {createSupabaseForServer} from '@/utils/supabase/createSupabaseForServer'
import {supabaseAdmin} from '@/utils/supabase/supabaseAdmin'
import {redirect} from 'next/navigation'

export async function handleLogin(
  state: {error: string},
  formData: FormData
): Promise<{error: string}> {
  const supabase = await createSupabaseForServer()

  const email = String(formData.get('email')).toLowerCase()
  const password = String(formData.get('password'))
  const isValidEmail = email.includes('@') && email.includes('.')
  if (!isValidEmail) return {error: 'Ongeldig e-mailadres'}

  const {error: queryError, data: record} = await supabaseAdmin
    .from('Carecenter')
    .select()
    .eq('email', email)
    .maybeSingle()

  if (queryError)
    return {
      error: queryError.message
    }
  if (!record || !record?.email)
    return {
      error: 'Onjuiste gebruikersnaam of wachtwoord.'
    }

  const {error: signInError} = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (signInError) {
    if (signInError.message === 'Invalid login credentials') {
      return {error: 'Onjuiste gebruikersnaam of wachtwoord.'}
    }
    return {error: signInError.message}
  }
  // Clear failed attempts
  //TODO: add failed attempts
  // await supabaseAdmin
  //   .from("password_failed_verification_attempts")
  //   .delete()
  //   .eq("email", email);

  redirect('/')
}
