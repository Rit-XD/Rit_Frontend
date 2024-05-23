'use client'

import {PassengerTable} from '@/components/passengertable/PassengerTable'
import {useState} from 'react'
import {SearchContext} from './CreateContext'
import {PassengersHeader} from './PassengersHeader'

export const PassengersContext: React.FC = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <SearchContext.Provider value={{searchValue, setSearchValue}}>
      <PassengersHeader />
      <PassengerTable initial={[]} />
    </SearchContext.Provider>
  )
}
