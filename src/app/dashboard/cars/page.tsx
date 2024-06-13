import {Cars as CarsComponent} from '@/components/cars/Cars'
import {Cars as CarsComponent} from '@/components/cars/Cars'
import {DriverInfo} from '@/components/rides/DriverInfo'
import {RideInfo} from '@/components/rides/RideInfo'
import {fetchUser} from '@/providers/user/fetchUser'
import Button from '@/ui/button/Button'
import {fromModule} from '@/utils/styler/Styler'
import {redirect} from 'next/navigation'
import css from './Cars.module.scss'
import {CarsMap as Map} from './CarsMap'

const styles = fromModule(css)

export default async function Cars() {
  const user = await fetchUser()
  if (!user) redirect(`/login`)

  return (
    <main className={styles.container()}>
      <div className={styles.container.left()}>
        <h1>Wagens</h1>
        <Button
          iconbefore="plus"
          className={styles.container.left.new()}
          mod="outline"
        >
          Nieuwe wagen TODO:
        </Button>
        <div className={styles.container.left.rides()}>
          <CarsComponent />
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
