'use client'

import Button from '@/ui/button/Button'
import {fromModule} from '@/utils/styler/Styler'
import React, {useEffect, useState} from 'react'
import {Map} from '../map/Map'
import css from './Planner.module.scss'
import {fetchPassengers} from './FetchPlanner'

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
    const [selectedPassengers, setSelectedPassengers] = useState<string[]>([]);
    const loadPassengers = async () => {
        if (passengers?.length) return;
        setPassengers(await fetchPassengers());
    }
    const selectPassenger = (passenger: string) => {
        if (selectedPassengers!.includes(passenger)) {
            return;
        }
        setSelectedPassengers([...selectedPassengers!, passenger]);
    }
    useEffect(() => {
        loadPassengers();
        // console.log("passengers", passengers);
    }, []);


  return (
    <div className={styles.container()}>
      <div className={styles.container.planner()}>
        <h3>Plan een rit</h3>
        <div className={styles.container.planner.inputs()}>
          {/* <select name="passenger" id="select-passenger" className={styles.container.planner.inputs.input()} onChange={(e)=>appendToArray(e.target.value)}> */}
          <select name="passenger" id="select-passenger" className={styles.container.planner.inputs.input()} defaultValue={""} onChange={(e) => selectPassenger(e.target.value)}>
            <option value="" disabled>
              Passagier toevoegen
            </option>
            {passengers?.map((passengers, index) => (
                <option value={`${passengers.firstname} ${passengers.lastname}`} key={`${passengers.firstname} ${passengers.lastname}`}>{passengers.firstname} {passengers.lastname}</option>
            ))}
          </select>
          <input
            type="text"
            name="destination"
            id="input-destination"
            placeholder="Bestemming"
            className={styles.container.planner.inputs.input()}
          />
          <input
            type="datetime-local"
            name="date"
            id="input-date"
            placeholder="Tijdstip"
            className={styles.container.planner.inputs.input()}
          />
        </div>
        <div className={styles.container.planner.inputs()}>
          <div>
            {selectedPassengers?.map((selectedPassengers, index) => (
                <div className={styles.container.planner.inputs.passenger()}>
                    <p>{selectedPassengers}</p>
                    <div/>
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
          <Button>Plaats deze rit</Button>
        </div>
      </div>
      <div className={styles.container.map()}>
        <Map />
      </div>
    </div>
  )
}
