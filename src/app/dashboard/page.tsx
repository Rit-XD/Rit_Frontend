import {Planner} from '@/components/planner/Planner'
import {fetchUser} from '@/lib/user/fetchUser'
import {redirect} from 'next/navigation'

export default async function Dashboard() {
  const user = await fetchUser()
  if (!user) redirect(`/login`)

  return (
    <main>
      <Planner initial={[]} />
    </main>
  )
}
