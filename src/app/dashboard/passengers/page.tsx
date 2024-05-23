'use server'

import {PassengerTable} from '@/components/passengertable/PassengerTable'
import {fromModule} from '@/utils/styler/Styler'
import css from './Passengers.module.scss'
import {PassengersHeader} from './PassengersHeader'

const styles = fromModule(css)

export default async function Passengers() {
  return (
    <main className={styles.passengers()}>
      <PassengersHeader />
      <PassengerTable initial={[]} />
      <div className={styles.passengers.filler()} />
    </main>
  )
}
