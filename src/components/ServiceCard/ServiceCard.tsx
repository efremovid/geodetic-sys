import { Link } from 'react-router-dom'
import { ServiceIcon } from './ServiceIcons'
import styles from './ServiceCard.module.scss'

interface ServiceCardProps {
  slug: string
  title: string
  description: string
  index: number
}

export function ServiceCard({ slug, title, description }: ServiceCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.iconWrap}>
        <ServiceIcon slug={slug} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <Link to={`/services/${slug}`} className={styles.link}>
        Подробнее
        <span className={styles.arrow} aria-hidden="true">
          ↗
        </span>
      </Link>
    </article>
  )
}
