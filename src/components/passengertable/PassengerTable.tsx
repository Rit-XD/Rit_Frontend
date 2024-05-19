import {fromModule} from '@/utils/styler/Styler'
import {supabaseAdmin} from '@/utils/supabase/supabaseAdmin'
import React from 'react'
import css from './PassengerTable.module.scss'

const styles = fromModule(css)

export const PassengerTable: React.FC = async () => {
  const {data: passengers, error} = await supabaseAdmin
    .from('Passengers')
    .select('*')

  function calculateAge(dateofbirth: string) {
    const birthDate = new Date(dateofbirth)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    return age
  }
  return (
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
            <td>
              {passengers.firstname} {passengers.lastname}
            </td>
            <td>{calculateAge(passengers.dateofbirth || '')}</td>
            <td>
              {passengers.emergency_contact} {passengers.emergency_relation}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
