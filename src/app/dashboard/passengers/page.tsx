'use server'

import {PassengerTable} from '@/components/passengertable/PassengerTable'
import {Loader} from '@/ui/Loader'
import {Suspense} from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import {PassengersHeader} from './PassengersHeader'

export default async function Passengers() {
  return (
    <main>
      <Suspense fallback={<Loader />}>
        <PassengersHeader />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <PassengerTable />
      </Suspense>
    </main>
  )
}
