'use client'

import css from '@/components/rides/Rides.module.scss'
import {useCars} from '@/providers/cars/useCars'
import {useRides} from '@/providers/rides/useRides'
import {useUser} from '@/providers/user/useUser'
import {Passenger} from '@/types/passenger.type'
import {Ride} from '@/types/ride.type'
import {fromModule} from '@/utils/styler/Styler'
import React, {useEffect, useState} from 'react'
import Skeleton from 'react-loading-skeleton'
import {fetchPassengerById} from '../upcoming/Upcoming.server'
import { current } from '@reduxjs/toolkit'

const styles = fromModule(css)

export const CarRides: React.FC<{old?: boolean}> = ({old}) => {
  const [upcoming, setUpcoming] = useState<
    {r: Ride; p: Passenger; date: Date}[]
  >([])
  const [loading, setLoading] = useState(true)
  const {user} = useUser()
  const {rides, currentRide, selectRide, isLoading} = useRides()
  const {currentCar} = useCars()
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  useEffect(() => {
    setLoading(true)
    const loadRidesAndPassengers = async () => {
      let filteredUpcoming: {r: Ride; p: Passenger; date: Date}[] = []

      for (const r of rides) {
        const np = await fetchPassengerById(r.passenger_1)
        if (old && new Date(r.timestamp) < today) {
          filteredUpcoming.push({r: r, p: np, date: new Date(r.timestamp)})
        }
        if (!old && new Date(r.timestamp) > today) {
          filteredUpcoming.push({r: r, p: np, date: new Date(r.timestamp)})
        }
      }

      if ( filteredUpcoming.length ) {
        filteredUpcoming = filteredUpcoming.filter(u => u.r.car === currentCar?.id)
        setUpcoming(filteredUpcoming)
      }

      setLoading(false)
    }

    loadRidesAndPassengers()
    if (upcoming !== undefined && upcoming.length) {
      selectRide(upcoming[0].r.id!)
    }
  }, [user, rides, currentCar])

  useEffect(() => {
    console.log("Updated upcoming", upcoming);
  }, [upcoming]);

  if (isLoading || loading) {
    return (
      <div className={styles.container.carrides()}>
        <h3 className={styles.container.title()}>
          {old ? 'Oude' : 'Aankomende'} ritten van de wagen
        </h3>
        <Skeleton className={styles.skeleton.ride()} />
        <Skeleton className={styles.skeleton.ride()} />
        <Skeleton className={styles.skeleton.ride()} />
        <Skeleton className={styles.skeleton.ride()} />
        <Skeleton className={styles.skeleton.ride()} />
      </div>
    )
  }

  if (upcoming.length === 0) {
    return (
      <div className={styles.container.carrides()}>
        <h3 className={styles.container.title()}>
          {old ? 'Oude' : 'Aankomende'} ritten van de wagen
        </h3>
        <p style={{marginLeft: 16}}>
          Er zijn geen oude ritten aan deze wagen gekoppeld.
        </p>
      </div>
    )
  }

  return (
    <div className={styles.container.carrides()}>
      <h3 className={styles.container.title()}>
        {old ? 'Oude' : 'Aankomende'} ritten van de wagen
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
