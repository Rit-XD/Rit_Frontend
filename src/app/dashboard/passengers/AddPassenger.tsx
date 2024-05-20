'use client'

import Button from '@/ui/button/Button'
import {fromModule} from '@/utils/styler/Styler'
import React from 'react'
import css from './AddPassenger.module.scss'
import {handleAddPassenger} from './HandleAddPassenger'

const styles = fromModule(css)

export const AddPassenger: React.FC = () => {
  const firstname = document.getElementById('firstname') as HTMLInputElement
  const lastname = document.getElementById('lastname') as HTMLInputElement
  const dateofbirth = document.getElementById('dateofbirth') as HTMLInputElement
  const emergency_contact = document.getElementById(
    'emergency_contact'
  ) as HTMLInputElement
  const emergency_relation = document.getElementById(
    'emergency_relation'
  ) as HTMLInputElement
  const wheelchair = document.getElementById('wheelchair') as HTMLInputElement
  const extra = document.getElementById('extra') as HTMLInputElement
  return (
    <div className={styles.overlay()}>
      <div className={styles.form_container()}>
        <form className={styles.form()}>
          <label>Voornaam:</label>
          <input type="text" id="firstname" name="firstname" required />

          <label>Achternaam:</label>
          <input type="text" id="lastname" name="lastname" required />

          <label>Geboortedatum:</label>
          <input type="date" id="dateofbirth" name="dateofbirth" required />

          <label>Emergency Contact:</label>
          <input
            type="text"
            id="emergency_contact"
            name="emergency_contact"
            required
          />

          <label>Noodcontact:</label>
          <input
            type="tel"
            id="emergency_relation"
            name="emergency_relation"
            required
          />

          <label>Rolstoel:</label>
          <input type="checkbox" id="wheelchair" name="wheelchair" />

          <label>Speciale noden:</label>
          <input id="needs" name="needs" />

          <label>Extra:</label>
          <input type="text" id="extra" name="extra" />

          <Button
            onClick={() =>
              handleAddPassenger(
                firstname.value,
                lastname.value,
                dateofbirth.value,
                emergency_contact.value,
                emergency_relation.value,
                wheelchair.checked,
                extra.value
              )
            }
            type="submit"
          >
            Bewoner Toevoegen
          </Button>
        </form>
      </div>
    </div>
  )
}
