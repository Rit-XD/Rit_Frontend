import {fromModule} from '@/utils/styler/Styler'
import css from './SignUpSteps.module.scss'

export default function SignupLayout({children}: {children: React.ReactNode}) {
  const styles = fromModule(css)
  return <main className={styles.main()}>{children}</main>
}
