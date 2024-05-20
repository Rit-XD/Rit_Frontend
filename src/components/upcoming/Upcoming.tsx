'use client'

import Button from '@/ui/button/Button'
import {fromModule} from '@/utils/styler/Styler'
import React, {useEffect, useState} from 'react'
import {Map} from '../map/Map'
import css from './Upcoming.module.scss'
import {fetchPassengers} from './FetchPlanner'
import { Icon } from '@/ui/Icon'

const styles = fromModule(css)
type Passenger = {          
  carecenter_id: string
  dateofbirth: string | null
  emergency_contact: string | null
  emergency_relation: string | null
  extra: string | null
  firstname: string
  id: string
  lastname: string
  wheelchair: boolean
}


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

    const [desination, setDestination] = useState<string>("");
    const [dateTime, setDateTime] = useState<string>("");

    //load all possible passengers
    const loadPassengers = async () => {
        if (passengers?.length) return;
        setPassengers(await fetchPassengers());
    }
    useEffect(() => {
      loadPassengers();
    }, []);




  return (
    <div className={styles.container()}>

    </div>
  )
}
