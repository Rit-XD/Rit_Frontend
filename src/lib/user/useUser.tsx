'use client'

import {createSupabaseForBrowser} from '@/utils/supabase/createSupabaseForBrowser'
import {usePathname} from 'next/navigation'
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import {User} from './User'
import {fetchUser} from './fetchUser'

const Context = createContext<{
  user: User | null
  setUser: (user: User) => void
}>({
  user: null,
  setUser: () => {}
})

export const useUser = () => {
  const supabase = createSupabaseForBrowser()
  const {user, setUser} = useContext(Context)
  return {user}
}

export const UserProvider: React.FC<PropsWithChildren> = ({children}) => {
  const supabase = createSupabaseForBrowser()
  const [user, setUser] = useState<User | null>(null)
  const [fetching, setFetching] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (fetching || user) return

    setFetching(true)
    const loadUser = async () => {
      const init = await fetchUser()
      setUser(init)
      setFetching(false)
    }
    if (!user) loadUser()
  }, [pathname])

  return (
    <Context.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </Context.Provider>
  )
}
