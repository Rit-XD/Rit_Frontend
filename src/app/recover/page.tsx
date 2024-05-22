import {fromModule} from '@/utils/styler/Styler'
import {RecoverSteps} from './RecoverSteps'
import css from './RecoverSteps.module.scss'

const styles = fromModule(css)

export default function forgotPassword() {
  return (
    <div className={styles.recover()}>
      <RecoverSteps />
    </div>
  )
}
