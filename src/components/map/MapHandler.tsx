import {useMap} from '@vis.gl/react-google-maps'
import {useEffect} from 'react'

type Props = {
  place: google.maps.places.PlaceResult | null
}

export const MapHandler = ({place}: Props) => {
  const map = useMap()

  useEffect(() => {
    if (!map || !place) return

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport)
    }
  }, [map, place])

  return null
}
