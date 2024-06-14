'use client'

import {fetchCars} from '@/providers/cars/fetchCars'
import {fetchRides} from '@/components/upcoming/Upcoming.server'
import {Car} from '@/types/car.type'
import {Ride} from '@/types/ride.type'
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

type UserType = {
  user: User | null
  setUser: (user: User) => void
  isLoading: boolean
}
const Context = createContext<UserType>({
  user: null,
  setUser: () => {},
  isLoading: true
})

export const useUser = () => {
  const supabase = createSupabaseForBrowser()
  const {user, setUser, isLoading, } = useContext(Context)

  return { user, setUser, isLoading }
}

export const UserProvider: React.FC<PropsWithChildren> = ({children}) => {
  const supabase = createSupabaseForBrowser()
  const [user, setUser] = useState<User | null>(null)
  const [fetching, setFetching] = useState(false)
  const [isLoading, setIsloading] = useState(true)
  const pathname = usePathname()

  const loadUser = async () => {
    setFetching(true)

    const init = await fetchUser()
    setUser(init)

    setFetching(false)
  }

  useEffect(() => {
    if (fetching || user) return
    setIsloading(true)
    loadUser()
    setIsloading(false)
  }, [pathname, user])

  return (
    <Context.Provider value={{ user, setUser, isLoading }} >
      {children}
    </Context.Provider>
  )
}
