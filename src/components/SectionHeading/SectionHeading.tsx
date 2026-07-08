import styles from './SectionHeading.module.scss'

interface SectionHeadingProps {
  number: string
  label: string
  title?: string
  subtitle?: string
  align?: 'left' | 'center'
  theme?: 'light' | 'dark'
  serif?: boolean
}

export function SectionHeading({
  number,
  label,
  title,
  subtitle,
  align = 'left',
  theme = 'light',
  serif = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`${styles.heading} ${styles[align]} ${styles[theme]} ${serif ? styles.serif : ''}`}
    >
      <p className={styles.meta}>
        <span className={styles.number}>{number}</span>
        <span className={styles.divider}>/</span>
        <span className={styles.label}>{label}</span>
      </p>
      {title && <h2 className={styles.title}>{title}</h2>}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  )
}
