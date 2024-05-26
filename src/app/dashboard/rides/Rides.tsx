'use client'
import {Map} from '@/components/map/Map'
import {Rides as RidesComponent} from '@/components/rides/Rides'
import {fromModule} from '@/utils/styler/Styler'
import {APIProvider} from '@vis.gl/react-google-maps'
import React from 'react'
import css from './Rides.module.scss'

export const RidesPage: React.FC = () => {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
  const styles = fromModule(css)

  return (
    <div className={styles.ridespage()}>
      <div className={styles.ridespage.rides()}>
        <RidesComponent />
        <RidesComponent old />
      </div>
      <div className={styles.map()}>
        <APIProvider apiKey={key}>
          <Map />
        </APIProvider>
      </div>
    </div>
  )
}
