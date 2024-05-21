'use client'

import css from '@/app/dashboard/Dashboard.module.scss'
import {Header} from '@/components/header/Header'
import {Nav} from '@/components/nav/Nav'
import {UserProvider, useUser} from '@/lib/user/useUser'
import {Icon} from '@/ui/Icon'
import {fromModule} from '@/utils/styler/Styler'
import {createSupabaseForBrowser} from '@/utils/supabase/createSupabaseForBrowser'
import Image from 'next/image'
import Link from 'next/link'
import '../globals.css'

const styles = fromModule(css)

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = createSupabaseForBrowser()

  const {user} = useUser();


  return (
    <UserProvider>
      <div className={styles.layout()}>
        <aside className={styles.layout.sidebar()}>
          <Link
            href={`/dashboard`}
            title="Rit"
            className={styles.layout.sidebar.logo()}
          >
            <Image
              src="/images/logo-rit.png"
              alt="Logo Rit"
              width={64}
              height={64}
            ></Image>
          </Link>
          <Nav />
          <div className={styles.layout.sidebar.signout()}>
            <hr className={styles.layout.sidebar.signout.hr()} />
            <button
              onClick={() =>
                supabase.auth.signOut().finally(() => location.reload())
              }
            >
              <Icon icon="logout" />
            </button>
          </div>
        </aside>
        <div className={styles.layout.content()}>
          {/* <Header /> */}
          {children}
        </div>
      </div>
    </UserProvider>
  )
}
