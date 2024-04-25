import {fetchGlobalInfo} from '@/lib/global/fetchGlobalInfo'
import {GlobalInfoProvider} from '@/lib/global/useGlobalInfo'

export async function GlobalInfo({
  locale,
  children
}: {
  locale: string
  children: React.ReactNode
}) {
  const info = await fetchGlobalInfo(locale)

  return <GlobalInfoProvider info={info}>{children}</GlobalInfoProvider>
}
