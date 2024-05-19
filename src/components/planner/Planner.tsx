'use client'

import Button from '@/ui/button/Button'
import {fromModule} from '@/utils/styler/Styler'
import React from 'react'
import {Map} from '../map/Map'
import css from './Planner.module.scss'

const styles = fromModule(css)

export const Planner: React.FC = () => {
    const [passengers, setPassengers] = React.useState<string[]>([]);

    const appendToArray = (nextElement: string) => {
        if (nextElement !== ""){
            const next_arr = [...passengers, nextElement];
            setPassengers(next_arr);
        }
      }
      const removeIndexFromArray = (index: number) => {
        const next_arr = [...passengers.slice(0, index), ...passengers.slice(index + 1)];
        setPassengers(next_arr);
      }

    return (
    <div className={styles.container()}>
        <div className={styles.container.planner()}>
            <h3>Plan een rit</h3>
            <div className={styles.container.planner.inputs()}>
                <select name="passenger" id="select-passenger" className={styles.container.planner.inputs.input()} onChange={(e)=>appendToArray(e.target.value)}>
                    <option value="" selected disabled>Passagier toevoegen</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <input type="text" name="destination" id="input-destination" placeholder="Bestemming" className={styles.container.planner.inputs.input()}/>
                <input type="datetime-local" name="date" id="input-date" placeholder="Tijdstip" className={styles.container.planner.inputs.input()}/>
            </div>
            <div className={styles.container.planner.inputs()}>
                <div>
                    {passengers.map((passenger, index) => 
                        <p>{passenger}</p>
                    )}
                </div>
                <div>
                    <div>
                    <input type="radio" name="routetype" id="routetype-both" className={styles.container.planner.inputs.radio()}/>
                    <label htmlFor="routetype-both">Heen- en terugrit</label>
                    </div>
                    <div>
                    <input type="radio" name="routetype" id="routetype-single" className={styles.container.planner.inputs.radio()}/>
                    <label htmlFor="routetype-single">Enkele rit</label>
                    </div>
                </div>
                <button className={styles.container.planner.inputs.button()}>Plaats deze rit</button>
            </div>
        </div>
        <div className={styles.container.map()}>
            <Map/>
        </div>
        <div>
            {passengers}
        </div>
    </div>
  )
}
