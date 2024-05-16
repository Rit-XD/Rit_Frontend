'use client'

import css from '@/app/Layout.module.scss'
import {Nav} from '@/components/nav/Nav'
import {fetchUser} from '@/lib/user/fetchUser'
import {UserProvider} from '@/lib/user/useUser'
import {Icon} from '@/ui/Icon'
import {fromModule} from '@/utils/styler/Styler'
import {createSupabaseForBrowser} from '@/utils/supabase/createSupabaseForBrowser'
import {GeistSans} from 'geist/font/sans'
import Image from 'next/image'
import Link from 'next/link'
import '../styles/globals.scss'

const styles = fromModule(css)

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const user = fetchUser()
  const supabase = createSupabaseForBrowser()
  return (
    <html lang="nl" className={GeistSans.className}>
      <body>
        <UserProvider>
          <div className={styles.layout()}>
            {user && (
              <aside className={styles.layout.sidebar()}>
                <Link
                  href={`/`}
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
                    onClick={() => {
                      supabase.auth.signOut().finally(() => {
                        location.reload()
                      })
                    }}
                  >
                    <Icon icon="logout" />
                  </button>
                </div>
              </aside>
            )}
            <div className={styles.layout.content()}>{children}</div>
          </div>
        </UserProvider>
      </body>
    </html>
  )
}
