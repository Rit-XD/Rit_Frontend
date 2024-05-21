'use client'

import {fromModule} from '@/utils/styler/Styler'
import React, {Suspense, useEffect, useState} from 'react'
import css from './Upcoming.module.scss'

import { Passenger } from '@/types/passenger.type'
import { Ride } from '@/types/ride.type'
import { fetchPassengerById, fetchRides,  } from './Upcoming.server'
import { Loader } from '@/ui/loader/Loader'
import { UpcomingRides } from './UpcomingRides'
import { useUser } from '@/lib/user/useUser'

const styles = fromModule(css)

export const Upcoming: React.FC = () => {

    return (
      <div className={styles.container()}>
          <h3 className={styles.container.title()}>Aankomende ritten</h3>  
            <div className={styles.container.rides()}>
              <Suspense fallback={<Loader/>}>
                <UpcomingRides/>
              </Suspense>
            </div>
      </div>
    )
}
