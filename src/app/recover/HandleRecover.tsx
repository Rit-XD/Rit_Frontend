'use server'

import {createSupabaseForServer} from '@/utils/supabase/createSupabaseForServer'
import {redirect} from 'next/navigation'

export type RecoverState =
  | {step: 'email'; error?: string}
  | {step: 'token'; email: string; error?: string}
  | {step: 'password'; email: string; error?: string}

export async function handleRecover(
  state: RecoverState,
  formData: FormData
): Promise<RecoverState> {
  const supabase = await createSupabaseForServer()

  switch (state.step) {
    case 'email':
      const email = String(formData.get('email'))
      const {error, data} = await supabase.auth.resetPasswordForEmail(email)
      if (error) {
        console.error(error)
        return {...state, error: error.message}
      }
      return {step: 'token', email}

    case 'token':
      if (formData.get('back')) {
        return {step: 'email'}
      }
      const token = [1, 2, 3, 4, 5, 6].reduce((acc, cur) => {
        return acc + String(formData.get(`otp${cur}`) || '')
      }, '')

      if (!token) {
        const {data, error} = await supabase.auth.resetPasswordForEmail(
          state.email
        )
        if (error) {
          return {...state, error: error.message}
        }
        return {...state, error: 'Een nieuw token is verzonden'}
      }

      const {error: otpError} = await supabase.auth.verifyOtp({
        type: 'recovery',
        email: state.email,
        token
      })

      if (otpError) {
        return {...state, error: otpError.message}
      }
      return {step: 'password', email: state.email}

    case 'password':
      if (formData.get('back')) {
        return {step: 'email'}
      }
      const password = String(formData.get('password'))
      await supabase.auth.updateUser({
        password: password
      })
      redirect('/dashboard')
  }
}
