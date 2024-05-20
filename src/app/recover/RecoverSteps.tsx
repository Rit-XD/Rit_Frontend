'use client'

import background from '@/../public/images/background-login.png'
import {Link} from '@/ui/Link'
import {TokenInput} from '@/ui/TokenInput'
import {fromModule} from '@/utils/styler/Styler'
import Image from 'next/image'
import {useFormState} from 'react-dom'
import {SubmitButton} from '../login/submit-button'
import {handleRecover} from './HandleRecover'
import css from './RecoverSteps.module.scss'

const styles = fromModule(css)

export const RecoverSteps: React.FC = () => {
  const [state, action] = useFormState(handleRecover, {step: 'email'})
  const resendToken = async () => {
    action(new FormData())
  }

  let step = 1
  if (state.step === 'token') step = 2
  if (state.step === 'password') step = 3

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
        <h1 className={styles.formcontainer.title()}>Wachtwoord vergeten?</h1>
        <form className={styles.form()} action={action}>
          {state.step === 'email' && (
            <>
              <label htmlFor="email">E-mail</label>
              <input
                className={styles.form.input()}
                name="email"
                type="email"
                placeholder="E-mail"
                required
              />
              <SubmitButton
                type="submit"
                className={styles.form.submit()}
                pendingText="Verzenden..."
              >
                Verzenden
              </SubmitButton>
            </>
          )}
          {state.step === 'token' && (
            <>
              <p className={styles.form.text()}>
                We hebben een e-mail gestuurd met een code. Voer deze hieronder
                in.
              </p>
              <label>Code</label>
              <TokenInput name="otp" resendToken={resendToken} />
              <SubmitButton
                type="submit"
                className={styles.form.submit()}
                pendingText="Verifiëren..."
              >
                Verifiëren
              </SubmitButton>
            </>
          )}
          {state.step === 'password' && (
            <>
              <label htmlFor="password">Wachtwoord</label>
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
                pendingText="Wachtwoord wijzigen..."
              >
                Wachtwoord wijzigen
              </SubmitButton>
            </>
          )}

          {state.error && <p className={styles.form.error()}>{state.error}</p>}
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
