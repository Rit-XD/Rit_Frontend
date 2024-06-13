import {DriverInfo} from '@/components/rides/DriverInfo'
import {RideInfo} from '@/components/rides/RideInfo'
import {Rides as RidesComponent} from '@/components/rides/Rides'
import {fetchUser} from '@/providers/user/fetchUser'
import Button from '@/ui/button/Button'
import {fromModule} from '@/utils/styler/Styler'
import {redirect} from 'next/navigation'
import css from './Rides.module.scss'
import {RidesMap as Map} from './RidesMap'

const styles = fromModule(css)

export default async function Rides() {
  const user = await fetchUser()
  if (!user) redirect(`/login`)

  return (
    <main className={styles.container()}>
      <div className={styles.container.left()}>
        <h1>Ritten</h1>
        <Button
          iconbefore="plus"
          className={styles.container.left.new()}
          mod="outline"
          // onClick={() => redirect(`/dashboard/`)}
        >
          Nieuwe rit
        </Button>
        <div className={styles.container.left.rides()}>
          <RidesComponent />
          <RidesComponent old />
        </div>
      </div>
      <div className={styles.container.right()}>
        <div className={styles.container.right.info()}>
          <RideInfo />
          <DriverInfo />
        </div>
        <Map />
      </div>
    </main>
  )
}
