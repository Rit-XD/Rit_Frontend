import background from '@/public/images/background-login.png'
import {fromModule} from '@/utils/styler/Styler'
import {createClient} from '@/utils/supabase/server'
import {headers} from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import {redirect} from 'next/navigation'
import handleSignup from './HandleSignup'
import css from './SignUpSteps.module.scss'
import {SubmitButton} from './submit-button'

const styles = fromModule(css);
let showAddress = true;


export default function SignUp({
  searchParams
}: {
  searchParams: {message: string}
}) {
  const toggleAddress = () => {
    showAddress = !showAddress;
    return "";
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient()

    const {data, error} = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`
      }
    })

    if (error) {
      const path = '/signup?message=' + error.message
      return redirect(path)
    }

    await handleSignup(
      data?.user?.id as string,
      formData.get('name') as string,
      formData.get('phone') as string,
      formData.get('street') as string,
      formData.get('number') as string,
      parseInt(formData.get('postal') as string),
      formData.get('city') as string,
      formData.get('country') as string,
      email,
      formData.get('logo') as string
    )

    return redirect('/login?message=Log in to continue')
  }

  return (
    <>
      <Image
        src={background}
        fill
        sizes="100vw"
        style={{objectFit: 'cover'}}
        alt="background login"
      />
      <span className={styles.overlay1()} />
      <span className={styles.overlay2()} />
      <div className={styles.container()}>
        <Image
          src="/images/logo-rit.png"
          alt="Logo Rit"
          width={64}
          height={64}
          className="self-center pb-5"
        ></Image>
        <h1 className="self-center font-bold text-xl">Registreren</h1>
        <form className={styles.form()}>
        {showAddress && (<>
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
            formAction={toggleAddress()}
            className={styles.form.submit()}
            pendingText="Volgende"
          >
            Volgende
          </SubmitButton>
        </>)}
        {showAddress && (<>
            <p>{showAddress}</p>
            <p>tezst</p>

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
            formAction={signUp}
            className={styles.form.submit()}
            pendingText="Signing Up..."
          >
            Registreren
          </SubmitButton>
        </>)}


          <p className={styles.form.text()}>
            Heb je al een account?{' '}
            <Link href="/login" className={styles.form.link()}>
              Log in
            </Link>
          </p>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </>
  )
}
