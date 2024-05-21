'use client'

import {fromModule} from '@/utils/styler/Styler'
import React, {Suspense, useEffect, useState} from 'react'
import css from './Upcoming.module.scss'

import { Passenger } from '@/types/passenger.type'
import { Ride } from '@/types/ride.type'
import { fetchPassengerById, fetchRides,  } from './Upcoming.server'
import { Loader } from '@/ui/loader/Loader'
import { UpcomingRides } from './UpcomingRides'

const styles = fromModule(css)

export const Upcoming: React.FC = () => {
    const [rides, setRides] = useState<Ride[]>([]);
    const [upcoming, setUpcoming]= useState<{r: Ride, p: Passenger}[]>([]);


    //load all possible rides
    const loadRides = async () => {
      if (rides?.length) return;
      setRides(await fetchRides());
    }
    useEffect(() => {
      loadRides();
    }, []);

    //load all passengers
    useEffect(() => {
      const loadRidesAndPassengers = async () => {
        const rides = await fetchRides();
        const upcoming: {r: Ride, p: Passenger}[] = [];

        for (const r of rides) {
          const np = await fetchPassengerById(r.passenger_1);
          if (!upcoming.some(u => u.r.id === r.id && u.p.id === np.id)) {
            upcoming.push({r: r, p: np});
          }
        }

        setRides(rides);
        setUpcoming(upcoming);
      };

      loadRidesAndPassengers();
    }, []);

    return (
      <div className={styles.container()}>
          <h3 className={styles.container.title()}>Aankomende ritten</h3>  
          <Suspense fallback={<Loader/>}>
            <div className={styles.container.rides()}>
              {/* {upcoming.map((u) => (
                <div key={u.p.id + u.r.id}>
                  {u.p.firstname}
                </div>
              ))}    */}
              <UpcomingRides/>
            </div>
          </Suspense>
      </div>
    )
}
