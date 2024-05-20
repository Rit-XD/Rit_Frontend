'use server'

import {supabaseAdmin} from '@/utils/supabase/supabaseAdmin'

export const handlePasswordUpdate = async (newPassword: string) => {
  try {
    const {data, error} = await supabaseAdmin.auth.updateUser({
      password: newPassword
    })

    if (error) {
      throw error as Error
    }

    if (data) {
      alert('Password updated successfully')
    }
  } catch (error) {
    alert(`Error updating password: ${(error as Error).message}`)
  }
  handlePasswordUpdate(newPassword)
}
