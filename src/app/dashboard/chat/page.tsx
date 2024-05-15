import {fetchUser} from '@/lib/user/fetchUser'
import {redirect} from 'next/navigation'

export default async function Chat() {
  const user = await fetchUser()
  if (!user) redirect(`/login`)

  return (
    <main>
      Ik ben in de chat
      {/* we use serverside page and only import small client side component*/}
    </main>
  )
}
