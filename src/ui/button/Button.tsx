import {Variant} from '@/utils/styler'
import {fromModule} from '@/utils/styler/Styler'
import React, {type HTMLProps} from 'react'
import {Link} from '../Link'
import css from './Button.module.scss'

const styles = fromModule(css)

export type ButtonType = (
  | Omit<HTMLProps<HTMLAnchorElement>, 'as'>
  | ({as: 'a'} & HTMLProps<HTMLAnchorElement>)
  | ({as: 'button'} & HTMLProps<HTMLButtonElement>)
) & {
  mod?: Variant<'outline' | 'invert' | 'notinline'>
}

const Button: React.FC<ButtonType> = ({mod, ...props}) => {
  let ButtonTag: any = Link
  if ('as' in props && props.as === 'button') ButtonTag = 'button'

  return (
    <ButtonTag
      tabIndex={0}
      {...props}
      className={styles.button.mergeProps(props).mod(mod)()}
    >
      <span className={styles.button.label()}>{props.children}</span>
    </ButtonTag>
  )
}

export default Button
