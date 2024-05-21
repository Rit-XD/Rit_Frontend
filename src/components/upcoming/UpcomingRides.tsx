'use client'

import {useUser} from '@/lib/user/useUser'
import {Passenger} from '@/types/passenger.type'
import {Ride} from '@/types/ride.type'
import {Loader} from '@/ui/loader/Loader'
import {useEffect, useState} from 'react'
import {fetchPassengerById, fetchRides} from './Upcoming.server'
import css from './Upcoming.module.scss'
import { fromModule } from '@/utils/styler/Styler'

const styles = fromModule(css);

export const UpcomingRides: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>([])
  const [upcoming, setUpcoming] = useState<{r: Ride; p: Passenger, date: Date}[]>([])
  const [loading, setLoading] = useState(true)

  const {user} = useUser()

  //load all passengers
  useEffect(() => {
    const loadRidesAndPassengers = async () => {
      const rides = await fetchRides(user!)
      const upcoming: {r: Ride; p: Passenger, date: Date}[] = []

      for (const r of rides) {
        const np = await fetchPassengerById(r.passenger_1)
        if (!upcoming.some(u => u.r.id === r.id && u.p.id === np.id)) {
          upcoming.push({r: r, p: np, date: new Date(r.timestamp)})
        }
      }

      setRides(rides)
      setUpcoming(upcoming)
      setLoading(false)
    }

    loadRidesAndPassengers()
  }, [user])

  if (loading) {
    return <Loader />
  }

  return (
    <div className={styles.ride()}>
      {upcoming.map(u => (
        <div key={u.p.id + u.r.id} className={styles.ride.container()}>
          <div className={styles.ride.container.header()}>
            <img src="https://caledoniagladiators.com/wp-content/uploads/2023/08/person.png" alt="passenger" />
            <div>
            <h3>{u.p.firstname} {u.p.lastname}</h3>
            <span className={styles.ride.container.date()}>{ u.date.toLocaleDateString()}</span>
            </div>
          </div>
          <div className={styles.ride.container.route()}>
            <span>Van: {user?.name}</span>
            <span>Naar: {u.r.destination.split(',')[0]}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
