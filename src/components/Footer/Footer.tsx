import { site, footerNav, footerLegal } from '../../data/site'
import { Logo } from '../Logo/Logo'
import styles from './Footer.module.scss'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo asLink size="lg" className={styles.logoWrap} />
            <p className={styles.tagline}>
              Ваш надёжный партнёр в области кадастровых и геодезических работ на территории Москвы,
              Московской области и других регионов.
            </p>
            <div className={styles.contacts}>
              <a href={site.phoneHref}>{site.phone}</a>
              <a href={site.emailHref}>{site.email}</a>
            </div>
          </div>

          <div className={styles.columns}>
            <div>
              <h3 className={styles.colTitle}>Навигация</h3>
              <ul>
                {footerNav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={styles.colTitle}>Информация</h3>
              <ul>
                {footerLegal.map((item) => (
                  <li key={item.label}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>{site.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
