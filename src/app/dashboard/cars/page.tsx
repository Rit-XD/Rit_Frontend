import {CarDetails} from '@/components/cars/CarDetails'
import {CarSpecs} from '@/components/cars/CarSpecs'
import {Cars as CarsComponent} from '@/components/cars/Cars'
import Button from '@/ui/button/Button'
import {fromModule} from '@/utils/styler/Styler'
import css from './Cars.module.scss'
import {CarsMap as Map} from './CarsMap'

const styles = fromModule(css)

export default async function Cars() {
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
          <CarDetails />
          <CarSpecs />
        </div>
        <Map />
      </div>
    </main>
  )
}
