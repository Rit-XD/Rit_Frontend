'use client'

import {fetchRides} from '@/components/upcoming/Upcoming.server'
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

const Context = createContext<{
  user: User | null
  setUser: (user: User) => void
  rides: Ride[]
  addRide: (ride: Ride) => void
  currentRide: Ride | null
  selectRide: (rideId: string) => void
  isLoading: boolean
}>({
  user: null,
  setUser: () => {},
  rides: [],
  addRide: () => {},
  currentRide: null,
  selectRide: () => {},
  isLoading: true
})

export const useUser = () => {
  const supabase = createSupabaseForBrowser()
  const {user, setUser, rides, addRide, isLoading, currentRide, selectRide} =
    useContext(Context)
  return {
    user,
    rides,
    setUser,
    addRide,
    currentRide,
    selectRide,
    isLoading
  }
}

export const UserProvider: React.FC<PropsWithChildren> = ({children}) => {
  const supabase = createSupabaseForBrowser()
  const [user, setUser] = useState<User | null>(null)
  const [rides, setRides] = useState<Ride[]>([])
  const [currentRide, setCurrentRide] = useState<Ride | null>(null)
  const [fetching, setFetching] = useState(false)
  const [isLoading, setIsloading] = useState(true)
  const pathname = usePathname()

  const loadUser = async () => {
    setFetching(true)

    const init = await fetchUser()
    setUser(init)

    setFetching(false)
  }
  const getRides = async () => {
    setFetching(true)

    const result = await fetchRides(user!)
    setRides(result)

    setFetching(false)
  }
  const addRide = (ride: Ride) => {
    setRides([...rides, ride])
  }
  const selectRide = (rideId: string) => {
    const ride = rides.find(r => r.id === rideId)
    setCurrentRide(ride || null)
  }

  useEffect(() => {
    if (fetching) return
    setIsloading(true)
    if (user) getRides()
    if (!user) loadUser()
    setIsloading(false)
  }, [pathname, user])

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        rides,
        addRide,
        currentRide,
        selectRide,
        isLoading
      }}
    >
      {children}
    </Context.Provider>
  )
}
