import css from '@/app/dashboard/Dashboard.module.scss'
import {Planner} from '@/components/planner/Planner'
import {Upcoming} from '@/components/upcoming/Upcoming'
import {fetchUser} from '@/providers/user/fetchUser'
import {fromModule} from '@/utils/styler/Styler'
import {redirect} from 'next/navigation'

const styles = fromModule(css)

export default async function Dashboard() {

  return (
    <main className={styles.page.main()}>
      <Planner initial={[]} />
      <Upcoming />
    </main>
  )
}
