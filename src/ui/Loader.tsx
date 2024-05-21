import {fromModule} from '@/utils/styler/Styler'
import css from './Loader.module.scss'

const styles = fromModule(css)

export const Loader = () => {
  return <div className={styles.loader()}></div>
}
