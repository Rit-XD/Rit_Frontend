import {fromModule} from '@/utils/styler/Styler'
import {ForgotPasswordSteps} from './ForgotPassword'
import css from './ForgotPassword.module.scss'

const styles = fromModule(css)

export default function forgotPassword() {
  return <ForgotPasswordSteps />
}
