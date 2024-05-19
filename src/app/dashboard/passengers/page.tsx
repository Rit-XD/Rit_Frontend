import {PassengerTable} from '@/components/passengertable/PassengerTable'
import {fetchUser} from '@/lib/user/fetchUser'
import {Icon} from '@/ui/Icon'
import Button from '@/ui/button/Button'
import {fromModule} from '@/utils/styler/Styler'
import {supabaseAdmin} from '@/utils/supabase/supabaseAdmin'
import {redirect} from 'next/navigation'
import css from './Passengers.module.scss'

export default async function Passengers() {
  const styles = fromModule(css)

  const user = await fetchUser()
  if (!user) redirect(`/login`)

  const {data: passengers, error} = await supabaseAdmin
    .from('Passengers')
    .select('*')
    .eq('carecenter_id', user?._id)

  return (
    <main>
      <div className={styles.container()}>
        <div className={styles.container.leftside()}>
          <p className={styles.container.leftside.tab()}>
            {`Passagiers (${passengers?.length})`}
          </p>
          <p>{`Archief (0)`}</p>
        </div>
        <div className={styles.container.rightside()}>
          <input type="text" placeholder="Zoek naam" />
          <Icon className={styles.container.rightside.search()} icon="search" />
          <Button iconbefore="plus">Nieuwe Passagier</Button>
        </div>
      </div>
      <PassengerTable />
    </main>
  )
}
