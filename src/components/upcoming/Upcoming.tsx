'use client'

import {fromModule} from '@/utils/styler/Styler'
import React, {Suspense} from 'react'
import css from './Upcoming.module.scss'

import {Loader} from '@/ui/loader/Loader'
import {UpcomingRides} from './UpcomingRides'

const styles = fromModule(css)

export const Upcoming: React.FC = () => {
  return (
    <div className={styles.container()}>
      <h3 className={styles.container.title()}>Aankomende ritten</h3>
      <div className={styles.container.rides()}>
        <Suspense fallback={<Loader />}>
          <UpcomingRides />
        </Suspense>
      </div>
    </div>
  )
}
