import {fromModule} from '@/utils/styler/Styler'
import css from './LoginSteps.module.scss'

export default function LoginLayout({children}: {children: React.ReactNode}) {
  const styles = fromModule(css)
  return <main className={styles.main()}>{children}</main>
}
