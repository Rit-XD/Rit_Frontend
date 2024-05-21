'use client'

import {fetchPassengers} from '@/components/planner/FetchPlanner'
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

  const closeAddPassenger = () => {
    setAddPassengerOpen(false)
  }

  //get all passengers
  const getPassengers = async () => {
    const p: Passenger[] = await fetchPassengers()
    console.log('p', p)
    if (p) {
      setPassengers(p)
    }
  }
  useEffect(() => {
    getPassengers()
  }, [])

  return (
    <main>
      <div className={styles.container()}>
        <div className={styles.container.leftside()}>
          {passengers?.length === 0 ? (
            <p>0</p>
          ) : (
            <p className={styles.container.leftside.tab()}>
              {`Passagiers (${passengers?.length ?? 0})`}
            </p>
          )}
          <p>{`Archief (0)`}</p>
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
    </main>
  )
}
