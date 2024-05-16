"use client"

import React from "react"
import css from './Planner.module.scss'
import { fromModule } from "@/utils/styler/Styler"
import { Map } from "../map/Map";

const styles = fromModule(css);

export const Planner: React.FC = () => {



    return (
    <div className={styles.container()}>
        <div className={styles.container.planner()}>
            <h3>Plan een rit</h3>
            <div className={styles.container.planner.inputs()}>
                <select name="passenger" id="select-passenger" className={styles.container.planner.inputs.input()}>
                    <option value="" selected disabled>Passagier toevoegen</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                </select>
                <input type="text" name="destination" id="input-destination" placeholder="Bestemming" className={styles.container.planner.inputs.input()}/>
                <input type="datetime-local" name="date" id="input-date" placeholder="Tijdstip" className={styles.container.planner.inputs.input()}/>
            </div>
            <div className={styles.container.planner.inputs()}>
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
    </div>
    )
}