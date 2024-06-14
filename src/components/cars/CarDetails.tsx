'use client'

import {useCars} from '@/providers/cars/useCars'
import {Icon} from '@/ui/Icon'
import {fromModule} from '@/utils/styler/Styler'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import css from './Cars.module.scss'

const styles = fromModule(css)

export const CarDetails: React.FC = () => {
  const {currentCar, isLoading} = useCars()

  if (!currentCar && !isLoading) {
    return (
      <div className={styles.container.info()}>
        <h3 className={styles.container.title()}>Details van de wagen</h3>
        <div className={styles.skeleton.info.container()}>
          <Skeleton className={styles.skeleton.info()} />
          <Skeleton className={styles.skeleton.info()} />
        </div>
        <div className={styles.skeleton.info.container()}>
          <Skeleton className={styles.skeleton.info()} />
          <Skeleton className={styles.skeleton.info()} />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container.info()}>
      <h3 className={styles.container.title()}>Details van de wagen</h3>
      <div className={styles.container.info.grid()}>
        <div className={styles.container.info.grid.item()}>
          <div className={styles.container.info.grid.item.group()}>
            <Icon
              mod="square"
              className={styles.container.info.grid.item.group.logo()}
              icon="rides"
            />
            <p className={styles.container.info.grid.item.group.title()}>
              Merk
            </p>
          </div>
          <p> {currentCar?.brand}</p>
        </div>
        <div className={styles.container.info.grid.item()}>
          <div className={styles.container.info.grid.item.group()}>
            <Icon
              mod="square"
              icon="finish"
              className={styles.container.info.grid.item.group.logo()}
            />
            <p className={styles.container.info.grid.item.group.title()}>
              Model
            </p>
          </div>
          <p> {currentCar?.model}</p>
        </div>
        <div className={styles.container.info.grid.item()}>
          <div className={styles.container.info.grid.item.group()}>
            <Icon
              mod="square"
              icon="clock"
              className={styles.container.info.grid.item.group.logo()}
            />
            <p className={styles.container.info.grid.item.group.title()}>
              Zitplaatsen
            </p>
          </div>
          <p>
            {currentCar?.seats === 1
              ? `${currentCar?.seats} passagier`
              : `${currentCar?.seats} passagiers`}{' '}
            +{' '}
            {currentCar?.wheelchaircapacity === 1
              ? `${currentCar?.wheelchaircapacity} rolstoelplaats`
              : `${currentCar?.wheelchaircapacity} rolstoelplaatsen`}
          </p>
        </div>
        <div className={styles.container.info.grid.item()}>
          <div className={styles.container.info.grid.item.group()}>
            <Icon
              mod="square"
              icon="passengers"
              className={styles.container.info.grid.item.group.logo()}
            />
            <p className={styles.container.info.grid.item.group.title()}>
              Klasse
            </p>
          </div>
          <p>Rolstoelwagen</p>
        </div>
      </div>
    </div>
  )
}
