'use client'

import {fromModule} from '@/utils/styler/Styler'
import {APIProvider, Map as GoogleMap} from '@vis.gl/react-google-maps'
import React from 'react'
import css from './Map.module.scss'

const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
const mapId = process.env.NEXT_PUBLIC_MAP_ID

const styles = fromModule(css)

export type MapProps = {
  zoom?: number
  center?: {lat: number; lng: number}
}

export const Map: React.FC<MapProps> = ({zoom, center}) => {
  center = center || {lat: 50.85045, lng: 4.34878}
  zoom = zoom || 8
  return (
    <>
      <APIProvider apiKey={key}>
        <div className={styles.map()}>
          <GoogleMap
            streetViewControl={false}
            fullscreenControl={false}
            mapTypeControl={false}
            mapId={mapId}
            defaultZoom={zoom}
            defaultCenter={center}
            scrollwheel={true}
          />
        </div>
      </APIProvider>
    </>
  )
}
