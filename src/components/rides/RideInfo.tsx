'use client'

import {useUser} from '@/lib/user/useUser'
import {Passenger} from '@/types/passenger.type'
import {Ride} from '@/types/ride.type'
import {Loader} from '@/ui/loader/Loader'
import {fromModule} from '@/utils/styler/Styler'
import React, {useEffect, useState} from 'react'
import {fetchPassengerById} from '../upcoming/Upcoming.server'
import css from './Rides.module.scss'
import { now } from '@internationalized/date'
import Skeleton from 'react-loading-skeleton'

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

  useEffect(() => {
    const loadPassengers = async () => {
      const passengers: Passenger[] = [];
      if(currentRide) {
        setTimestamp(new Date(currentRide?.timestamp))
        passengers.push(await fetchPassengerById(currentRide?.passenger_1))
      } 
      if(currentRide?.passenger_2) passengers.push(await fetchPassengerById(currentRide?.passenger_2))

      setPassengers(passengers)
      setLoading(false)
    }

    loadPassengers()
  }, [currentRide])

  if (!currentRide && !isLoading) {
    return (
      <div className={styles.container.info()}>
      <h3 className={styles.container.title()}>
        Details van de rit
      </h3>
      <div className={styles.skeleton.info.container()}>
        <Skeleton className={styles.skeleton.info()}/>
        <Skeleton className={styles.skeleton.info()}/>
      </div>
      <div className={styles.skeleton.info.container()}>
        <Skeleton className={styles.skeleton.info()}/>
        <Skeleton className={styles.skeleton.info()}/>
      </div>
      </div>
  )
  }

  return (
    <div className={styles.container.info()}>
      <h3 className={styles.container.title()}>
        Details van de rit
      </h3>
      <div className={styles.container.info.grid()}>
        <div className={styles.container.info.grid.item()}>
          <p className={styles.container.info.grid.item.title()}>Vertrekpunt</p>
          <p>{currentRide?.origin.split(", ")[0]}</p>
          <p>{currentRide?.origin.split(", ")[1].split(" ")[1]}</p>
        </div>
        <div className={styles.container.info.grid.item()}>
          <p className={styles.container.info.grid.item.title()}>Bestemming</p>
          <p>{currentRide?.destination.split(", ")[0]}</p>
          <p>{currentRide?.destination.split(", ")[1].split(" ")[1]}</p>
        </div>
        <div className={styles.container.info.grid.item()}>
          <p className={styles.container.info.grid.item.title()}>Tijdstip</p>
          <p>{timestamp.toLocaleDateString('nl-BE', { weekday: "long", month: "long", day: "numeric", })}</p>
          <p>{timestamp.toLocaleTimeString('nl-BE', { hour: "2-digit", minute: "2-digit" })}</p>
        </div>
        <div className={styles.container.info.grid.item()}>
          <p className={styles.container.info.grid.item.title()}>Passagiers</p>
          {passengers.map((passenger, index) => (
            <p key={passenger.id}>{`${passenger.firstname} ${passenger.lastname}`}</p>
          ))}

        </div>
      </div>
    </div>
  )
}
