'use client'

import {useCars} from '@/providers/cars/useCars'
import {Icon} from '@/ui/Icon'
import {fromModule} from '@/utils/styler/Styler'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import css from './Cars.module.scss'

const styles = fromModule(css)

export const CarSpecs: React.FC = () => {
  const {currentCar, isLoading} = useCars()

  if (!currentCar && !isLoading) {
    return (
      <div className={styles.container.info()}>
        <h3 className={styles.container.title()}>Specificaties</h3>
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
      <h3 className={styles.container.title()}>Specificaties</h3>
      <div className={styles.container.info.grid()}>
        <div className={styles.container.info.grid.item()}>
          <div className={styles.container.info.grid.item.group()}>
            <Icon
              mod="square"
              className={styles.container.info.grid.item.group.logo()}
              icon="fuel"
            />
            <p className={styles.container.info.grid.item.group.title()}>
              Brandstof
            </p>
          </div>
          <p className={styles.opacity()}>{currentCar?.fuel} </p>
        </div>
        <div className={styles.container.info.grid.item()}>
          <div className={styles.container.info.grid.item.group()}>
            <Icon
              mod="square"
              icon="license_plate"
              className={styles.container.info.grid.item.group.logo()}
            />
            <p className={styles.container.info.grid.item.group.title()}>
              Nummerplaat
            </p>
          </div>
          <p>{currentCar?.plate}</p>
        </div>
        <div className={styles.container.info.grid.item()}>
          <div className={styles.container.info.grid.item.group()}>
            <Icon
              mod="square"
              icon="range"
              className={styles.container.info.grid.item.group.logo()}
            />
            <p className={styles.container.info.grid.item.group.title()}>
              Bereik
            </p>
          </div>
          <p>{currentCar?.range} km</p>
        </div>
        <div className={styles.container.info.grid.item()}>
          <div className={styles.container.info.grid.item.group()}>
            <Icon
              mod="square"
              icon="transmission"
              className={styles.container.info.grid.item.group.logo()}
            />
            <p className={styles.container.info.grid.item.group.title()}>
              Transmissie
            </p>
          </div>
          <p>{currentCar?.automatic === true ? 'Automaat' : 'Manueel'}</p>
        </div>
      </div>
    </div>
  )
}
