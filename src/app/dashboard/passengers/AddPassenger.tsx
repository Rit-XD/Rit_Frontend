'use client'

import {Icon} from '@/ui/Icon'
import Button from '@/ui/button/Button'
import {fromModule} from '@/utils/styler/Styler'
import React from 'react'
import css from './AddPassenger.module.scss'
import {handleAddPassenger} from './HandleAddPassenger'

const styles = fromModule(css)

export const AddPassenger: React.FC<{
  onClose: () => void
}> = ({onClose}) => {
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

  const handleOverlayClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    onClose()
  }

  const handleContainerClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  return (
    <div className={styles.overlay()} onClick={handleOverlayClick}>
      <div className={styles.form_container()} onClick={handleContainerClick}>
        <form className={styles.form()}>
          <h1 className={styles.form.title()}>Voeg een passagier toe</h1>
          <div className={styles.form.flexrow()}>
            <div className={styles.form.flexcol()}>
              <label>Voornaam:</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                required
                className={styles.form.input()}
              />
            </div>
            <div className={styles.form.flexcol()}>
              <label>Achternaam:</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                required
                className={styles.form.input()}
              />
            </div>
          </div>
          <div className={styles.form.flexrow()}>
            <div className={styles.form.flexcol()}>
              <label>Geboortedatum:</label>
              <input
                type="date"
                id="dateofbirth"
                name="dateofbirth"
                required
                className={styles.form.input()}
              />
            </div>
            <div className={styles.form.flexcol()}>
              <label>Noodcontactnummer:</label>
              <input
                type="text"
                id="emergency_contact"
                name="emergency_contact"
                required
                className={styles.form.input()}
              />
            </div>
            <div className={styles.form.flexcol()}>
              <label>Relatie noodcontact:</label>
              <input
                type="tel"
                id="emergency_relation"
                name="emergency_relation"
                required
                className={styles.form.input()}
              />
            </div>
          </div>
          <div className={styles.form.flexrow()}>
            <label htmlFor="wheelchair">Rolstoel:</label>
            <input
              type="checkbox"
              id="wheelchair"
              name="wheelchair"
              required
              className={styles.form.input()}
            />
          </div>

          <label>Extra:</label>
          <input
            type="text"
            id="extra"
            name="extra"
            required
            className={styles.form.input()}
          />

          <Button
            className={styles.form.submit()}
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
          <div className={styles.form.close()}>
            <Close onClick={onClose} />
          </div>
        </form>
      </div>
    </div>
  )
}

export const Close: React.FC<{onClick: () => void}> = ({onClick}) => (
  <button onClick={onClick}>
    <Icon icon="xmark" />
  </button>
)
