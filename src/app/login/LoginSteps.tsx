'use client'

import {useUser} from '@/providers/user/useUser'
import {fromModule} from '@/utils/styler/Styler'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import React, {useEffect} from 'react'
import {useFormState} from 'react-dom'
import {handleLogin} from './HandleLogin'
import css from './LoginSteps.module.scss'
import {SubmitButton} from './submit-button'

const styles = fromModule(css)

export const LoginSteps: React.FC = () => {
  const {user} = useUser()
  const [state, action] = useFormState(handleLogin, {error: ''})
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user])

  return (
    <form className={styles.form()} action={action}>
      <label htmlFor="email">E-mail</label>
      <input
        className={styles.form.input()}
        name="email"
        type="email"
        placeholder="E-mail"
        required
      />

      <label htmlFor="password">Wachtwoord</label>

      <input
        className={styles.form.input()}
        type="password"
        name="password"
        placeholder="Wachtwoord"
        required
      />
      <div className={styles.form.forgotcontainer()}>
        <Link className={styles.form.forgotcontainer.forgot()} href="/recover">
          Wachtwoord vergeten?
        </Link>
      </div>
      {state.error && <p className={styles.form.error()}>{state.error}</p>}
      <SubmitButton
        type="submit"
        className={styles.form.submit()}
        pendingText="Signing In..."
      >
        Log in
      </SubmitButton>
      <p className={styles.form.text()}>
        Heb je nog geen account?{' '}
        <Link href="/signup" className={styles.form.link()}>
          Registreer je nu
        </Link>
      </p>
    </form>
  )
}
