import {fetchUser} from '@/lib/user/fetchUser'
import Button from '@/ui/button/Button'
import {fromModule} from '@/utils/styler/Styler'
import {redirect} from 'next/navigation'
import {RidesMap as Map} from './RidesMap'
import css from './Rides.module.scss'
import {Rides as RidesComponent} from '@/components/rides/Rides'
import { Ride } from '@/types/ride.type'
import { useUser } from '@nextui-org/react'
import { RideInfo } from '@/components/rides/RideInfo'

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
          <RideInfo/>
        </div>
        <Map/>
      </div>
    </main>
  )
}
