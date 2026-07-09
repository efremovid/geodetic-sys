import { useEffect, useState, type FormEvent } from 'react'
import styles from './ContactForm.module.scss'

interface ContactFormProps {
  compact?: boolean
  submitVariant?: 'dark' | 'accent'
}

interface FormData {
  name: string
  phone: string
  email: string
  message: string
}

const initialForm: FormData = {
  name: '',
  phone: '',
  email: '',
  message: '',
}

const STATUS_HIDE_MS = 5000

export function ContactForm({ compact = false, submitVariant = 'dark' }: ContactFormProps) {
  const [form, setForm] = useState<FormData>(initialForm)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => {
    if (!status) return

    const timer = window.setTimeout(() => {
      setStatus(null)
    }, STATUS_HIDE_MS)

    return () => window.clearTimeout(timer)
  }, [status])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (status) setStatus(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || 'Ошибка отправки')
      }

      setStatus({
        type: 'success',
        message: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
      })
      setForm(initialForm)
    } catch (err) {
      setStatus({
        type: 'error',
        message:
          err instanceof Error ? err.message : 'Не удалось отправить заявку. Попробуйте позже.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      className={`${styles.form} ${compact ? styles.compact : ''}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={styles.grid}>
        <label className={styles.field}>
          <span className={styles.label}>ФИО / Организация</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Введите имя"
            required
            autoComplete="name"
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Телефон</span>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+7 (___) ___-__-__"
            required
            autoComplete="tel"
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Электронная почта</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="example@mail.ru"
            required
            autoComplete="email"
          />
        </label>

        <label className={`${styles.field} ${styles.fullWidth}`}>
          <span className={styles.label}>
            {compact ? 'Объект и задача' : 'Описание объекта и задачи'}
          </span>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Опишите объект и задачу"
            rows={compact ? 3 : 4}
            required
          />
        </label>
      </div>

      <button
        type="submit"
        className={`${styles.submit} ${submitVariant === 'accent' ? styles.submitAccent : ''}`}
        disabled={loading}
      >
        {loading ? 'Отправка…' : 'Отправить заявку'}
      </button>

      {status && (
        <p
          className={`${styles.status} ${status.type === 'success' ? styles.statusSuccess : styles.statusError}`}
          role="status"
          aria-live="polite"
        >
          {status.type === 'success' ? '✓ ' : '✕ '}
          {status.message}
        </p>
      )}
    </form>
  )
}
