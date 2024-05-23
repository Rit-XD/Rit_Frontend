'use client'

import { fromModule } from '@/utils/styler/Styler'
import { AdvancedMarker, Map as GoogleMap } from '@vis.gl/react-google-maps'
import React, { useEffect, useState } from 'react'
import css from './Map.module.scss'
import { Pinpoint } from './Pinpoint'
import { setKey, setLanguage, setRegion, fromAddress, } from "react-geocode";



// const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
const mapId = process.env.NEXT_PUBLIC_MAP_ID

const styles = fromModule(css)

export type MapProps = {
  zoom?: number
  center?: {lat: number; lng: number}
  onPlaceSelect?: (place: google.maps.places.PlaceResult | null) => void
  destination?: string
}

export const Map: React.FC<MapProps> = ({zoom, onPlaceSelect, destination}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(zoom || 8)
  const [center, setCenter] = useState<{lat: number; lng: number} | null>(null)
  const defaultCenter = {lat: 51.02735567847175, lng: 4.478807550388861}

  setKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string);
  setLanguage("nl");
  setRegion("be");

  useEffect(() => {
    if (!destination) return;
    fromAddress(destination!).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
      },
      (error) => {
        console.error(error);
      }
    );
  }, [destination])


  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setLocation)
    }
  }

  useEffect(() => {
    getLocation()
  }, [center])

  const setLocation = (position: GeolocationPosition) => {
    setCenter({lat: position.coords.latitude, lng: position.coords.longitude})
    setZoomLevel(15)
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({lat: position.coords.latitude, lng: position.coords.longitude})
        setZoomLevel(15)
      }, () => {
        setCenter({lat: defaultCenter.lat, lng: defaultCenter.lng})
      })
    } else {
      setCenter({lat: defaultCenter.lat, lng: defaultCenter.lng})
    }
  }, [])

  if (!center) {
    return null
  }

  return (
    <>
        <div className={styles.map()}>

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
            {center.lat !== defaultCenter.lat && center.lng !== defaultCenter.lng && 
              <AdvancedMarker position={center}>
                  <Pinpoint />
              </AdvancedMarker>
            }
          </GoogleMap>
        </div>
    </>
  )
}
