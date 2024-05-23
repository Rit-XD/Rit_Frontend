'use server'

import {fetchUser} from '@/lib/user/fetchUser'
import {fromModule} from '@/utils/styler/Styler'
import {redirect} from 'next/navigation'
import css from './Passengers.module.scss'
import {PassengersContext} from './PassengersContext'

const styles = fromModule(css)

export default async function Passengers() {
  const user = await fetchUser()
  if (!user) redirect(`/login`)

  return (
    <main className={styles.passengers()}>
      <PassengersContext />
      <div className={styles.passengers.filler()} />
    </main>
  )
}
