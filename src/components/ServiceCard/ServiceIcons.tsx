import type { ComponentType, ReactNode } from 'react'

interface IconProps {
  className?: string
}

function IconWrapper({ children, className }: IconProps & { children: ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

function TopographyIcon({ className }: IconProps) {
  return (
    <IconWrapper className={className}>
      <circle cx="6" cy="17" r="1.75" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="7" r="1.75" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="19" cy="18" r="1.75" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.5 15.8L16.5 8.5M7.8 16.2L17.5 16.5" stroke="currentColor" strokeWidth="1.5" />
    </IconWrapper>
  )
}

function CadastreIcon({ className }: IconProps) {
  return (
    <IconWrapper className={className}>
      <path
        d="M5 6.5C5 5.67 5.67 5 6.5 5h5c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-5A1.5 1.5 0 0 1 5 17.5v-11Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12.5 8.5h5c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5h-5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M8 9h2M8 12h2M8 15h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </IconWrapper>
  )
}

function TechnicalPlanIcon({ className }: IconProps) {
  return (
    <IconWrapper className={className}>
      <path
        d="M7 5h7l3 3v11.5A1.5 1.5 0 0 1 15.5 21h-8A1.5 1.5 0 0 1 6 19.5V6.5A1.5 1.5 0 0 1 7 5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M14 5v3.5H17.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 12h6M9 15.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </IconWrapper>
  )
}

function StakingIcon({ className }: IconProps) {
  return (
    <IconWrapper className={className}>
      <path
        d="M12 4v16M4 12h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </IconWrapper>
  )
}

function AreaIcon({ className }: IconProps) {
  return (
    <IconWrapper className={className}>
      <rect x="5" y="7" width="14" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 11h14M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M9.5 14.5h5M9.5 16.5h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </IconWrapper>
  )
}

const iconsBySlug: Record<string, ComponentType<IconProps>> = {
  'topograficheskaya-semka': TopographyIcon,
  'kadastrovaya-semka': CadastreIcon,
  'tehnicheskiy-plan': TechnicalPlanIcon,
  'vynos-koordinat': StakingIcon,
  'ploshchadnye-harakteristiki': AreaIcon,
}

export function ServiceIcon({ slug }: { slug: string }) {
  const Icon = iconsBySlug[slug] ?? TopographyIcon
  return <Icon />
}
