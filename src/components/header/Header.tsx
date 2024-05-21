'use client'
import {User} from '@/lib/user/User'
import {fetchUser} from '@/lib/user/fetchUser'
import {fromModule} from '@/utils/styler/Styler'
import {Suspense, use, useEffect, useState} from 'react'
import css from './Header.module.scss'
import { useUser } from '@/lib/user/useUser'

const styles = fromModule(css)

export const Header: React.FC = () => {

  const {user} = useUser();

  return (
    <div>
      <div className={styles.header()}>
        {user?.logo && (
          <img
            src={user.logo}
            alt=""
            className={styles.header.logo()}
          />
        )}
        <h1 className={styles.header.title()}>{user?.name || "Loading..."}</h1>
      </div>
      <hr className={styles.header.hr()} />
      </div>
  )
}
