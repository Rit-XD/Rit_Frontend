'use client'

import {fetchPassengers} from '@/components/planner/FetchPlanner'
import {useUser} from '@/lib/user/useUser'
import {Passenger} from '@/types/passenger.type'
import {Icon} from '@/ui/Icon'
import Button from '@/ui/button/Button'
import {fromModule} from '@/utils/styler/Styler'
import {useRouter} from 'next/navigation'
import React, {useEffect, useState} from 'react'
import {useFormState} from 'react-dom'
import css from './EditPassenger.module.scss'
import {handleDeletePassenger} from './HandleDeletePassenger'
import {handleEditPassenger} from './HandleEditPassenger'

const styles = fromModule(css)

export const EditPassenger: React.FC<{
  id: string
  onClose: () => void
}> = ({id, onClose}) => {
  const router = useRouter()
  const {user} = useUser()
  const [state, action] = useFormState(handleEditPassenger, {error: ''})
  const [passengers, setPassengers] = useState<Passenger[]>()
  const [editingPassenger, setEditingPassenger] = useState(
    null as Passenger | null
  )
  const [showDeleteCheck, setShowDeleteCheck] = useState(false)

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === document.querySelector('[data-slot="overlay"]')) {
      onClose()
    }
  }
  const submit = async (formdata: FormData) => {
    formdata.append('passenger_id', editingPassenger!.id)
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
    <div
      className={styles.overlay()}
      onMouseDown={handleOverlayClick}
      data-slot="overlay"
    >
      {!showDeleteCheck && (
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
                  value={editingPassenger?.firstname}
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
                  value={editingPassenger?.lastname}
                  onChange={e => {
                    setEditingPassenger({
                      ...editingPassenger,
                      lastname: e.target.value
                    } as Passenger)
                  }}
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
                  value={editingPassenger?.dateofbirth || ''}
                  onChange={e => {
                    setEditingPassenger({
                      ...editingPassenger,
                      dateofbirth: e.target.value
                    } as Passenger)
                  }}
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
                  value={editingPassenger?.emergency_contact || ''}
                  onChange={e => {
                    setEditingPassenger({
                      ...editingPassenger,
                      emergency_contact: e.target.value
                    } as Passenger)
                  }}
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
                  value={editingPassenger?.emergency_relation || ''}
                  onChange={e => {
                    setEditingPassenger({
                      ...editingPassenger,
                      emergency_relation: e.target.value
                    } as Passenger)
                  }}
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
                checked={editingPassenger?.wheelchair || false}
                onChange={e => {
                  setEditingPassenger({
                    ...editingPassenger,
                    wheelchair: e.target.checked
                  } as Passenger)
                }}
              />
            </div>

            <label>Extra:</label>
            <input
              type="text"
              id="extra"
              name="extra"
              placeholder="Extra"
              className={styles.form.input()}
              value={editingPassenger?.extra || ''}
              onChange={e => {
                setEditingPassenger({
                  ...editingPassenger,
                  extra: e.target.value
                } as Passenger)
              }}
            />
            {state.error && (
              <p className={styles.form.error()}>{state.error}</p>
            )}
            <button type="submit" className={styles.form.submit()}>
              Bewoner Wijzigen
            </button>

            <Button
              mod={'outline'}
              className={styles.delete()}
              onClick={() => {
                setShowDeleteCheck(true)
              }}
            >
              Verwijderen
            </Button>

            <div className={styles.form.close()}>
              <Close onClick={onClose} />
            </div>
          </form>
        </div>
      )}
      {showDeleteCheck && (
        <DeleteCheck
          id={editingPassenger!.id}
          onClose={() => setShowDeleteCheck(false)}
        />
      )}
    </div>
  )
}

export const Close: React.FC<{onClick: () => void}> = ({onClick}) => (
  <button onClick={onClick}>
    <Icon icon="xmark" />
  </button>
)

export const DeleteCheck: React.FC<{
  id: string
  onClose: () => void
}> = ({id, onClose}) => {
  const router = useRouter()
  const {user} = useUser()
  const [state, action] = useFormState(handleDeletePassenger, {error: ''})
  const [passengers, setPassengers] = useState<Passenger[]>()
  const [editingPassenger, setEditingPassenger] = useState(
    null as Passenger | null
  )

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === document.querySelector('[data-slot="overlay"]')) {
      onClose()
    }
  }
  const submit = async (formdata: FormData) => {
    formdata.append('passenger_id', editingPassenger!.id)
    action(formdata.toString())
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
    <div
      className={styles.overlay()}
      onMouseDown={handleOverlayClick}
      data-slot="overlay"
    >
      <div className={styles.form_container()}>
        <form className={styles.form()} action={submit}>
          <h1 className={styles.form.title()}>
            Weet je zeker dat je{' '}
            <span className={styles.orange()}>
              {editingPassenger?.firstname} {editingPassenger?.lastname}
            </span>{' '}
            wilt verwijderen?
          </h1>
          <p className={styles.form.warning()}>
            Deze actie kan niet ongedaan worden gemaakt.
          </p>
          {state.error && <p className={styles.form.error()}>{state.error}</p>}
          <Button
            className={styles.delete()}
            onClick={() =>
              handleDeletePassenger({error: ''}, editingPassenger!.id)
                .then(() => onClose())
                .then(() => (window.location.href = '/dashboard/passengers'))
            }
          >
            Verwijderen
          </Button>
          <div className={styles.form.close()}>
            <Close onClick={onClose} />
          </div>
        </form>
      </div>
    </div>
  )
}
