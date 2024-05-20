'use server'

import {PassengerTable} from '@/components/passengertable/PassengerTable'
import {fetchUser} from '@/lib/user/fetchUser'
import {fromModule} from '@/utils/styler/Styler'
import {supabaseAdmin} from '@/utils/supabase/supabaseAdmin'
import {redirect} from 'next/navigation'
import css from './Passengers.module.scss'
import {PassengersHeader} from './PassengersHeader'

export default async function Passengers() {
  const styles = fromModule(css)

  const user = await fetchUser()
  if (!user) redirect(`/login`)

  const {data: passengers, error} = await supabaseAdmin
    .from('Passengers')
    .select('*')
    .eq('carecenter_id', user?._id)

  return (
    <main>
      <PassengersHeader passengers={passengers} />
      <PassengerTable />
    </main>
  )
}
