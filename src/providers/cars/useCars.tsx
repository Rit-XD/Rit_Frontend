'use client'

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
import { useUser } from '../user/useUser'
import { fetchCars } from './fetchCars'
import { Car } from '@/types/car.type'

type CarType = {
    isLoading: boolean
    cars: Car[]
    currentCar?: Car | null
    selectCar: (carId: string) => void
}

const Context = createContext<CarType>({
  isLoading: true,
  cars: [],
  currentCar: null,
  selectCar: () => {}
})

export const useCars = () => {
  const supabase = createSupabaseForBrowser()
  const { isLoading, cars, currentCar, selectCar } = useContext(Context)

  return { isLoading, cars, currentCar, selectCar }
}

export const CarsProvider: React.FC<PropsWithChildren> = ({children}) => {
  const supabase = createSupabaseForBrowser()
  const { user } = useUser();
  const [fetching, setFetching] = useState(false)
  const [isLoading, setIsloading] = useState(true)
  const pathname = usePathname()
  const [cars, setCars] = useState<Car[]>([])
  const [currentCar, setCurrentCar] = useState<Car | null>(null)

  const getCars = async () => {
    setFetching(true)

    const result = await fetchCars(user!)
    setCars(result || [])

    setFetching(false)
  }
  const addCar = (car: Car) => {
    setCars([...cars, car])
  }
  const selectCar = (carId: string) => {
    const car = cars.find(c => c.id === carId)
    setCurrentCar(car || null)
  }

  useEffect(() => {
    if (fetching || !user) return;
    setIsloading(true)
    getCars()
    setIsloading(false)
  }, [pathname, user])

  return (
    <Context.Provider value={{ cars, currentCar, selectCar, isLoading }}>
      {children}
    </Context.Provider>
  )
}
