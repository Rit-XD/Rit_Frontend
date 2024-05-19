import {fetchUser} from '@/lib/user/fetchUser'
import {fromModule} from '@/utils/styler/Styler'
import {supabaseAdmin} from '@/utils/supabase/supabaseAdmin'
import React from 'react'
import css from './PassengerTable.module.scss'

const styles = fromModule(css)

export const PassengerTable: React.FC = async () => {
  const getUser = async () => {
    const user = await fetchUser()
    return user
  }

  const user = await getUser()
  if (!user) return

  const {data: passengers, error} = await supabaseAdmin
    .from('Passengers')
    .select('*')
    .eq('carecenter_id', user?._id)

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
