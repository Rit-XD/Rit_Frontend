'use client'

import background from '@/../public/images/background-login.png'
import {Link} from '@/ui/Link'
import {fromModule} from '@/utils/styler/Styler'
import Image from 'next/image'
import {useFormState} from 'react-dom'
import {SubmitButton} from '../login/submit-button'
import css from './ForgotPassword.module.scss'
import {handleForgot} from './HandleForgot'

const styles = fromModule(css)

export const ForgotPasswordSteps: React.FC = () => {
  const [state, action] = useFormState(handleForgot, {error: '', success: ''})

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
          {state.error && <p className={styles.form.error()}>{state.error}</p>}
          {state.success && (
            <p className={styles.form.success()}>{state.success}</p>
          )}
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
