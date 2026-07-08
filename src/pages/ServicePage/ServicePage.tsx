import { Link, Navigate, useParams } from 'react-router-dom'
import { getServiceBySlug, services } from '../../data/services'
import { site } from '../../data/site'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { ContactForm } from '../../components/ContactForm/ContactForm'
import styles from './ServicePage.module.scss'

export function ServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const service = slug ? getServiceBySlug(slug) : undefined

  if (!service) {
    return <Navigate to="/" replace />
  }

  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3)

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="Хлебные крошки">
            <Link to="/">Главная</Link>
            <span>/</span>
            <Link to="/#services">Услуги</Link>
            <span>/</span>
            <span>{service.shortTitle}</span>
          </nav>
          <h1 className={styles.heroTitle}>{service.title}</h1>
          <p className={styles.heroDesc}>{service.heroDescription}</p>
          <Link to="/" className={styles.backHome}>
            На главную
            <span aria-hidden="true">←</span>
          </Link>
          <div className={styles.coords}>
            <span>Шир.: 55.7558° N</span>
            <span>Долг.: 37.6173° E</span>
            <span>Высота: БСВ-77</span>
          </div>
        </div>
      </section>

      {service.process && (
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Технический процесс</h2>
            <div className={styles.processGrid}>
              {service.process.map((step) => (
                <article key={step.number} className={styles.processStep}>
                  <span className={styles.stepNumber}>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.contentGrid}>
            <div className={styles.mainContent}>
              {service.sections.map((section) => (
                <article key={section.title} className={styles.contentBlock}>
                  <h2>{section.title}</h2>
                  {section.paragraphs?.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                  {section.items && (
                    <ul>
                      {section.items.map((item) => (
                        <li key={item.slice(0, 40)}>{item}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>

            {service.equipment && (
              <aside className={styles.sidebar}>
                <h3 className={styles.sidebarTitle}>Оборудование</h3>
                <ul className={styles.equipmentList}>
                  {service.equipment.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </div>
      </section>

      {service.deliverables && (
        <section className={styles.section}>
          <div className={styles.container}>
            <SectionHeading
              number="—"
              label="Результаты"
              title="Результаты для заказчика"
            />
            <div className={styles.deliverablesGrid}>
              {service.deliverables.map((item) => (
                <article key={item.title} className={styles.deliverable}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaGrid}>
            <div>
              <h2 className={styles.ctaTitle}>Заказать съёмку</h2>
              <p className={styles.ctaDesc}>
                Оставьте заявку на бесплатный расчёт стоимости и консультацию ведущего инженера.
              </p>
              <div className={styles.ctaContacts}>
                <a href={site.phoneHref}>{site.phone}</a>
                <a href={site.emailHref}>{site.email}</a>
              </div>
            </div>
            <ContactForm compact submitVariant="accent" />
          </div>
        </div>
      </section>

      <section className={styles.otherServices}>
        <div className={styles.container}>
          <h2 className={styles.otherTitle}>Другие услуги</h2>
          <div className={styles.otherGrid}>
            {otherServices.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className={styles.otherLink}>
                <span>{s.shortTitle}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
