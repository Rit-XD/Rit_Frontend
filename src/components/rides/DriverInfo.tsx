'use client'

import {useUser} from '@/lib/user/useUser'
import {Passenger} from '@/types/passenger.type'
import {Ride} from '@/types/ride.type'
import {Icon} from '@/ui/Icon'
import Button from '@/ui/button/Button'
import {fromModule} from '@/utils/styler/Styler'
import React, {useState} from 'react'
import Skeleton from 'react-loading-skeleton'
import css from './Rides.module.scss'

const styles = fromModule(css)

export const DriverInfo: React.FC = () => {
  const [upcoming, setUpcoming] = useState<
    {r: Ride; p: Passenger; date: Date}[]
  >([])
  const [loading, setLoading] = useState(true)
  const {user, rides, isLoading, currentRide, selectRide} = useUser()

  if (!currentRide && !isLoading) {
    return (
      <div className={styles.container.info()}>
        <h3 className={styles.container.title()}>Gegevens chauffeur</h3>
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
      <h3 className={styles.container.title()}>Gegevens chauffeur</h3>
      <div className={styles.container.info.grid()}>
        <div className={styles.container.info.grid.item()}>
          <div className={styles.container.info.grid.item.group()}>
            <Icon
              mod="square"
              className={styles.container.info.grid.item.group.logo()}
              icon="passengers"
            />
            <p className={styles.container.info.grid.item.group.title()}>
              Steve Goossens
            </p>
          </div>
          <p className={styles.opacity()}>{user?.phone}</p>
        </div>
      </div>
      <Button className={styles.button()} iconbefore="chat_solid">
        Stuur een bericht
      </Button>
    </div>
  )
}
