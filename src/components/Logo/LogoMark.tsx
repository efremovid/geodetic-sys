import styles from './LogoMark.module.scss'

interface LogoMarkProps {
  className?: string
  title?: string
}

export function LogoMark({ className, title = 'ТопоСтройКадастр' }: LogoMarkProps) {
  return (
    <img
      className={`${styles.mark} ${className ?? ''}`}
      src="/logo.png"
      alt={title}
      width={420}
      height={460}
      decoding="async"
      draggable={false}
    />
  )
}
