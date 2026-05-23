import React, { useRef, useState, useEffect } from 'react'
import { Header } from './components/Header'
import { VerifyForm } from './components/VerifyForm'
import { HowItWorks } from './components/HowItWorks'
import { Ticker } from './components/Ticker'
import { Footer } from './components/Footer'
import { translations } from './utils/i18n'
import type { Lang } from './utils/i18n'
import './App.css'

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [lang, setLang] = useState<Lang>('en')
  const formRef = useRef<HTMLDivElement>(null)

  const t = translations[lang]

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Prefer system theme on first load
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    setTheme(mq.matches ? 'dark' : 'light')
  }, [])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className="app">
      {/* Background decorations */}
      <div className="bg-grid" aria-hidden />
      <div className="bg-orb bg-orb-1" aria-hidden />
      <div className="bg-orb bg-orb-2" aria-hidden />

      <Header
        t={t}
        lang={lang}
        setLang={setLang}
        theme={theme}
        toggleTheme={toggleTheme}
        onVerifyClick={scrollToForm}
      />

      {/* Hero Section */}
      <main>
        <section className="hero">
          <div className="hero__inner">
            {/* Left: copy */}
            <div className="hero__copy">
              <div className="hero__badge">
                <span className="hero__badge-dot"></span>
                {t.hero.badge}
              </div>

              <h1 className="hero__title">
                {t.hero.title}<br />
                <span className="hero__title-accent">{t.hero.titleAccent}</span>
              </h1>

              

              <div className="hero__stats">
                <div className="hero__stat">
                  <span className="hero__stat-value">{t.hero.stats.verified}</span>
                  <span className="hero__stat-label">{t.hero.stats.verifiedLabel}</span>
                </div>
                <div className="hero__stat-divider" />
                <div className="hero__stat">
                  <span className="hero__stat-value">{t.hero.stats.accuracy}</span>
                  <span className="hero__stat-label">{t.hero.stats.accuracyLabel}</span>
                </div>
                <div className="hero__stat-divider" />
                <div className="hero__stat">
                  <span className="hero__stat-value">{t.hero.stats.support}</span>
                  <span className="hero__stat-label">{t.hero.stats.supportLabel}</span>
                </div>
              </div>

              <button className="hero__cta" onClick={scrollToForm}>
                {t.hero.cta}
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M12 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Trust badges */}
              <div className="hero__trust">
                <div className="hero__trust-item">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M8 1.5L2 4v4c0 3.3 2.5 6.1 6 7 3.5-.9 6-3.7 6-7V4L8 1.5z" stroke="currentColor" strokeWidth="1.2"/></svg>
                  SSL Secured
                </div>
                <div className="hero__trust-item">
                  <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  Instant Result
                </div>
                <div className="hero__trust-item">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h8M2 12h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  No Registration
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="hero__form-wrap">
              <VerifyForm t={t} formRef={formRef as React.RefObject<HTMLDivElement>} />
            </div>
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
