'use client'

import {Map} from '@/components/map/Map'
import {useRides} from '@/providers/rides/useRides'
import {fromModule} from '@/utils/styler/Styler'
import {APIProvider} from '@vis.gl/react-google-maps'
import React from 'react'
import css from './Cars.module.scss'

const styles = fromModule(css)

export const CarsMap: React.FC = () => {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
  const {currentRide} = useRides()

  if (!currentRide?.destination)
    return (
      <APIProvider apiKey={key}>
        <div className={styles.map.skeleton.container()}>
          <Map zoom={15} />
        </div>
      </APIProvider>
    )

  return (
    <APIProvider apiKey={key}>
      <div className={styles.map.container()}>
        <Map zoom={15} destination={currentRide?.destination || ''} />
      </div>
    </APIProvider>
  )
}
