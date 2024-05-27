'use client'
import {Map} from '@/components/map/Map'
import {Rides as RidesComponent} from '@/components/rides/Rides'
import {fromModule} from '@/utils/styler/Styler'
import {APIProvider} from '@vis.gl/react-google-maps'
import React from 'react'
import css from './Rides.module.scss'
import { Ride } from '@/types/ride.type'
import { useUser } from '@/lib/user/useUser'

const styles = fromModule(css)


export const RidesMap: React.FC = () => {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
  const {rides, currentRide} = useUser();

  return (
      <APIProvider apiKey={key}>
        <div className={styles.map.container()}>
          <Map zoom={15} destination={currentRide?.destination || ""}/>
        </div>
      </APIProvider>
  )
}
