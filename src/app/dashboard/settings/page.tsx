import {SettingsNav} from '@/components/settings/SettingsNav'
import {fetchUser} from '@/lib/user/fetchUser'
import {redirect} from 'next/navigation'

export default async function Settings() {
  const user = await fetchUser()
  if (!user) redirect(`/login`)

  return (
    <main>
      <SettingsNav />
    </main>
  )
}
