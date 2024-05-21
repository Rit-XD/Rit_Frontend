'use client'

import {EditPassenger} from '@/app/dashboard/passengers/EditPassenger'
import {useUser} from '@/lib/user/useUser'
import {Icon} from '@/ui/Icon'
import {fromModule} from '@/utils/styler/Styler'
import React, {useEffect, useState} from 'react'
import {fetchPassengers} from '../planner/FetchPlanner'
import css from './PassengerTable.module.scss'

const styles = fromModule(css)

export const PassengerTable: React.FC<{
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
  const [isEditPassengerOpen, setEditPassengerOpen] = useState(false)

  const closeEditPassenger = () => {
    setEditPassengerOpen(false)
  }

  function calculateAge(dateofbirth: string) {
    const birthDate = new Date(dateofbirth)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const hasBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate())

    if (!hasBirthdayPassed) {
      age-- // Subtract 1 from age if the birthday hasn't passed yet
    }
    return age
  }

  const {user} = useUser()
  //load all possible passengers
  const loadPassengers = async () => {
    if (passengers?.length) return
    setPassengers(await fetchPassengers(user!))
  }
  useEffect(() => {
    loadPassengers()
  }, [user])

  return (
    <div className={styles.tableContainer()}>
      <table className={styles.table()}>
        <thead>
          <tr>
            <th>Naam</th>
            <th>Leeftijd</th>
            <th>Noodcontact</th>
          </tr>
        </thead>
        <tbody>
          {passengers?.map((passengers, index) => (
            <tr key={index}>
              <td className={styles.table.row()}>
                <div className={styles.table.flex()}>
                  {passengers.firstname} {passengers.lastname}
                  {passengers.wheelchair && (
                    <Icon className={styles.table.icon()} icon="wheelchair" />
                  )}
                </div>
              </td>
              <td className={styles.table.row()}>
                {calculateAge(passengers.dateofbirth || '')}
              </td>
              <td className={styles.table.row()}>
                {`${passengers.emergency_contact || '-'} (${
                  passengers.emergency_relation || ''
                })` || '-'}
              </td>
              <td
                onClick={() => setEditPassengerOpen(true)}
                className={styles.table.row()}
              >
                •••
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditPassengerOpen && <EditPassenger onClose={closeEditPassenger} />}
    </div>
  )
}
