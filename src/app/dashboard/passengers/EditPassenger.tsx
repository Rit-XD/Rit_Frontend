'use client'

import {fetchPassengers} from '@/components/planner/FetchPlanner'
import {useUser} from '@/lib/user/useUser'
import {Passenger} from '@/types/passenger.type'
import {Icon} from '@/ui/Icon'
import {fromModule} from '@/utils/styler/Styler'
import {useRouter} from 'next/navigation'
import React, {useEffect, useState} from 'react'
import {useFormState} from 'react-dom'
import css from './EditPassenger.module.scss'
import {handleEditPassenger} from './HandleEditPassenger'

const styles = fromModule(css)

export const EditPassenger: React.FC<{
  id: string
  onClose: () => void
}> = ({id, onClose}) => {
  const router = useRouter()
  const {user} = useUser();
  const [state, action] = useFormState(handleEditPassenger, {error: ''})
  const [passengers, setPassengers] = useState<Passenger[]>()
  const [editingPassenger, setEditingPassenger] = useState(
    null as Passenger | null
  )

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }
  const submit = async (formdata: FormData) => {
    formdata.append('passenger_id', editingPassenger!.id);
    action(formdata)
    onClose()
    router.replace('/dashboard/passengers')
  }

  //load all possible passengers
  const loadPassengers = async () => {
    if (passengers?.length) return
    setPassengers(await fetchPassengers(user!))
  }

  useEffect(() => {
    loadPassengers()
  }, [user])

  useEffect(() => {
    if (state.error) {
      console.error(state.error)
    }
  }, [id])

  useEffect(() => {
    const passenger = passengers?.find(p => p.id === id)
    if (passenger) {
      setEditingPassenger(passenger)
    }
  }, [id, passengers])

  return (
    <div className={styles.overlay()} onClick={handleOverlayClick}>
      <div className={styles.form_container()}>
        <form className={styles.form()} action={submit}>
          <h1 className={styles.form.title()}>Wijzig deze passagier</h1>
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
                value={editingPassenger?.firstname || ''}
                onChange={e => {
                  setEditingPassenger({
                    ...editingPassenger,
                    firstname: e.target.value
                  } as Passenger)
                }}
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
                value={passengers?.find(p => p.id === id)?.lastname}
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
                className={styles.form.input()}
                value={passengers?.find(p => p.id === id)?.dateofbirth || ''}
              />
            </div>
            <div className={styles.form.flexcol()}>
              <label>Noodcontactnummer:</label>
              <input
                type="text"
                id="emergency_contact"
                name="emergency_contact"
                placeholder="Noodcontactnummer"
                className={styles.form.input()}
                value={
                  passengers?.find(p => p.id === id)?.emergency_contact || ''
                }
              />
            </div>
            <div className={styles.form.flexcol()}>
              <label>Relatie noodcontact:</label>
              <input
                type="tel"
                id="emergency_relation"
                name="emergency_relation"
                placeholder="Relatie noodcontact"
                className={styles.form.input()}
                value={
                  passengers?.find(p => p.id === id)?.emergency_relation || ''
                }
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
              checked={passengers?.find(p => p.id === id)?.wheelchair}
            />
          </div>

          <label>Extra:</label>
          <input
            type="text"
            id="extra"
            name="extra"
            placeholder="Extra"
            className={styles.form.input()}
            value={passengers?.find(p => p.id === id)?.extra || ''}
          />
          {state.error && <p className={styles.form.error()}>{state.error}</p>}
          <button type="submit" className={styles.form.submit()}>
            Bewoner Wijzigen
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
