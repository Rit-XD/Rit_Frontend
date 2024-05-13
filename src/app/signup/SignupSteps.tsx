'use client'

import {SubmitButton} from './submit-button'

import {fromModule} from '@/utils/styler/Styler'
import Link from 'next/link'
import {useState} from 'react'
import css from './SignUpSteps.module.scss'

const styles = fromModule(css)

export const SignupSteps: React.FC<{
  signUp: (formData: FormData) => Promise<void>
}> = ({signUp}) => {
  const [showAddress, setShowAddress] = useState(false)
  const [formData, setFormData] = useState({} as FormData)

  return (
    <form className={styles.form()}>
      {!showAddress && (
        <>
          <label className="text-md" htmlFor="name">
            Naam
          </label>
          <input
            className={styles.form.input()}
            name="name"
            placeholder="Naam"
            required
          />
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className={styles.form.input()}
            name="email"
            placeholder="you@example.com"
            required
          />

          <label className="text-md" htmlFor="password">
            Wachtwoord
          </label>
          <input
            className={styles.form.input()}
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />

          <label className="text-md" htmlFor="phone">
            Telefoon
          </label>
          <input
            className={styles.form.input()}
            name="phone"
            placeholder="+32..."
            required
          />
          <SubmitButton
            className={styles.form.submit()}
            pendingText="Volgende"
            formAction={() => setShowAddress(true)}
          >
            Volgende
          </SubmitButton>
          <p className={styles.form.text()}>
            Heb je al een account?{' '}
            <Link href="/login" className={styles.form.link()}>
              Log in
            </Link>
          </p>
        </>
      )}
      {showAddress && (
        <>
          <label className="text-md" htmlFor="address">
            Adres
          </label>
          <div className={styles.form.adres()}>
            <input
              className={styles.form.input()}
              name="street"
              placeholder="Straatnaam"
              required
            />
            <input
              className={styles.form.input()}
              name="number"
              placeholder="Nr."
              required
            />
          </div>
          <div className={styles.form.adres()}>
            <input
              className={styles.form.input()}
              name="city"
              placeholder="Stad"
              required
            />
            <input
              className={styles.form.input()}
              name="postal"
              placeholder="Postcode"
              required
              type="number"
            />
          </div>
          <SubmitButton
            formAction={signUp}
            className={styles.form.submit()}
            pendingText="Signing Up..."
          >
            Registreren
          </SubmitButton>
          <p className={styles.form.text()}>
            Heb je al een account?{' '}
            <Link href="/login" className={styles.form.link()}>
              Log in
            </Link>
          </p>

          {/* {searchParams && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {(searchParams as { message: string }).message}
            </p>
          )} */}
        </>
      )}
    </form>
  )
}
