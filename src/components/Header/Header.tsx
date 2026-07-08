import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { navLinks } from '../../data/site'
import styles from './Header.module.scss'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${menuOpen ? styles.menuOpen : ''}`}
      >
        <div className={styles.inner}>
          <Link to="/" className={styles.logo} onClick={closeMenu}>
            <span className={styles.logoMark}>GEODETIC</span>
            <span className={styles.logoDot}>.SYS</span>
          </Link>

          <nav className={styles.navDesktop} aria-label="Основная навигация">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>

          <a href="/#contact" className={styles.cta}>
            Заказать съёмку
          </a>

          <button
            type="button"
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className={styles.mobileNav} aria-label="Мобильная навигация">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.mobileNavLink} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <a href="/#contact" className={styles.ctaMobile} onClick={closeMenu}>
            Заказать съёмку
          </a>
        </nav>
      </div>
    </>
  )
}

export function HeaderSpacer() {
  return <div className={styles.spacer} aria-hidden="true" />
}
