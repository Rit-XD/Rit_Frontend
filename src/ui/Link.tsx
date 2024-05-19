'use client'

import NextLink, {LinkProps as NextLinkProps} from 'next/link'
import React, {ComponentPropsWithoutRef} from 'react'
import {UrlObject} from 'url'

export function checkIsExternal(href: string) {
  if (href && (href.startsWith('http') || href.startsWith('https'))) return true
}

export function checkIsFile(href: string) {
  if (href && href.split('/').pop()?.includes('.')) return true
}

export type LinkProps = ComponentPropsWithoutRef<'a'> &
  Omit<NextLinkProps, 'href'> & {href?: UrlObject | string}

export const Link: React.FC<LinkProps> = ({href, ...props}) => {
  if (!href && !props.onClick) return <div {...(props as any)} />

  const isExternal = href && checkIsExternal(href)
  const isFile = href && checkIsFile(href)

  if (!href || isExternal || isFile)
    return (
      <a
        {...props}
        href={href}
        target={props.target || '_blank'}
        rel={isExternal && 'external nofollow noopener'}
        onClick={e => {
          if (props.onClick) props.onClick(e)
        }}
      />
    )

  return (
    <NextLink
      {...props}
      href={href}
      onClick={e => {
        if (props.onClick) props.onClick(e)
      }}
    />
  )
}
