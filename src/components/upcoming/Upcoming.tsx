'use client'

import { fromModule } from '@/utils/styler/Styler'
import React, { Suspense } from 'react'
import css from './Upcoming.module.scss'

import { Loader } from '@/ui/loader/Loader'
import { UpcomingRides } from './UpcomingRides'
import { Link } from '@/ui/Link'
import { Icon } from '@/ui/Icon'

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
      <div className={styles.container.bottom()}>
        <hr />
        <Link href="/dashboard/rides" className={styles.container.bottom.link()}>Bekijk alle routes <Icon icon="arrowRight" mod='square' className={styles.container.bottom.link.icon()}/></Link>
      </div>
    </div>
  )
}
