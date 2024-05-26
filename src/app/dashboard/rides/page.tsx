import {Rides as RidesComponent} from '@/components/rides/Rides'
import {fetchUser} from '@/lib/user/fetchUser'
import Button from '@/ui/button/Button'
import {fromModule} from '@/utils/styler/Styler'
import {redirect} from 'next/navigation'
import css from './Rides.module.scss'

const styles = fromModule(css)

export default async function Rides() {
  const user = await fetchUser()
  if (!user) redirect(`/login`)

  return (
    <main className={styles.container()}>
      <div className={styles.container.left()}>
        <h1>Ritten</h1>
        <Button
          iconafter="plus"
          className={styles.container.left.new()}
          mod="outline"
        >
          Nieuwe rit
        </Button>
        {/* <div className={styles.lists()}> */}
        <RidesComponent />
        <RidesComponent old />
      </div>
      {/* </div> */}
    </main>
  )
}
