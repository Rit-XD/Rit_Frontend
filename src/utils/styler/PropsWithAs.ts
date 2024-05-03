import React from 'react'

// Source: https://codesandbox.io/s/typescript-as-prop-dicj8?file=/src/App.tsx:0-1216

// --------------------
// GENERIC TYPES
// --------------------

export type As<Props = any> = React.ElementType<Props>

export type PropsWithAs<Props = {}, Type extends As = As> = Props &
  Omit<React.ComponentProps<Type>, 'as' | keyof Props> & {
    as?: Type
  }

export type ComponentWithAs<Props, DefaultType extends As> = {
  <Type extends As>(props: PropsWithAs<Props, Type> & {as: Type}): JSX.Element
  (props: PropsWithAs<Props, DefaultType>): JSX.Element
}

// --------------------
// UTILS
// --------------------

export function forwardRefWithAs<Props, DefaultType extends As>(
  component: React.ForwardRefRenderFunction<any, any>
) {
  return React.forwardRef(component) as unknown as ComponentWithAs<
    Props,
    DefaultType
  >
}
