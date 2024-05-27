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
  plus: {ratio: 23 / 23},
  search: {ratio: 22 / 22},
  dropdown: {ratio: 14 / 8},
  calendar: {ratio: 16 / 16},
  xmark: {ratio: 16 / 16},
  wheelchair: {ratio: 16 / 21},
  finish: {ratio: 17 / 16},
  arrowRight: {ratio: 8 / 14},
  profile: {ratio: 21 / 18},
  key: {ratio: 21 / 18},
  carCrash: {ratio: 24 / 16},
  edit: {ratio: 25 / 25},
  location: {ratio: 94 / 94},
  clock: {ratio: 16 / 16}
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
