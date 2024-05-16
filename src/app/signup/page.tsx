import background from '@/../public/images/background-login.png'
import {fromModule} from '@/utils/styler/Styler'
import {createClient} from '@/utils/supabase/server'
import {headers} from 'next/headers'
import Image from 'next/image'
import {redirect} from 'next/navigation'
import handleSignup from './HandleSignup'
import css from './SignUpSteps.module.scss'
import {SignupSteps} from './SignupSteps'

const styles = fromModule(css)

export default function SignUp({}: // searchParams
{
  // searchParams?: {message: string}
}) {
  // const toggleAddress = () => {
  //   showAddress = !showAddress
  //   return ''
  // }
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
      parseInt(formData.get('postal') as string), // Convert to number using parseInt
      formData.get('city') as string,
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
        <SignupSteps signUp={signUp} />
      </div>
    </>
  )
}
