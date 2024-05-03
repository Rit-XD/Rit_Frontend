import {fetchUser} from '@/src/lib/user/fetchUser'
import {redirect} from 'next/navigation'
import AuthButton from '../../components/AuthButton'

export default async function Dashboard() {
  const user = await fetchUser()
  if (!user) redirect(`/login`)

  return (
    <main>
      <AuthButton />
      {/* we use serverside page and only import small client side component*/}
    </main>
  )
}
