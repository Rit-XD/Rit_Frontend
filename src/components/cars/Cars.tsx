'use client'

import {useUser} from '@/providers/user/useUser'
import {Passenger} from '@/types/passenger.type'
import {Ride} from '@/types/ride.type'
import {fromModule} from '@/utils/styler/Styler'
import React, {useEffect, useState} from 'react'
import Skeleton from 'react-loading-skeleton'
import {fetchPassengerById} from '../upcoming/Upcoming.server'
import css from './Cars.module.scss'
import { useRides } from '@/providers/rides/useRides'

const styles = fromModule(css)

export const Cars: React.FC<{old?: boolean}> = ({old}) => {
  const [upcoming, setUpcoming] = useState<
    {r: Ride; p: Passenger; date: Date}[]
  >([])
  const [loading, setLoading] = useState(true)
  const {user} = useUser()
  const { rides, currentRide, selectRide, isLoading } = useRides()
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  useEffect(() => {
    const loadRidesAndPassengers = async () => {
      const upcoming: {r: Ride; p: Passenger; date: Date}[] = []

      for (const r of rides) {
        const np = await fetchPassengerById(r.passenger_1)
        if (old && new Date(r.timestamp) < today) {
          upcoming.push({r: r, p: np, date: new Date(r.timestamp)})
        }
        if (!old && new Date(r.timestamp) > today) {
          upcoming.push({r: r, p: np, date: new Date(r.timestamp)})
        }
      }

      if (!old && upcoming.length && upcoming[0].r.id && !currentRide)
        selectRide(upcoming[0].r.id)
      if (old) setUpcoming(upcoming.reverse())
      else setUpcoming(upcoming)
      setLoading(false)
    }

    loadRidesAndPassengers()
  }, [user, rides])

  useEffect(() => {
    if (upcoming.length) setLoading(false)
  }, [upcoming])

  if (upcoming.length === 0 && !isLoading) {
    return (
      <div className={styles.container()}>
        <h3 className={styles.container.title()}>
          {old ? 'Oude' : 'Aankomende'} ritten
        </h3>
        <Skeleton className={styles.skeleton.ride()} />
        <Skeleton className={styles.skeleton.ride()} />
        <Skeleton className={styles.skeleton.ride()} />
      </div>
    )
  }

  return (
    <div className={styles.container()}>
      <h3 className={styles.container.title()}>
        {old ? 'Oude' : 'Aankomende'} ritten
      </h3>
      <div className={styles.container.rides()}>
        {upcoming.map(u => {
          const rideDate = new Date(u.date)
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
          } else if (rideDate.toDateString() === yesterday.toDateString()) {
            displayDate = `Gisteren om ${rideDate.toLocaleTimeString('nl-BE', {
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
            <div
              className={
                (currentRide && currentRide.id === u.r.id
                  ? styles.container.selectedRide()
                  : styles.container.ride()) || styles.container.ride()
              }
              key={u.p.id + u.r.id}
              onClick={() => {
                if (u.r.id) selectRide(u.r.id)
              }}
            >
              <img
                src="https://caledoniagladiators.com/wp-content/uploads/2023/08/person.png"
                alt="passenger"
              />
              <div>
                <div className={styles.container.ride.group()}>
                  <p>
                    {u.p.firstname} {u.p.lastname}
                  </p>
                  <p>
                    {u.r.distance ? (u.r.distance / 1000).toFixed(0) : '0'} km
                  </p>
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
