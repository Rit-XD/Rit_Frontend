'use server'

import {PassengerTable} from '@/components/passengertable/PassengerTable'
import {fromModule} from '@/utils/styler/Styler'
import css from './Passengers.module.scss'
import {PassengersHeader} from './PassengersHeader'

export default async function Passengers() {
  const styles = fromModule(css)

  return (
    <main>
      <PassengersHeader />
      <PassengerTable />
    </main>
  )
}
