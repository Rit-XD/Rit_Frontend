import {fromModule} from '@/utils/styler/Styler'
import React, {useState} from 'react'
import OTPInput from 'react-otp-input'
import {Link} from './Link'
import css from './TokenInput.module.scss'

const styles = fromModule(css)

export const TokenInput: React.FC<{
  name?: string
  resendToken?: () => void
}> = ({name = 'otp', resendToken}) => {
  const [code, setCode] = useState<string>('')

  return (
    <div className={styles.tokeninput()}>
      <OTPInput
        value={code}
        onChange={setCode}
        numInputs={6}
        // renderSeparator={<div />}
        renderInput={(props, index) => {
          return (
            <input
              {...props}
              required
              name={`${name}${index + 1}`}
              placeholder="_"
              className={styles.tokeninput.input()}
            />
          )
        }}
        shouldAutoFocus={true}
        inputType={'tel'}
      />
      <div className={styles.tokeninput.resend()}>
        <Link
          type="button"
          onClick={resendToken}
          className={styles.tokeninput.resend.link()}
        >
          Stuur code opnieuw
        </Link>
      </div>
    </div>
  )
}
