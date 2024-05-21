'use client'

import {fromModule} from '@/utils/styler/Styler'
import {APIProvider, Map as GoogleMap, Marker} from '@vis.gl/react-google-maps'
import React, { useEffect, useState } from 'react'
import css from './Map.module.scss'

const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
const mapId = process.env.NEXT_PUBLIC_MAP_ID

const styles = fromModule(css)

export type MapProps = {
  zoom?: number
  center?: {lat: number; lng: number}
}

export const Map: React.FC<MapProps> = ({zoom}) => {
  const [center, setCenter] = useState<{lat: number; lng: number}>({lat: 50.85045, lng: 4.34878})
  zoom = zoom || 8;

  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setLocation);
    }
  }
  useEffect(() => {
    getLocation()
  }, []);

  const setLocation = (position: GeolocationPosition) => {
    setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
    console.log(center);
  }



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
          {/* <Marker icon={{ url: '/custom_marker_pin.svg', anchor: new google.maps.Point(17, 46), scaledSize: new google.maps.Size(37, 37) }} position={ center } /> */}
        </div>
      </APIProvider>
    </>
  )
}
