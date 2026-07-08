import { site } from '../../data/site'
import { getServiceCards } from '../../data/services'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { ServiceCard } from '../../components/ServiceCard/ServiceCard'
import { ContactForm } from '../../components/ContactForm/ContactForm'
import styles from './HomePage.module.scss'

export function HomePage() {
  const services = getServiceCards()

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <p className={styles.heroTag}>{site.tagline}</p>
            <h1 className={styles.heroTitle}>GEODETIC.SYS</h1>
            <p className={styles.heroDesc}>{site.description}</p>
            <div className={styles.heroActions}>
              <a href="#services" className={styles.btnPrimary}>
                Наши услуги
                <span aria-hidden="true">→</span>
              </a>
              <a href="#contact" className={styles.btnSecondary}>
                Связаться
              </a>
            </div>
          </div>

          <aside className={styles.heroAside}>
            <div className={styles.coords}>
              <span>Шир.: {site.coords.lat}</span>
              <span>Долг.: {site.coords.lon}</span>
              <span>{site.coords.zone}</span>
            </div>
          </aside>
        </div>
      </section>

      <section id="services" className={`${styles.section} ${styles.sectionMuted}`}>
        <div className={styles.container}>
          <SectionHeading number="01" label="Услуги" />
          <div className={styles.servicesGrid}>
            {services.map((service, i) => (
              <ServiceCard
                key={service.slug}
                slug={service.slug}
                title={service.shortTitle}
                description={service.cardDescription}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className={styles.aboutSection}>
        <div className={styles.container}>
          <SectionHeading
            number="02"
            label="О нас"
            title="Измерения, которым доверяют"
            theme="dark"
            serif
          />
          <p className={styles.aboutText}>
            Компания {site.name} предоставляет полный спектр геодезических и кадастровых услуг на
            территории Москвы, Московской области и других регионов. Мы сочетаем классические методы
            измерений с современными технологиями.
          </p>
          <div className={styles.stats}>
            {site.stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className={`${styles.section} ${styles.contactSection}`}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            <div>
              <SectionHeading
                number="03"
                label="Контакты"
                title="Обсудите ваш проект прямо сейчас"
              />
              <div className={styles.contactInfo}>
                <div>
                  <span className={styles.contactLabel}>Телефон для связи</span>
                  <a href={site.phoneHref} className={styles.contactValue}>
                    {site.phone}
                  </a>
                </div>
                <div>
                  <span className={styles.contactLabel}>Электронная почта</span>
                  <a href={site.emailHref} className={styles.contactValue}>
                    {site.email}
                  </a>
                </div>
                <div>
                  <span className={styles.contactLabel}>Регион работы</span>
                  <span className={styles.contactRegion}>{site.region}</span>
                </div>
              </div>
            </div>
            <div>
              <p className={styles.formTitle}>Запрос на расчёт стоимости</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
