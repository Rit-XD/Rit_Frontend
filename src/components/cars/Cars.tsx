'use client'

import {useUser} from '@/lib/user/useUser'
import {fromModule} from '@/utils/styler/Styler'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import css from './Cars.module.scss'

const styles = fromModule(css)

export const Cars: React.FC = () => {
  const {cars, isLoading} = useUser()

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

  return (
    <div className={styles.container()}>
      <h3 className={styles.container.title()}>Wagens</h3>
      {cars.map(car => (
        <div className={styles.cars()} key={car.id}>
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
