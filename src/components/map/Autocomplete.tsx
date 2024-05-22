import {fromModule} from '@/utils/styler/Styler'
import {useMapsLibrary} from '@vis.gl/react-google-maps'
import {useEffect, useRef, useState} from 'react'
import css from './Map.module.scss'

const styles = fromModule(css)

interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void
}

export const Autocomplete = ({onPlaceSelect}: Props) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const places = useMapsLibrary('places')

  useEffect(() => {
    if (!places || !inputRef.current) return

    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
      componentRestrictions: {country: 'be'}
    }

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options))
  }, [places])

  useEffect(() => {
    if (!placeAutocomplete) return

    placeAutocomplete.addListener('place_changed', () => {
      onPlaceSelect(placeAutocomplete.getPlace())
    })
  }, [onPlaceSelect, placeAutocomplete])

  return (
    <div>
      <input type="search" ref={inputRef} placeholder="Bestemming" />
    </div>
  )
}
