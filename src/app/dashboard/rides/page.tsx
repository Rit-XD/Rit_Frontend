import {fetchUser} from '@/lib/user/fetchUser'
import {redirect} from 'next/navigation'
import css from './Rides.module.scss'
import { fromModule } from '@/utils/styler/Styler'
import { Upcoming } from '@/components/upcoming/Upcoming'
import { Rides as RidesComponent } from '@/components/rides/Rides'
import Button from '@/ui/button/Button'

const styles = fromModule(css)

export default async function Rides() {
  const user = await fetchUser()
  if (!user) redirect(`/login`)

  return (
    <main className={styles.container()}>
      <div className={styles.container.left()}>
        <h1>Ritten</h1>
        <Button iconafter='plus' className={styles.container.left.new()} mod="outline">Nieuwe rit</Button>
          <div className={styles.lists()}>
          <RidesComponent/>
          <RidesComponent old/>
          </div>
      </div>
    </main>
  )
}
