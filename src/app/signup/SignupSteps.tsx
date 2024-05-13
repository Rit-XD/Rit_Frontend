'use client'

import {SubmitButton} from './submit-button'

import {fromModule} from '@/utils/styler/Styler'
import {useState} from 'react'
import css from './SignUpSteps.module.scss'

const styles = fromModule(css)

export const SignupSteps: React.FC = () => {
  const [showAddress, setShowAddress] = useState(false)
  return (
    <>
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
              name="address"
              placeholder="Straatnaam"
              required
            />
            <input
              className={styles.form.input()}
              name="address"
              placeholder="Nr."
              required
            />
          </div>
          <input
            className={styles.form.input()}
            name="address"
            placeholder="Postcode"
            required
          />
          <SubmitButton
            formAction={(formData: FormData) => {}}
            className={styles.form.submit()}
            pendingText="Signing Up..."
          >
            Registreren
          </SubmitButton>
        </>
      )}
    </>
  )
}
