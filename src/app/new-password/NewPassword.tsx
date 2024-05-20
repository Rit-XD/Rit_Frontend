'use client'

import background from '@/../public/images/background-login.png'
import {Link} from '@/ui/Link'
import {fromModule} from '@/utils/styler/Styler'
import {createSupabaseForBrowser} from '@/utils/supabase/createSupabaseForBrowser'
import Image from 'next/image'
import {useEffect, useState} from 'react'
import {SubmitButton} from '../login/submit-button'
import {handlePasswordUpdate} from './HandleNew'
import css from './NewPassword.module.scss'

const styles = fromModule(css)

export const NewPasswordSteps: React.FC = () => {
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')
  const [password, setPassword] = useState('')
  const supabase = createSupabaseForBrowser()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      setAccessToken(hashParams.get('access_token') || '')
      setRefreshToken(hashParams.get('refresh_token') || '')
    }
  }, [])

  useEffect(() => {
    // Authenticate the user using the access token and refresh token
    const getSessionWithTokens = async () => {
      if (accessToken && refreshToken) {
        const {data, error} = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        })

        if (error) {
          alert(`Error signing in: ${error.message}`)
        }
      }
    }

    // Call this function only when accessToken and refreshToken are available.
    if (accessToken && refreshToken) {
      getSessionWithTokens()
    }
  }, [accessToken, refreshToken])

  return (
    <>
      <Image
        src={background}
        fill
        sizes="100vw"
        style={{objectFit: 'cover'}}
        alt="background login"
      />
      <span className={styles.form.overlay1()} />
      <span className={styles.form.overlay2()} />
      <div className={styles.formcontainer()}>
        <Image
          src="/images/logo-rit.png"
          alt="Logo Rit"
          width={64}
          height={64}
          className={styles.formcontainer.logo()}
        />
        <h1 className={styles.formcontainer.title()}>
          Stel nieuw wachtwoord in
        </h1>
        <form
          className={styles.form()}
          action={() => handlePasswordUpdate(password)}
        >
          <label htmlFor="password">Nieuw Wachtwoord</label>

          <input
            className={styles.form.input()}
            type="password"
            name="password"
            placeholder="Wachtwoord"
            required
          />
          <label htmlFor="password">Bevestig Wachtwoord</label>

          <input
            className={styles.form.input()}
            type="password"
            name="password"
            placeholder="Wachtwoord"
            required
          />

          <SubmitButton
            type="submit"
            className={styles.form.submit()}
            pendingText="Verzenden..."
          >
            Wijzig Wachtwoord
          </SubmitButton>
        </form>
        <p className={styles.form.text()}>
          Terug naar{' '}
          <Link href="/login" className={styles.form.link()}>
            inloggen
          </Link>
        </p>
      </div>
    </>
  )
}
