'use client'

import background from '@/../public/images/settingsBackground.png'
import {User} from '@/providers/user/User'
import {useUser} from '@/providers/user/useUser'
import {fromModule} from '@/utils/styler/Styler'
import Image from 'next/image'
import React, {useEffect, useState} from 'react'
import {useFormState} from 'react-dom'
import Avatar from './Avatar'
import {handleEditPassword, handleEditUser} from './HandleEditUser'
import {SettingsNav} from './SettingsNav'
import css from './SettingsTab.module.scss'

const styles = fromModule(css)

export const SettingsTab: React.FC = () => {
  const {user} = useUser()
  const [activeTab, setActiveTab] = useState('gegevens')
  const [state, action] = useFormState(handleEditUser, {error: ''})
  const [statePassword, actionPassword] = useFormState(handleEditPassword, {
    error: ''
  })
  const [editingUser, setEditingUser] = useState(null as User | null)
  const [editingPassword, setEditingPassword] = useState(null as User | null)

  const submit = async (formdata: FormData) => {
    action(formdata)
  }

  const submitPassword = async (formdataPassword: FormData) => {
    actionPassword(formdataPassword)
  }

  useEffect(() => {
    setEditingUser(user)
    setEditingPassword(user)
  }, [user])

  return (
    <div className={styles.container()}>
      <SettingsNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={styles.tabcontainer()}>
        <div className={styles.form()}>
          {activeTab === 'gegevens' && (
            // <div>
            //   <input type="file" />
            //   <img width={100} height={100} src={user?.logo || ''} alt="" />
            // </div>
            <form action={submit}>
              <Avatar
                uid={user?.id ?? null}
                url={user?.logo || ''}
                size={150}
                onUpload={() => {
                  console.log('uploaded')
                }}
              />
              <div className={styles.form.item()}>
                <label htmlFor="name">Naam</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={editingUser?.name || ''}
                  className={styles.form.input()}
                  disabled
                  //   onChange={e => {
                  //     setEditingUser({
                  //       ...editingUser,
                  //       name: e.target.value
                  //     } as User)
                  //   }}
                />
              </div>
              <div className={styles.form.flexrow()}>
                <div className={styles.form.item()}>
                  <label htmlFor="street">Straat</label>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    placeholder="Straatnaam"
                    value={editingUser?.street || ''}
                    className={styles.form.input()}
                    onChange={e => {
                      setEditingUser({
                        ...editingUser,
                        street: e.target.value
                      } as User)
                    }}
                  />
                </div>
                <div className={styles.form.item()}>
                  <label htmlFor="number">Huisnummer</label>
                  <input
                    id="number"
                    name="number"
                    type="text"
                    placeholder="Huisnummer"
                    value={editingUser?.number || ''}
                    className={styles.form.input()}
                    style={{width: '120px'}}
                    onChange={e => {
                      setEditingUser({
                        ...editingUser,
                        number: e.target.value
                      } as User)
                    }}
                  />
                </div>
              </div>
              <div className={styles.form.flexrow()}>
                <div className={styles.form.item()}>
                  <label htmlFor="city">Gemeente</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Gemeente"
                    value={editingUser?.city || ''}
                    className={styles.form.input()}
                    onChange={e => {
                      setEditingUser({
                        ...editingUser,
                        city: e.target.value
                      } as User)
                    }}
                  />
                </div>
                <div className={styles.form.item()}>
                  <label htmlFor="postal">Postcode</label>
                  <input
                    id="postal"
                    name="postal"
                    type="number"
                    placeholder="Postcode"
                    value={editingUser?.postal || ''}
                    className={styles.form.input()}
                    style={{width: '120px'}}
                    onChange={e => {
                      setEditingUser({
                        ...editingUser,
                        postal: Number(e.target.value)
                      } as User)
                    }}
                  />
                </div>
              </div>

              <div className={styles.form.item()}>
                <label htmlFor="phone">Telefoonnummer</label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Telefoonnummer"
                  value={editingUser?.phone || ''}
                  className={styles.form.input()}
                  onChange={e => {
                    setEditingUser({
                      ...editingUser,
                      phone: e.target.value
                    } as User)
                  }}
                />
              </div>

              <button type="submit" className={styles.form.submit()}>
                Opslaan
              </button>
            </form>
          )}
          {activeTab === 'wijzig_wachtwoord' && (
            <form action={submitPassword}>
              <div className={styles.form.item()}>
                <label htmlFor="oldPassword">Huidig wachtwoord</label>
                <input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  placeholder="Huidig wachtwoord"
                  className={styles.form.input()}
                  onChange={e => {
                    setEditingPassword({
                      ...editingPassword,
                      oldPassword: e.target.value
                    } as User)
                  }}
                />
              </div>
              <div className={styles.form.item()}>
                <label htmlFor="newPassword">Nieuw wachtwoord</label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="Nieuw wachtwoord"
                  className={styles.form.input()}
                  onChange={e => {
                    setEditingPassword({
                      ...editingPassword,
                      newPassword: e.target.value
                    } as User)
                  }}
                />
              </div>
              <div className={styles.form.item()}>
                <label htmlFor="confirmPassword">
                  Bevestig nieuw wachtwoord
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Bevestig nieuw wachtwoord"
                  className={styles.form.input()}
                  onChange={e => {
                    setEditingPassword({
                      ...editingPassword,
                      confirmPassword: e.target.value
                    } as User)
                  }}
                />
              </div>
              <button type="submit" className={styles.form.submit()}>
                Opslaan
              </button>
              {statePassword.error && (
                <p className={styles.form.error()}>{statePassword.error}</p>
              )}
            </form>
          )}
        </div>
      </div>
      <Image src={background} alt="knaker" className={styles.background()} />
    </div>
  )
}
