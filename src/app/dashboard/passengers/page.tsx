'use server'

import {PassengerTable} from '@/components/passengertable/PassengerTable'
import {Loader} from '@/ui/loader/Loader'
import {Suspense} from 'react'
import {PassengersHeader} from './PassengersHeader'
import css from './Passengers.module.scss'
import { fromModule } from '@/utils/styler/Styler'

const styles = fromModule(css)

export default async function Passengers() {
  return (
    <main className={styles.passengers()}>
      <Suspense fallback={<Loader />}>
        <PassengersHeader />
      </Suspense>
      {/* <Suspense fallback={<Loader />}> */}
        <PassengerTable />
      {/* </Suspense> */}
      <div className={styles.passengers.filler()}/>
    </main>
  )
}
