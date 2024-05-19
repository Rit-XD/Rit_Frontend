import {Variant} from '@/utils/styler'
import {fromModule} from '@/utils/styler/Styler'
import React, {type HTMLProps} from 'react'
import {Icon, IconType} from '../Icon'
import {Link} from '../Link'
import css from './Button.module.scss'

const styles = fromModule(css)

export type ButtonType = (
  | Omit<HTMLProps<HTMLAnchorElement>, 'as'>
  | ({as: 'a'} & HTMLProps<HTMLAnchorElement>)
  | ({as: 'button'} & HTMLProps<HTMLButtonElement>)
) & {
  iconbefore?: IconType | undefined
  iconafter?: IconType | undefined
  mod?: Variant<'outline' | 'invert' | 'notinline'>
}

const Button: React.FC<ButtonType> = ({
  mod,

  iconbefore,
  iconafter,
  ...props
}) => {
  let ButtonTag: any = Link
  if ('as' in props && props.as === 'button') ButtonTag = 'button'

  return (
    <ButtonTag
      tabIndex={0}
      {...props}
      className={styles.button.mergeProps(props).mod(mod)()}
    >
      {iconbefore && <ButtonIcon icon={iconbefore} />}
      <span className={styles.button.label()}>{props.children}</span>
      {iconafter && <ButtonIcon icon={iconafter} />}
    </ButtonTag>
  )
}

const ButtonIcon: React.FC<{icon: IconType}> = ({icon}) => (
  <span className={styles.icon.mod(icon)()}>
    <Icon icon={icon} mod="square" />
  </span>
)

export default Button
