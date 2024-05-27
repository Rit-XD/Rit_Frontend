'use client'

import {useUser} from '@/lib/user/useUser'
import {Passenger} from '@/types/passenger.type'
import {Ride} from '@/types/ride.type'
import {Icon} from '@/ui/Icon'
import {fromModule} from '@/utils/styler/Styler'
import React, {useEffect, useState} from 'react'
import Skeleton from 'react-loading-skeleton'
import {fetchPassengerById} from '../upcoming/Upcoming.server'
import css from './Rides.module.scss'

const styles = fromModule(css)

export const RideInfo: React.FC = () => {
  const [upcoming, setUpcoming] = useState<
    {r: Ride; p: Passenger; date: Date}[]
  >([])
  const [loading, setLoading] = useState(true)
  const {user, rides, isLoading, currentRide, selectRide} = useUser()
  const [passengers, setPassengers] = useState<Passenger[]>([])
  const [timestamp, setTimestamp] = useState<Date>(new Date())

  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  let dateText
  if (timestamp.toLocaleDateString() === today.toLocaleDateString()) {
    dateText = 'Vandaag'
  } else if (timestamp.toLocaleDateString() === tomorrow.toLocaleDateString()) {
    dateText = 'Morgen'
  } else if (
    timestamp.toLocaleDateString() === yesterday.toLocaleDateString()
  ) {
    dateText = 'Gisteren'
  } else {
    dateText = timestamp.toLocaleDateString('nl-BE', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    })
  }

  useEffect(() => {
    const loadPassengers = async () => {
      const passengers: Passenger[] = []
      if (currentRide) {
        setTimestamp(new Date(currentRide?.timestamp))
        passengers.push(await fetchPassengerById(currentRide?.passenger_1))
      }
      if (currentRide?.passenger_2)
        passengers.push(await fetchPassengerById(currentRide?.passenger_2))

      setPassengers(passengers)
      setLoading(false)
    }

    loadPassengers()
  }, [currentRide])

  if (!currentRide && !isLoading) {
    return (
      <div className={styles.container.info()}>
        <h3 className={styles.container.title()}>Details van de rit</h3>
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
      <h3 className={styles.container.title()}>Details van de rit</h3>
      <div className={styles.container.info.grid()}>
        <div className={styles.container.info.grid.item()}>
          <div className={styles.container.info.grid.item.group()}>
            <Icon
              mod="square"
              className={styles.container.info.grid.item.group.logo()}
              icon="rides"
            />
            <p className={styles.container.info.grid.item.group.title()}>
              Vertrekpunt
            </p>
          </div>
          <p>{currentRide?.origin.split(', ')[0]}</p>
          <p className={styles.opacity()}>
            {currentRide?.origin.split(', ')[1].split(' ')[1]}
          </p>
        </div>
        <div className={styles.container.info.grid.item()}>
          <div className={styles.container.info.grid.item.group()}>
            <Icon
              mod="square"
              icon="finish"
              className={styles.container.info.grid.item.group.logo()}
            />
            <p className={styles.container.info.grid.item.group.title()}>
              Bestemming
            </p>
          </div>
          <p>{currentRide?.destination.split(', ')[0]}</p>
          <p className={styles.opacity()}>
            {currentRide?.destination.split(', ')[1].split(' ')[1]}
          </p>
        </div>
        <div className={styles.container.info.grid.item()}>
          <div className={styles.container.info.grid.item.group()}>
            <Icon
              mod="square"
              icon="clock"
              className={styles.container.info.grid.item.group.logo()}
            />
            <p className={styles.container.info.grid.item.group.title()}>
              Tijdstip
            </p>
          </div>
          <p>{dateText}</p>
          <p className={styles.opacity()}>
            Om{' '}
            {timestamp.toLocaleTimeString('nl-BE', {
              hour: '2-digit',
              minute: '2-digit'
            })}
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
              Passagiers
            </p>
          </div>
          {passengers.map((passenger, index) => (
            <p
              key={passenger.id}
            >{`${passenger.firstname} ${passenger.lastname}`}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
