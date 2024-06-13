'use client'

import {useUser} from '@/providers/user/useUser'
import {Driver} from '@/types/driver.type'
import {Icon} from '@/ui/Icon'
import Button from '@/ui/button/Button'
import {fromModule} from '@/utils/styler/Styler'
import React, {useEffect, useState} from 'react'
import Skeleton from 'react-loading-skeleton'
import {fetchDriver} from './DriverInfo.server'
import css from './Rides.module.scss'
import { useRides } from '@/providers/rides/useRides'

const styles = fromModule(css)

export const DriverInfo: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const {isLoading} = useUser()
  const { currentRide } = useRides()
  const [driver, setDriver] = useState<Driver | null>(null)

  useEffect(() => {
    const fetchDriverData = async () => {
      setDriver(null)
      setLoading(true)
      if (currentRide?.driver) {
        const driverData = await fetchDriver(currentRide.driver)
        setDriver(driverData)
        setLoading(false)
      }
    }

    fetchDriverData()
  }, [currentRide])

  if (!currentRide && !isLoading) {
    return (
      <div className={styles.container.info()}>
        <h3 className={styles.container.title()}>Gegevens bestuurder</h3>
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
      <h3 className={styles.container.title()}>Gegevens bestuurder</h3>
      <div className={styles.container.info.grid.item()}>
        <div className={styles.container.info.grid.item.group()}>
          <Icon
            mod="square"
            className={styles.container.info.grid.item.group.logo()}
            icon="passengers"
          />
          <p className={styles.container.info.grid.item.group.title()}>
            {(driver?.firstname &&
              driver?.lastname &&
              `${driver?.firstname} ${driver?.lastname}`) ||
              'Momenteel nog geen bestuurder'}
          </p>
        </div>
        <p className={styles.opacity()}>{driver?.phone || ''} </p>
      </div>
      <Button className={styles.button()} iconbefore="chat_solid">
        Stuur een bericht
      </Button>
    </div>
  )
}
