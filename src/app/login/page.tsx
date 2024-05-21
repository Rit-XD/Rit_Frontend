'use server'
import background from '@/../public/images/background-login.png'
import {fetchUser} from '@/lib/user/fetchUser'
import {fromModule} from '@/utils/styler/Styler'
import Image from 'next/image'
import {redirect} from 'next/navigation'
import {LoginSteps} from './LoginSteps'
import css from './LoginSteps.module.scss'

const styles = fromModule(css)

export default async function Login({
  searchParams
}: {
  searchParams: {message: string}
}) {
  const user = await fetchUser()
  if (user) {
    return redirect('/dashboard')
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
      <span className={styles.form.overlay1()} />
      <span className={styles.form.overlay2()} />
      <div className={styles.formcontainer()}>
        <Image
          src="/images/logo-rit.png"
          alt="Logo Rit"
          width={64}
          height={64}
          className={styles.formcontainer.logo()}
        ></Image>
        <h1 className={styles.formcontainer.title()}>Log in</h1>
        <LoginSteps />
      </div>
    </>
  )
}
