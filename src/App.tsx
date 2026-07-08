import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { Header, HeaderSpacer } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { HomePage } from './pages/HomePage/HomePage'
import { ServicePage } from './pages/ServicePage/ServicePage'

function ScrollToTop() {
  const { pathname, hash, key } = useLocation()
  const isInitialMount = useRef(true)

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      window.scrollTo(0, 0)
      requestAnimationFrame(() => window.scrollTo(0, 0))
      return
    }

    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }

    window.scrollTo(0, 0)
  }, [pathname, hash, key])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <HeaderSpacer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:slug" element={<ServicePage />} />
      </Routes>
      <Footer />
    </>
  )
}
