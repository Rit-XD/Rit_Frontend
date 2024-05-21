'use server'

import {PassengerTable} from '@/components/passengertable/PassengerTable'
import {Loader} from '@/ui/loader/Loader'
import {fromModule} from '@/utils/styler/Styler'
import {Suspense} from 'react'
import css from './Passengers.module.scss'
import {PassengersHeader} from './PassengersHeader'

const styles = fromModule(css)

export default async function Passengers() {
  return (
    <main className={styles.passengers()}>
      <Suspense fallback={<Loader />}>
        <PassengersHeader />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <PassengerTable initial={[]} />
      </Suspense>
      <div className={styles.passengers.filler()} />
    </main>
  )
}
