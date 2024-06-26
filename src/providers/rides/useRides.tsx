'use client'

import {Ride} from '@/types/ride.type'
import {createSupabaseForBrowser} from '@/utils/supabase/createSupabaseForBrowser'
import {usePathname} from 'next/navigation'
import React, {PropsWithChildren, createContext, useContext, useEffect, useState} from 'react'
import {useUser} from '../user/useUser'
import {deleteRide, fetchRides} from './fetchRides'

type RidesType = {
  rides: Ride[]
  addRide: (ride: Ride) => void
  currentRide: Ride | null
  selectRide: (rideId: string) => void
  isLoading: boolean
  handleDeleteRide: (rideId: string) => void
}

const Context = createContext<RidesType>({
  rides: [],
  addRide: () => {},
  currentRide: null,
  selectRide: () => {},
  isLoading: true,
  handleDeleteRide: () => {}
})

export const useRides = () => {
  const supabase = createSupabaseForBrowser()
  const {rides, addRide, isLoading, currentRide, selectRide, handleDeleteRide} = useContext(Context)

  return {rides, addRide, currentRide, selectRide, isLoading, handleDeleteRide}
}

export const RidesProvider: React.FC<PropsWithChildren> = ({children}) => {
  const supabase = createSupabaseForBrowser()
  const {user} = useUser()
  const [rides, setRides] = useState<Ride[]>([])
  const [currentRide, setCurrentRide] = useState<Ride | null>(null)
  const [fetching, setFetching] = useState(false)
  const [isLoading, setIsloading] = useState(true)
  const pathname = usePathname()

  const getRides = async () => {
    setFetching(true)

    const result = await fetchRides(user!)
    setRides(result || [])

    setFetching(false)
  }
  const addRide = (ride: Ride) => {
    setRides([...rides, ride])
  }
  const selectRide = (rideId: string) => {
    const ride = rides.find(r => r.id === rideId)
    setCurrentRide(ride || null)
  }

  const handleDeleteRide = async (rideId: string) => {
    deleteRide(rideId)
    setRides(rides.filter(r => r.id !== rideId))
  }

  useEffect(() => {
    if (fetching || !user || rides.length) return
    setIsloading(true)
    getRides()
    setIsloading(false)
  }, [pathname, user])

  return (
    <Context.Provider value={{rides, addRide, currentRide, selectRide, isLoading, handleDeleteRide}}>
      {children}
    </Context.Provider>
  )
}
