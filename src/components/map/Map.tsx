'use client'

import { useUser } from '@/providers/user/useUser'
import { Icon } from '@/ui/Icon'
import { fromModule } from '@/utils/styler/Styler'
import {
  AdvancedMarker,
  Map as GoogleMap,
  useMap,
  useMapsLibrary
} from '@vis.gl/react-google-maps'
import React, { useEffect, useState } from 'react'
import { fromAddress, setKey, setLanguage, setRegion } from 'react-geocode'
import css from './Map.module.scss'

// const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
const mapId = process.env.NEXT_PUBLIC_MAP_ID

const styles = fromModule(css)

export type MapProps = {
  zoom?: number
  center?: {lat: number; lng: number}
  onPlaceSelect?: (place: google.maps.places.PlaceResult | null) => void
  destination?: string
  activeTab?: string
  setActiveTab?: (tab: string) => void
  result?: google.maps.DirectionsResult
  setResult?: (result: google.maps.DirectionsResult) => void
}

export const Map: React.FC<MapProps> = ({
  zoom,
  onPlaceSelect,
  destination,
  result,
  setResult
}) => {
  const {user} = useUser()
  const [zoomLevel, setZoomLevel] = useState<number>(zoom || 8)
  const [center, setCenter] = useState<{lat: number; lng: number} | null>(null)
  const defaultCenter = {lat: 51.02735567847175, lng: 4.478807550388861}

  setKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string)
  setLanguage('nl')
  setRegion('be')

  useEffect(() => {
    if (!destination) return
    fromAddress(destination!).then(
      response => {
        const {lat, lng} = response.results[0].geometry.location
      },
      error => {
        console.error(error)
      }
    )
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
      navigator.geolocation.getCurrentPosition(
        position => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          setZoomLevel(15)
        },
        () => {
          setCenter({lat: defaultCenter.lat, lng: defaultCenter.lng})
        }
      )
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
          <Directions
            destination={destination}
            result={result}
            setResult={setResult}
          />
          {center.lat !== defaultCenter.lat &&
            center.lng !== defaultCenter.lng &&
            !destination && (
              <AdvancedMarker position={center}>
                <Icon icon="location" className={styles.icon()} />
              </AdvancedMarker>
            )}
        </GoogleMap>
      </div>
    </>
  )
}

export type DirectionsProps = {
  destination: string | undefined
  result?: google.maps.DirectionsResult
  setResult?: (result: google.maps.DirectionsResult) => void
}
const Directions: React.FC<DirectionsProps> = ({
  destination,
  result,
  setResult
}) => {
  const {user} = useUser()
  const map = useMap()
  const routesLibrary = useMapsLibrary('routes')
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>()
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>()
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([])

  useEffect(() => {
    if (!map || !routesLibrary) return
    setDirectionsService(new routesLibrary.DirectionsService())
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({map}))
  }, [routesLibrary, map])

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return

    if (destination)
      directionsService
        .route({
          origin:
            `${user?.street} ${user?.number}, ${user?.postal} ${user?.city}` ||
            '',
          destination: destination || '',
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true
        })
        .then(response => {
          directionsRenderer.setOptions({
            polylineOptions: {strokeColor: '#ED6A01', strokeWeight: 4}
          })
          directionsRenderer.setDirections(response)
          setRoutes(response.routes)

          if (response === result) return
          if (setResult) setResult(response)
        })
  }, [directionsService, directionsRenderer, destination])

  return null
}
