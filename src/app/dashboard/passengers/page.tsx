import {PassengerTable} from '@/components/passengertable/PassengerTable'
import {fetchUser} from '@/lib/user/fetchUser'
import Button from '@/ui/button/Button'
import {redirect} from 'next/navigation'

export default async function Passengers() {
  const user = await fetchUser()
  if (!user) redirect(`/login`)

  return (
    <main>
      <div>
        <div>
          <p>Passagiers</p>
          <p>Archief</p>
        </div>
        <div>
          <input type="text" placeholder="Zoek naam" />
          <Button iconbefore="plus">Nieuwe Passagier</Button>
        </div>
      </div>
      <PassengerTable />
    </main>
  )
}
