import {SettingsTab} from '@/components/settings/SettingsTab'
import {fetchUser} from '@/providers/user/fetchUser'
import {redirect} from 'next/navigation'

export default async function Settings() {

  return (
    <main>
      <SettingsTab />
    </main>
  )
}
