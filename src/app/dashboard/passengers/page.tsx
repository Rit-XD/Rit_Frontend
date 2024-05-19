import {PassengerTable} from '@/components/passengertable/PassengerTable'
import {fetchUser} from '@/lib/user/fetchUser'
import {redirect} from 'next/navigation'

export default async function Passengers() {
  const user = await fetchUser()
  if (!user) redirect(`/login`)

  return (
    <main>
      <PassengerTable />
    </main>
  )
}
