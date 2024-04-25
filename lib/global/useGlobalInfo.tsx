'use client'

import {useLocale} from '@/channels/global/translations/TranslationContext'
import {
  Planning,
  fetchUpcomingPlanning
} from '@/channels/schedule/fetchPlanning'
import {Globalinfo} from '@/lib/global/fetchGlobalInfo'
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

const Context = createContext<(Globalinfo & {planning: Planning}) | null>(null)

export const useGlobalInfo = () => {
  const result = useContext(Context)
  if (!result)
    throw new Error(`useGlobalInfo must be used within a GlobalInfoProvider`)

  const getBadgeInfo = aid => {
    const info = useGlobalInfo()
    for (const category of info.badges) {
      const badge = category.badges.find(badge => badge.aid === aid)
      if (badge) return {...badge, category}
    }
    return undefined
  }

  return {...result, getBadgeInfo}
}

export const GlobalInfoProvider: React.FC<
  PropsWithChildren<{info: Globalinfo}>
> = ({children, info}) => {
  const locale = useLocale()
  const [planning, setPlanning] = useState<Planning>({})

  useEffect(() => {
    fetchUpcomingPlanning(locale).then(planning => setPlanning(planning))
  }, [locale])

  return (
    <Context.Provider value={{...info, planning}}>{children}</Context.Provider>
  )
}
