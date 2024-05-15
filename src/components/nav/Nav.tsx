'use client'

import {Icon, IconType} from '@/ui/Icon'
import {Variant} from '@/utils/styler'
import {fromModule} from '@/utils/styler/Styler'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import css from './Nav.module.scss'

const styles = fromModule(css)

export function Nav({mod}: {mod?: Variant<'mobile' | 'desktop'>}) {
  const nav = [
    {
      icon: 'home',
      href: '/',
      title: 'Dashboard'
    },
    {
      icon: 'passengers',
      href: '/passengers',
      title: 'Passagiers'
    },
    {
      icon: 'rides',
      href: '/rides',
      title: 'Ritten'
    },
    {
      icon: 'chat',
      href: '/chat',
      title: 'Chat'
    },
    {
      icon: 'settings',
      href: '/settings',
      title: 'Instellingen'
    }
  ]

  return (
    <nav className={styles.nav.mod(mod)()}>
      <ul className={styles.nav.list()}>
        {(nav || []).map(
          item =>
            item?.href && (
              <li key={item.href}>
                <NavLink {...item} />
              </li>
            )
        )}
      </ul>
    </nav>
  )
}

function NavLink({
  icon,
  href,
  title
}: {
  icon: string
  href: string
  title: string
}) {
  const pathname = usePathname()
  if (!href) return null
  const isActive = pathname === href || (pathname === '/' && href === '/')
  return (
    <Link
      href={href}
      title={title}
      className={styles.link.is({active: isActive})()}
    >
      <span className={styles.link.icon()}>
        <Icon
          icon={(isActive ? icon + '_solid' : icon) as IconType}
          mod="square"
        />
      </span>
    </Link>
  )
}
