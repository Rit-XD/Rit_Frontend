'use client'

import {useCars} from '@/providers/cars/useCars'
import {useUser} from '@/providers/user/useUser'
import {fromModule} from '@/utils/styler/Styler'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import css from './Cars.module.scss'

const styles = fromModule(css)

export const Cars: React.FC = () => {
  const {isLoading} = useUser()
  const {cars, currentCar, selectCar} = useCars()

  if (cars.length === 0 && !isLoading) {
    return (
      <div className={styles.container()}>
        <h3 className={styles.container.title()}>Wagens</h3>
        <Skeleton className={styles.skeleton.ride()} />
        <Skeleton className={styles.skeleton.ride()} />
        <Skeleton className={styles.skeleton.ride()} />
        <Skeleton className={styles.skeleton.ride()} />
        <Skeleton className={styles.skeleton.ride()} />
      </div>
    )
  }

  if (selectCar && cars.length > 0 && !currentCar) {
    selectCar(cars[0].id)
  }

  return (
    <div className={styles.container()}>
      <h3 className={styles.container.title()}>Wagens</h3>
      {cars.map(car => (
        <div
          className={
            currentCar && currentCar.id === car.id
              ? styles.container.selectedCar()
              : styles.cars()
          }
          key={car.id}
          onClick={() => selectCar(car.id)}
        >
          <div className={styles.cars.container.header()}>
            <img src={car.picture || ''} alt="car" />
            <div>
              <h3 className={styles.cars.container.title()}>
                {car.brand} {car.model}
              </h3>
              <span className={styles.cars.container.plate()}>{car.plate}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
