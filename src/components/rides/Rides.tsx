'use client'

import {useUser} from '@/lib/user/useUser'
import {Passenger} from '@/types/passenger.type'
import {Ride} from '@/types/ride.type'
import {Loader} from '@/ui/loader/Loader'
import {fromModule} from '@/utils/styler/Styler'
import React, {useEffect, useState} from 'react'
import {fetchPassengerById} from '../upcoming/Upcoming.server'
import css from './Rides.module.scss'

const styles = fromModule(css)

export const Rides: React.FC<{old?: boolean}> = ({old}) => {
  const [upcoming, setUpcoming] = useState<
    {r: Ride; p: Passenger; date: Date}[]
  >([])
  const [loading, setLoading] = useState(true)
  const {user, rides, isLoading} = useUser()

  useEffect(() => {
    const loadRidesAndPassengers = async () => {
      const upcoming: {r: Ride; p: Passenger; date: Date}[] = []

      for (const r of rides) {
        const np = await fetchPassengerById(r.passenger_1)
        if (!upcoming.some(u => u.r.id === r.id && u.p.id === np.id)) {
          upcoming.push({r: r, p: np, date: new Date(r.timestamp)})
        }
      }

      setUpcoming(upcoming)
      setLoading(false)
    }

    loadRidesAndPassengers()
  }, [user, rides])

  useEffect(() => {
    if (upcoming.length) setLoading(false)
  }, [upcoming])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={styles.container()}>
      <h3 className={styles.container.title()}>
        {old ? 'Oude' : 'Aankomende'} ritten
      </h3>
      <div className={styles.container.rides()}>
        {upcoming.map(u => {
          const rideDate = new Date(u.date)
          const today = new Date()
          const tomorrow = new Date(today)
          tomorrow.setDate(tomorrow.getDate() + 1)
          let displayDate
          if (rideDate.toDateString() === today.toDateString()) {
            displayDate = `Vandaag om ${rideDate.toLocaleTimeString('nl-BE', {
              hour: 'numeric',
              minute: 'numeric'
            })}`
          } else if (rideDate.toDateString() === tomorrow.toDateString()) {
            displayDate = `Morgen om ${rideDate.toLocaleTimeString('nl-BE', {
              hour: 'numeric',
              minute: 'numeric'
            })}`
          } else {
            displayDate = rideDate.toLocaleDateString('nl-BE', {
              weekday: 'short',
              day: '2-digit',
              month: 'long',
              hour: 'numeric',
              minute: 'numeric'
            })
          }

          return (
            <div className={styles.container.ride()} key={u.p.id + u.r.id}>
              <img
                src="https://caledoniagladiators.com/wp-content/uploads/2023/08/person.png"
                alt="passenger"
              />
              <div>
                <div className={styles.container.ride.group()}>
                  <p>
                    {u.p.firstname} {u.p.lastname}
                  </p>
                  <p>17 km</p>
                </div>
                <span className={styles.container.ride.date()}>
                  {displayDate}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
