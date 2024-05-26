'use server'

import {fetchUser} from '@/lib/user/fetchUser'
import {createSupabaseForServer} from '@/utils/supabase/createSupabaseForServer'
import {supabaseAdmin} from '@/utils/supabase/supabaseAdmin'

export const getUser = async () => {
  const user = await fetchUser()
  return user
}

export async function handleEditUser(
  state: {error: string},
  formData: FormData
): Promise<{error: string}> {
  const name = String(formData.get('name'))
  const street = String(formData.get('street'))
  const city = String(formData.get('city'))
  const postal = Number(formData.get('postal'))
  const number = String(formData.get('number'))
  const phone = String(formData.get('phone'))

  let query = supabaseAdmin
    .from('Carecenter')
    .update({
      name,
      street,
      city,
      postal,
      number,
      phone
    })
    .eq('id', (await getUser())!.id)
    .select()
  const res = await query
  return {error: '', ...res.data}
}

export async function handleEditPassword(
  state: {error: string},
  formData: FormData
): Promise<{error: string}> {
  const oldPassword = String(formData.get('oldPassword'))
  const newPassword = String(formData.get('newPassword'))
  const confirmPassword = String(formData.get('confirmPassword'))
  const supabase = await createSupabaseForServer()

  if (newPassword !== confirmPassword) {
    return {error: 'New password and confirm password do not match.'}
  }

  // Get the current user
  const user = await fetchUser()

  if (!user) {
    return {error: 'No user is currently logged in.'}
  }

  // Re-authenticate the user
  const {error: reAuthError} = await supabase.auth.signInWithPassword({
    email: user.email as string,
    password: oldPassword
  })

  if (reAuthError) {
    return {error: 'Old password is incorrect.'}
  }

  // Update the user's password
  const {error: updateError} = await supabase.auth.updateUser({
    password: newPassword
  })

  if (updateError) {
    return {error: 'Failed to update password.'}
  }

  return {error: ''}
}
