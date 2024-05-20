'use client'

import {PassengerTable} from '@/components/passengertable/PassengerTable'
import {Icon} from '@/ui/Icon'
import Button from '@/ui/button/Button'
import {fromModule} from '@/utils/styler/Styler'
import {useState} from 'react'
import {AddPassenger} from './AddPassenger'
import css from './Passengers.module.scss'

export const PassengersHeader: React.FC<{
  passengers: any
}> = ({passengers}) => {
  const [isAddPassengerOpen, setAddPassengerOpen] = useState(false)

  const openAddPassenger = () => {
    setAddPassengerOpen(true)
  }

  const closeAddPassenger = () => {
    setAddPassengerOpen(false)
  }

  const styles = fromModule(css)

  return (
    <main>
      <div className={styles.container()}>
        <div className={styles.container.leftside()}>
          <p className={styles.container.leftside.tab()}>
            {`Passagiers (${passengers?.length})`}
          </p>
          <p>{`Archief (0)`}</p>
        </div>
        <div className={styles.container.rightside()}>
          <input type="text" placeholder="Zoek naam" />
          <Icon className={styles.container.rightside.search()} icon="search" />
          <Button onClick={openAddPassenger} iconbefore="plus">
            Nieuwe Passagier
          </Button>
          {isAddPassengerOpen && (
            <AddPassenger
            // onClose={closeAddPassenger}
            />
          )}
        </div>
      </div>
      <PassengerTable />
    </main>
  )
}
