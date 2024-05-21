'use client'

import Button from '@/ui/button/Button'
import {fromModule} from '@/utils/styler/Styler'
import React, {Suspense, useEffect, useState} from 'react'
import {Map} from '../map/Map'
import css from './Planner.module.scss'
import {fetchPassengers} from './FetchPlanner'
import { Icon } from '@/ui/Icon'
import {postRide} from './PostRide'
import { Passenger } from '@/types/passenger.type'
import { useUser } from '@/lib/user/useUser'
import { Loader } from '@/ui/loader/Loader'

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
    const [passengers, setPassengers] = useState<typeof initial>();
    const [selectedPassengers, setSelectedPassengers] = useState<typeof initial>([]);

    const [destination, setDestination] = useState<string>("");
    const [dateTime, setDateTime] = useState<string>("");

    const {user} = useUser();
    //load all possible passengers
    const loadPassengers = async () => {
        if (passengers?.length) return;
        setPassengers(await fetchPassengers(user!));
    }
    useEffect(() => {
      loadPassengers();
    }, [user]);

    //maintain selected passengers
    const selectPassenger = (passengerId: string) => {
      const p: Passenger = passengers!.find((p) => p.id === passengerId)!; 
      if (selectedPassengers!.includes(p)) {
        return;
      }
      setSelectedPassengers([...selectedPassengers!, p]);
    }
    const removeSelectedPassenger = (passengerId: string) => {
      const p: Passenger = passengers!.find((p) => p.id === passengerId)!;
        setSelectedPassengers(selectedPassengers.filter((selectedPassenger) => selectedPassenger !== p));
    }

    //handle submit
    const handlesubmit = async () => { 
      let origin = user!.street + ' ' + user!.number + ', ' + user!.postal + ' ' + user!.city;
      postRide(user!.id, origin, destination, "ea2251ed-98f6-4d9c-bbb3-17c7ea2a71a7", dateTime, selectedPassengers[0].id, selectedPassengers[1]?.id).then((res) => {
      });
    }


  return (
    <div className={styles.container()}>
      <div className={styles.container.planner()}>
        <h3 className={styles.container.planner.title()}>Plan een rit</h3>          
        <div className={styles.container.planner.inputs()}>
          {/* <select name="passenger" id="select-passenger" className={styles.container.planner.inputs.input()} onChange={(e)=>appendToArray(e.target.value)}> */}
          <div className={styles.container.planner.inputs.iconContainer()}>
            <select name="passenger" id="select-passenger" className={styles.container.planner.inputs.input()} defaultValue={""} onChange={(e) => selectPassenger(e.target.value)}>
              <option value="" disabled>
                Passagier toevoegen
              </option>
              {passengers?.map((passenger, index) => (
                  <option 
                    value={passenger.id} 
                    key={passenger.id}>
                      {passenger.firstname} {passenger.lastname}
                  </option>
              ))}
            </select>
            <Icon icon="dropdown"  className={styles.container.planner.inputs.iconContainer.icon()}/>
          </div>

          <input
            type="text"
            name="destination"
            id="input-destination"
            placeholder="Bestemming"
            className={styles.container.planner.inputs.input()}
            onChange={(e) => setDestination(e.target.value)}
          />
          <div className={styles.container.planner.inputs.iconContainer()}>
            <input
              type="datetime-local"
              name="date"
              id="input-date"
              placeholder="Tijdstip"
              className={styles.container.planner.inputs.input()}
              onChange={(e) => {setDateTime(e.target.value); console.log("e",e.target.value)}}
            />
            <Icon icon="calendar"  className={styles.container.planner.inputs.iconContainer.icon.calendar()}/>

          </div>
        </div>
        <div className={styles.container.planner.inputs()}>
          <div>
            {selectedPassengers.map((selectedPassenger, index) => (
                <div className={styles.container.planner.inputs.passenger()} key={selectedPassenger.id}>
                    <p>{selectedPassenger.firstname} {selectedPassenger.lastname}</p>
                    <div onClick={() => removeSelectedPassenger(selectedPassenger.id)}>
                      <div/>
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
        <Map />
      </div>
    </div>
  )
}
