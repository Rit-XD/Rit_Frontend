'use client'

import { useUser } from '@/lib/user/useUser'
import { Passenger } from '@/types/passenger.type'
import { Icon } from '@/ui/Icon'
import Button from '@/ui/button/Button'
import { fromModule } from '@/utils/styler/Styler'
import React, { useEffect, useState } from 'react'
import { fetchPassengers } from './FetchPlanner'
import css from './Planner.module.scss'
import { postRide } from './PostRide'
import { APIProvider } from '@vis.gl/react-google-maps'
import { Autocomplete } from '../map/Autocomplete'
import { Map } from '../map/Map'
import { MapHandler } from '../map/MapHandler'
import { DatePicker } from "@nextui-org/date-picker"
import { now, getLocalTimeZone } from "@internationalized/date"
import { Select, SelectItem } from '@nextui-org/react'


const styles = fromModule(css)

export const Planner: React.FC<{
  initial: {
    carecenter_id: string
    dateofbirth: string | null
    emergency_contact: string | null
    emergency_relation: string | null
    extra: string | null
    firstname: string
    id: string
    lastname: string
    wheelchair: boolean
  }[]
}> = ({initial}) => {
  const [passengers, setPassengers] = useState<typeof initial>()
  const [selectedPassengers, setSelectedPassengers] = useState<typeof initial>(
    []
  )

  const [destination, setDestination] = useState<string>('')
  const [dateTime, setDateTime] = useState<string>('')

  const {user, addRide} = useUser()
  //load all possible passengers
  const loadPassengers = async () => {
    if (passengers?.length) return
    setPassengers(await fetchPassengers(user!))
  }
  useEffect(() => {
    loadPassengers()
  }, [user])

  //maintain selected passengers
  const selectPassenger = (passengerId: string) => {
    const p: Passenger = passengers!.find(p => p.id === passengerId)!
    if (selectedPassengers!.includes(p)) {
      return
    }
    setSelectedPassengers([...selectedPassengers!, p])
  }
  
  const removeSelectedPassenger = (passengerId: string) => {
    const p: Passenger = passengers!.find(p => p.id === passengerId)!
    setSelectedPassengers(
      selectedPassengers.filter(selectedPassenger => selectedPassenger !== p)
    )
  }

  //handle submit
  const handlesubmit = async () => {
    let origin =
      user!.street + ' ' + user!.number + ', ' + user!.postal + ' ' + user!.city
    postRide(
      user!.id,
      origin,
      destination,
      'ea2251ed-98f6-4d9c-bbb3-17c7ea2a71a7',
      dateTime,
      selectedPassengers[0].id,
      selectedPassengers[1]?.id
    ).then(res => {
      if (res?.status === 201) addRide(res!.data![0])
    })
  }

  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
  const [selectedPlace, setSelectedPlace] =
  useState<google.maps.places.PlaceResult | null>(null)

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    setSelectedPlace(place)

  }

  useEffect(() => {
    if (selectedPlace) handlePlaceSelect(selectedPlace)
  }, [selectedPlace])

  return (
    <APIProvider apiKey={key}>
      <div className={styles.container()}>
        <div className={styles.container.planner()}>
          <h3 className={styles.container.planner.title()}>Plan een rit</h3>
          <div className={styles.container.planner.inputs()}>
            {/* <div className={styles.container.planner.inputs.iconContainer()}>
              <select
                name="passenger"
                id="select-passenger"
                className={styles.container.planner.inputs.input()}
                defaultValue={''}
                onChange={e => selectPassenger(e.target.value)}
                disabled={selectedPassengers.length >= 2}
              >
                <option value="" disabled>
                  Passagier toevoegen
                </option>
                {passengers?.map((passenger, index) => (
                  <option value={passenger.id} key={passenger.id}>
                    {passenger.firstname} {passenger.lastname}
                  </option>
                ))}
              </select>
              <Icon
                icon="dropdown"
                className={styles.container.planner.inputs.iconContainer.icon()}
              />
            </div> */}
              <Select
                items={passengers?.length? passengers : [{id: "1", firstname: "Passagiers aan het ", lastname: "inladen...", wheelchair: false, carecenter_id: "", dateofbirth: "", emergency_contact: "", emergency_relation: "", extra: ""}]}
                aria-label="Passengers"
                placeholder="Select a passenger"
                className="max-w-xs"
                onChange={(e) => selectPassenger(e.target.value)}
                classNames={{
                  base: styles.select(),
                  listbox: styles.select.listbox(),
                }}
              >
                {(passenger) => <SelectItem key={passenger.id} value={passenger.id}>{passenger.firstname} {passenger.lastname}</SelectItem>}
              </Select>
            {/* <input
              type="text"
              name="destination"
              id="input-destination"
              placeholder="Bestemming"
              className={styles.container.planner.inputs.input()}
              onChange={e => setDestination(e.target.value)}
            /> */}
            <div className={styles.container.planner.autocomplete()}>
            <Autocomplete
              onPlaceSelect={place => {
                setSelectedPlace(place)
                if (place) {
                  handlePlaceSelect(place)
                  setDestination(place.formatted_address!)
                }
              }}
              
              />
              </div>
            {/* <div className={styles.container.planner.inputs.iconContainer()}> */}
              {/* <input
                type="datetime-local"
                name="date"
                id="input-date"
                placeholder="Tijdstip"
                className={styles.container.planner.inputs.input()}
                onChange={e => {
                  setDateTime(e.target.value)
                  console.log('e', e.target.value)
                }}
              /> */}
              <div suppressHydrationWarning={true}>
              <DatePicker 
                aria-label="timestamp"
                hourCycle={24}  
                hideTimeZone 
                showMonthAndYearPickers 
                defaultValue={now(getLocalTimeZone()).add({ hours: 2 })} 
                onChange={(date) => {setDateTime(date.toString().split("[")[0])}} 
                minValue={now(getLocalTimeZone()).add({ hours: 1 })}
                classNames={{ 
                  base: styles.base(), 
                  selectorIcon: styles.input.field(), 
                  calendar: styles.calendar(),
                }}
              />
              </div>
            {/* </div> */}
          </div>
          <div className={styles.container.planner.inputs()}>
            <div>
              {selectedPassengers.map((selectedPassenger, index) => (
                <div
                  className={styles.container.planner.inputs.passenger()}
                  key={selectedPassenger.id}
                >
                  <p>
                    {selectedPassenger.firstname} {selectedPassenger.lastname}  {selectedPassenger.wheelchair && (
                    <Icon className={styles.container.planner.inputs.passenger.icon()} icon="wheelchair" />
                  )}
                  </p>
                  <div
                    onClick={() => removeSelectedPassenger(selectedPassenger.id)}
                  >
                    <div />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div>
                <input
                  type="radio"
                  name="routetype"
                  id="routetype-both"
                  className={styles.container.planner.inputs.radio()}
                />
                <label htmlFor="routetype-both">Heen- en terugrit</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="routetype"
                  id="routetype-single"
                  className={styles.container.planner.inputs.radio()}
                />
                <label htmlFor="routetype-single">Enkele rit</label>
              </div>
            </div>
            {/* <button className={styles.container.planner.inputs.button()}>Plaats deze rit</button> */}
            <Button onClick={handlesubmit}>Plaats deze rit</Button>
          </div>
        </div>
        <div className={styles.container.map()}>
          <Map zoom={15} destination={destination}/>
          <MapHandler place={selectedPlace} />
        </div>
      </div>
    </APIProvider>
  )
}
