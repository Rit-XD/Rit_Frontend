'use client'
import {User} from '@/lib/user/User'
import {fetchUser} from '@/lib/user/fetchUser'
import {fromModule} from '@/utils/styler/Styler'
import {Suspense, useEffect, useState} from 'react'
import css from './Header.module.scss'

const styles = fromModule(css)

export const Header: React.FC = () => {
  const [user, setUser] = useState<User>()

  const loadUser = async () => {
    const user = await fetchUser()
    if (!user) return
    else setUser(user)
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <div>
      <div className={styles.header()}>
        {user?.carecenter.logo && (
          <img
            src={user.carecenter.logo}
            alt=""
            className={styles.header.logo()}
          />
        )}
        <h1 className={styles.header.title()}>{user?.carecenter.name || "Loading..."}</h1>
      </div>
      <hr className={styles.header.hr()} />
      </div>
  )
}
