import React, { useRef, useState, useEffect } from 'react'
import { Header } from './components/Header'
import { VerifyForm } from './components/VerifyForm'
import { HowItWorks } from './components/HowItWorks'
import { Ticker } from './components/Ticker'
import { Footer } from './components/Footer'
import { translations } from './utils/i18n'
import './App.css'

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const formRef = useRef<HTMLDivElement>(null)

  // English only
  const t = translations.en

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Prefer system theme on first load
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    setTheme(mq.matches ? 'dark' : 'light')
  }, [])

  const toggleTheme = () =>
    setTheme(t => t === 'dark' ? 'light' : 'dark')

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }

  return (
    <div className="app">
      {/* Background decorations */}
      <div className="bg-grid" aria-hidden />
      <div className="bg-orb bg-orb-1" aria-hidden />
      <div className="bg-orb bg-orb-2" aria-hidden />

      <Header
        t={t}
        theme={theme}
        toggleTheme={toggleTheme}
        onVerifyClick={scrollToForm}
      />

      {/* Hero Section */}
      <main>
        <section className="hero">
          {/* Form */}
          <div className="hero__form-wrap">
            <VerifyForm
              t={t}
              formRef={formRef as React.RefObject<HTMLDivElement>}
            />
          </div>
        </section>

        {/* Live ticker */}
        <Ticker t={t} />

        {/* How It Works */}
        <HowItWorks t={t} />
      </main>

      <Footer t={t} />
    </div>
  )
}

export default App
