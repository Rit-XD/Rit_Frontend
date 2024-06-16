'use client'

import {Icon} from '@/ui/Icon'
import {fromModule} from '@/utils/styler/Styler'
import {useRouter} from 'next/navigation'
import React from 'react'
import {useFormState} from 'react-dom'
import css from './AddPassenger.module.scss'
import {handleAddPassenger} from './HandleAddPassenger'

const styles = fromModule(css)

export const AddPassenger: React.FC<{
  onClose: () => void
}> = ({onClose}) => {
  const router = useRouter()
  const [state, action] = useFormState(handleAddPassenger, {error: ''})

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === document.querySelector('[data-slot="overlay"]')) {
      onClose()
    }
  }
  const submit = async (formdata: FormData) => {
    action(formdata)
    window.location.href = '/dashboard/passengers'
    }


  return (
    <div className={styles.overlay()} onMouseDown={handleOverlayClick}  data-slot="overlay">
      <div className={styles.form_container()}>
        <form className={styles.form()} action={submit}>
          <h1 className={styles.form.title()}>Voeg een passagier toe</h1>
          <div className={styles.form.flexrow()}>
            <div className={styles.form.flexcol()}>
              <label>Voornaam:</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="Voornaam"
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
                placeholder="Achternaam"
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
                placeholder="Geboortedatum"
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
                placeholder="Noodcontactnummer"
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
                placeholder="Relatie noodcontact"
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
              className={styles.form.input()}
            />
          </div>

          <label>Extra:</label>
          <input
            type="text"
            id="extra"
            name="extra"
            placeholder="Extra"
            className={styles.form.input()}
          />
          {state.error && <p className={styles.form.error()}>{state.error}</p>}
          <button type="submit" className={styles.form.submit()}>
            Bewoner Toevoegen
          </button>
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
