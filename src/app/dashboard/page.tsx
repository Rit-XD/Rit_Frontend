import { Planner } from '@/components/planner/Planner'
import { fetchUser } from '@/lib/user/fetchUser'
import { fromModule, styler } from '@/utils/styler/Styler'
import { redirect } from 'next/navigation'
import css from '@/app/dashboard/Dashboard.module.scss'
import { Upcoming } from '@/components/upcoming/Upcoming'


const styles = fromModule(css)

export default async function Dashboard() {
  const user = await fetchUser()
  if (!user) redirect(`/login`)

  return (
    <main className={styles.page.main()}>
      <Planner initial={[]} />
      <Upcoming/>
    </main>
  )
}
