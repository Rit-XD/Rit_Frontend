'use client'
import {useUser} from '@/lib/user/useUser'
import {fromModule} from '@/utils/styler/Styler'
import Skeleton from 'react-loading-skeleton'
import css from './Header.module.scss'

const styles = fromModule(css)

export const Header: React.FC = () => {
  const {user} = useUser()

  return (
    <div>
      <div className={styles.header()}>
        {user?.logo && (
          <img src={user.logo} alt="" className={styles.header.logo()} />
        )}
        <h1 className={styles.header.title()}>
          {user?.name || (
            <div className={styles.header.title.skeleton()}>
              <Skeleton width={46} height={46} /> <Skeleton width={224} />
            </div>
          )}
        </h1>
      </div>
      <hr className={styles.header.hr()} />
    </div>
  )
}
