'use client'
import {Map} from '@/components/map/Map'
import {useUser} from '@/providers/user/useUser'
import {fromModule} from '@/utils/styler/Styler'
import {APIProvider} from '@vis.gl/react-google-maps'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import css from './Cars.module.scss'
import { useRides } from '@/providers/rides/useRides'

const styles = fromModule(css)

export const CarsMap: React.FC = () => {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
  const {currentRide} = useRides()

  if (!currentRide?.destination)
    return (
      <div className={styles.map.skeleton.container()}>
        <Skeleton className={styles.map.skeleton()} />
      </div>
    )

  return (
    <APIProvider apiKey={key}>
      <div className={styles.map.container()}>
        <Map zoom={15} destination={currentRide?.destination || ''} />
      </div>
    </APIProvider>
  )
}
