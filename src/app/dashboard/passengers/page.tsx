'use server'

import {fetchUser} from '@/providers/user/fetchUser'
import {fromModule} from '@/utils/styler/Styler'
import {redirect} from 'next/navigation'
import css from './Passengers.module.scss'
import {PassengersContext} from './PassengersContext'

const styles = fromModule(css)

export default async function Passengers() {

  return (
    <main className={styles.passengers()}>
      <PassengersContext />
      <div className={styles.passengers.filler()} />
    </main>
  )
}
