import css from '@/app/dashboard/Dashboard.module.scss'
import { MapProps } from '@/components/map/Map'
import {Planner} from '@/components/planner/Planner'
import {Upcoming} from '@/components/upcoming/Upcoming'
import {fetchUser} from '@/lib/user/fetchUser'
import {Loader} from '@/ui/loader/Loader'
import {fromModule} from '@/utils/styler/Styler'
import {redirect} from 'next/navigation'

const styles = fromModule(css)

export default async function Dashboard() {
  const user = await fetchUser()
  if (!user) redirect(`/login`)

  return (
    <main className={styles.page.main()}>
        <Planner initial={[]} />
        <Upcoming />
    </main>
  )
}
