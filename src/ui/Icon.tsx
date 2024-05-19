const icons = {
  home: {ratio: 26 / 27},
  home_solid: {ratio: 26 / 27},
  passengers: {ratio: 26 / 19},
  passengers_solid: {ratio: 26 / 19},
  rides: {ratio: 26 / 32},
  rides_solid: {ratio: 26 / 32},
  chat: {ratio: 24 / 23},
  chat_solid: {ratio: 24 / 23},
  settings: {ratio: 24 / 25},
  settings_solid: {ratio: 24 / 25},
  logout: {ratio: 26 / 24},
  plus: {ratio: 23 / 23}
}

export type IconType = keyof typeof icons

export const Icon = ({
  icon,
  className,
  mod
}: {
  icon: IconType
  className?: string
  mod?: 'square'
}) => {
  if (!icon) return null

  return (
    <span className={className}>
      <svg
        style={{
          height: '1em',
          width: mod === 'square' ? '1em' : 'auto',
          aspectRatio: Math.floor((icons[icon]?.ratio || 1) * 100) / 100
        }}
      >
        <use href={`/icons.svg#${icon}`} />
      </svg>
    </span>
  )
}
