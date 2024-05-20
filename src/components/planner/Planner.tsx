'use client'

import Button from '@/ui/button/Button'
import {fromModule} from '@/utils/styler/Styler'
import React, {useEffect, useState} from 'react'
import {Map} from '../map/Map'
import css from './Planner.module.scss'
import {fetchPassengers} from './FetchPlanner'
import { Icon } from '@/ui/Icon'
import {postRide} from './PostRide'
import { createSupabaseForBrowser } from '@/utils/supabase/createSupabaseForBrowser'

const styles = fromModule(css)
const supabase = createSupabaseForBrowser();

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

    const [desination, setDestination] = useState<string>("");
    const [dateTime, setDateTime] = useState<string>("");

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
    const removeSelectedPassenger = (passenger: string) => {
        setSelectedPassengers(selectedPassengers.filter((selectedPassenger) => selectedPassenger !== passenger));
    }

    useEffect(() => {
        loadPassengers();
        // console.log("passengers", passengers);
    }, []);

    const handleNew = async () => { 
      console.log(dateTime);
      postRide(desination, "205c6e75-c379-49cf-9937-daa93cfd110a", dateTime, "ec2c1229-f7eb-4262-9398-661715e31b27");
     }


  return (
    <div className={styles.container()}>
      <div className={styles.container.planner()}>
        <h3>Plan een rit</h3>          

        <div className={styles.container.planner.inputs()}>
          {/* <select name="passenger" id="select-passenger" className={styles.container.planner.inputs.input()} onChange={(e)=>appendToArray(e.target.value)}> */}
          <div className={styles.container.planner.inputs.iconContainer()}>
            <select name="passenger" id="select-passenger" className={styles.container.planner.inputs.input()} defaultValue={""} onChange={(e) => selectPassenger(e.target.value)}>
              <option value="" disabled>
                Passagier toevoegen
              </option>
              {passengers?.map((passengers, index) => (
                  <option 
                    value={`${passengers.firstname} ${passengers.lastname}`} 
                    key={`${passengers.firstname} ${passengers.lastname}`}>
                      {passengers.firstname} {passengers.lastname}
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
            {selectedPassengers?.map((selectedPassengers, index) => (
                <div className={styles.container.planner.inputs.passenger()} key={selectedPassengers}>
                    <p>{selectedPassengers}</p>
                    <div onClick={() => removeSelectedPassenger(selectedPassengers)}>
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
          <Button onClick={() => handleNew()}>Plaats deze rit</Button>
        </div>
      </div>
      <div className={styles.container.map()}>
        <Map />
      </div>
    </div>
  )
}
