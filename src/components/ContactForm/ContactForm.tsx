import { useState, type FormEvent } from 'react'
import { useToast } from '../../context/ToastContext'
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

export function ContactForm({ compact = false, submitVariant = 'dark' }: ContactFormProps) {
  const { showToast } = useToast()
  const [form, setForm] = useState<FormData>(initialForm)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

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

      const successMessage = 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'
      setStatus({ type: 'success', message: successMessage })
      showToast(successMessage)
      setForm(initialForm)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Не удалось отправить заявку. Попробуйте позже.'
      setStatus({ type: 'error', message: errorMessage })
      showToast(errorMessage, 'error')
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
