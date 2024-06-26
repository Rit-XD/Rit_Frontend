'use client'

import {useUser} from '@/providers/user/useUser'
import {Passenger} from '@/types/passenger.type'
import {Ride} from '@/types/ride.type'
import {Icon} from '@/ui/Icon'
import {Loader} from '@/ui/loader/Loader'
import {fromModule} from '@/utils/styler/Styler'
import {useEffect, useState} from 'react'
import css from './Upcoming.module.scss'
import {fetchPassengerById} from './Upcoming.server'
import { useRides } from '@/providers/rides/useRides'

const styles = fromModule(css)

export const UpcomingRides: React.FC = () => {
  // const [rides, setRides] = useState<Ride[]>([])
  const [upcoming, setUpcoming] = useState<
    {r: Ride; p: Passenger; date: Date}[]
  >([])
  const [loading, setLoading] = useState(true)
  const [l, setL] = useState(false)

  const { user } = useUser()
  const { rides, isLoading } = useRides()

  //load all passengers
  useEffect(() => {
    const loadRidesAndPassengers = async () => {
      const upcoming: {r: Ride; p: Passenger; date: Date}[] = []
      for (const r of rides) {
        const timestamp = new Date(r.timestamp)
        const now = new Date(Date.now())
        const np = await fetchPassengerById(r.passenger_1)
        if (
          !upcoming.some(u => u.r.id === r.id && u.p.id === np.id) &&
          timestamp > now
        ) {
          upcoming.push({r: r, p: np, date: new Date(r.timestamp)})
        }
      }
      setUpcoming(upcoming.slice(0, 5))
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

  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  return upcoming.length > 0 ? (
    <div className={styles.ride()}>
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
          <div key={u.p.id + u.r.id} className={styles.ride.container()}>
            <div className={styles.ride.container.header()}>
              <img
                src="https://caledoniagladiators.com/wp-content/uploads/2023/08/person.png"
                alt="passenger"
              />
              <div>
                <h3>
                  {u.p.firstname} {u.p.lastname}
                </h3>
                <span className={styles.ride.container.date()}>
                  {displayDate}
                </span>
              </div>
            </div>
            <div className={styles.ride.container.route()}>
              <div className={styles.ride.container.route.address()}>
                <div className={styles.ride.container.route.address.icon()}>
                  <Icon icon="rides" />
                </div>
                <div className={styles.ride.container.route.address.text()}>
                  <span>{user?.name}</span>
                  <span>
                    {user?.city} {user?.postal}
                  </span>
                </div>
              </div>
              <div className={styles.ride.container.route.divider()} />
              <div className={styles.ride.container.route.address()}>
                <div className={styles.ride.container.route.address.icon()}>
                  <Icon mod="square" icon="finish" />
                </div>
                <div className={styles.ride.container.route.address.text()}>
                  <span>{u.r.destination.split(',')[0]}</span>
                  <span>
                    {
                      u.r.destination
                        .split(' ')
                        [u.r.destination.split(' ').length - 2].split(',')[0]
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  ) : (
    <p>Geen aankomende ritten</p>
  )
}
