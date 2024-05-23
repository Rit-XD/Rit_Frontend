'use client'

import {fetchPassengers} from '@/components/planner/FetchPlanner'
import {useUser} from '@/lib/user/useUser'
import {Passenger} from '@/types/passenger.type'
import {Icon} from '@/ui/Icon'
import Button from '@/ui/button/Button'
import {fromModule} from '@/utils/styler/Styler'
import {useEffect, useState} from 'react'
import {AddPassenger} from './AddPassenger'
import css from './Passengers.module.scss'

const styles = fromModule(css)

export const PassengersHeader: React.FC = () => {
  const [isAddPassengerOpen, setAddPassengerOpen] = useState(false)
  const [passengers, setPassengers] = useState<Passenger[]>()
  const [refreshKey, setRefreshKey] = useState(0)

  const closeAddPassenger = () => {
    setAddPassengerOpen(false)
    setRefreshKey(oldKey => oldKey + 1)
  }

  const {user} = useUser()
  //get all passengers
  const getPassengers = async () => {
    const p: Passenger[] = await fetchPassengers(user!)
    if (p) {
      setPassengers(p)
    }
  }
  useEffect(() => {
    if (user) getPassengers();
  }, [user, refreshKey])

  return (
    <div className={styles.container()}>
      <div className={styles.container.leftside()}>
        <p className={styles.container.leftside.tab()}>
         Passagiers ({passengers?.length || '0'})
        </p>
        <p>Archief ({0})</p>
      </div>
      <div className={styles.container.rightside()}>
        <input
          className={styles.container.rightside.input()}
          type="text"
          placeholder="Zoek naam"
        />
        <Icon className={styles.container.rightside.search()} icon="search" />
        <Button onClick={() => setAddPassengerOpen(true)} iconbefore="plus">
          Nieuwe Passagier
        </Button>
        {isAddPassengerOpen && <AddPassenger onClose={closeAddPassenger} />}
      </div>
    </div>
  )
}
