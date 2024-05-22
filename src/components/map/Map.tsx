'use client'

import {fromModule} from '@/utils/styler/Styler'
import {APIProvider, AdvancedMarker, Map as GoogleMap} from '@vis.gl/react-google-maps'
import React, {useEffect, useState} from 'react'
import css from './Map.module.scss'
import Logo from '../../../public/pinpoint.svg'
import { Pinpoint } from './Pinpoint'
import { Autocomplete } from './Autocomplete'
import { MapHandler } from './MapHandler'

// const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
const mapId = process.env.NEXT_PUBLIC_MAP_ID

const styles = fromModule(css)

export type MapProps = {
  zoom?: number
  center?: {lat: number; lng: number}
  onPlaceSelect?: (place: google.maps.places.PlaceResult | null) => void
}


export const Map: React.FC<MapProps> = ({zoom, onPlaceSelect}) => {
  const [center, setCenter] = useState<{lat: number; lng: number}>({
    lat: 50.85045,
    lng: 4.34878
  })
  // const [selectedPlace, setSelectedPlace] =
  // useState<google.maps.places.PlaceResult | null>(null)
  const [zoomLevel, setZoomLevel] = useState<number>(zoom || 8)

  // const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
  //   setSelectedPlace(place)

  // }


  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setLocation)
    }
  }
  useEffect(() => {
    getLocation()
  }, [])

  const setLocation = (position: GeolocationPosition) => {
    setCenter({lat: position.coords.latitude, lng: position.coords.longitude})
    setZoomLevel(15)
  }

  // useEffect(() => {
  //   if (selectedPlace) handlePlaceSelect(selectedPlace)
  // }, [selectedPlace])

  return (
    <>
      {/* <APIProvider apiKey={key}> */}
        <div className={styles.map()}>
        {/* <Autocomplete
                  onPlaceSelect={place => {
                    setSelectedPlace(place)
                    if (onPlaceSelect) {
                      onPlaceSelect(place)
                    }
                  }}
                /> */}
          <GoogleMap
            gestureHandling={'greedy'}
            streetViewControl={false}
            fullscreenControl={false}
            mapTypeControl={false}
            mapId={mapId}
            defaultZoom={zoomLevel}
            defaultCenter={center}
            scrollwheel={true}
          >
            <AdvancedMarker position={center}>
                <Pinpoint />
            </AdvancedMarker>
          </GoogleMap>
        </div>
      {/* </APIProvider> */}
    </>
  )
}
