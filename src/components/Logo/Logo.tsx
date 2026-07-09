import { Link } from 'react-router-dom'
import { site } from '../../data/site'
import { LogoMark } from './LogoMark'
import styles from './Logo.module.scss'

interface LogoProps {
  variant?: 'full' | 'mark' | 'wordmark'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  asLink?: boolean
  className?: string
  onClick?: () => void
}

export function Logo({
  variant = 'full',
  size = 'md',
  asLink = false,
  className = '',
  onClick,
}: LogoProps) {
  const content = (
    <span
      className={`${styles.logo} ${styles[size]} ${variant === 'mark' ? styles.markOnly : ''} ${variant === 'wordmark' ? styles.wordmarkOnly : ''} ${className}`}
    >
      {(variant === 'full' || variant === 'mark') && (
        <LogoMark className={styles.mark} />
      )}
      {(variant === 'full' || variant === 'wordmark') && (
        <span className={styles.wordmark}>
          <span className={styles.main}>{site.logoMain}</span>
          <span className={styles.accent}>{site.logoAccent}</span>
        </span>
      )}
    </span>
  )

  if (asLink) {
    return (
      <Link to="/" className={styles.link} onClick={onClick}>
        {content}
      </Link>
    )
  }

  return content
}
