import React from 'react'
import { Lang } from '../utils/i18n'
import type { Translations } from '../utils/i18n'
import './Header.css'

interface HeaderProps {
  t: Translations
  lang: Lang
  setLang: (l: Lang) => void
  theme: 'dark' | 'light'
  toggleTheme: () => void
  onVerifyClick: () => void
}

export const Header: React.FC<HeaderProps> = ({ t, lang, setLang, theme, toggleTheme, onVerifyClick }) => {
  const [scrolled, setScrolled] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">
        {/* Logo */}
        <a href="#" className="header__logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <div className="header__logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <span className="header__logo-text">
            verificar<span className="header__logo-accent">bilhete</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="header__nav">
          <button className="header__nav-link" onClick={onVerifyClick}>{t.nav.verify}</button>
          <a href="#how-it-works" className="header__nav-link">{t.nav.howItWorks}</a>
        </nav>

        {/* Controls */}
        <div className="header__controls">
          {/* Language switcher */}
          <div className="header__lang">
            <button
              className={`header__lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
              aria-label="Switch to English"
            >EN</button>
            <span className="header__lang-sep">|</span>
            <button
              className={`header__lang-btn ${lang === 'pt' ? 'active' : ''}`}
              onClick={() => setLang('pt')}
              aria-label="Mudar para Português"
            >PT</button>
          </div>

          {/* Theme toggle */}
          <button className="header__theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>

          {/* CTA */}
          <button className="header__cta" onClick={onVerifyClick}>
            {t.nav.verify}
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Mobile hamburger */}
          <button className="header__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span className={menuOpen ? 'open' : ''}></span>
            <span className={menuOpen ? 'open' : ''}></span>
            <span className={menuOpen ? 'open' : ''}></span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="header__mobile-menu">
          <button className="header__mobile-link" onClick={() => { onVerifyClick(); setMenuOpen(false) }}>{t.nav.verify}</button>
          <a href="#how-it-works" className="header__mobile-link" onClick={() => setMenuOpen(false)}>{t.nav.howItWorks}</a>
          <div className="header__mobile-divider" />
          <div className="header__mobile-controls">
            <div className="header__lang">
              <button className={`header__lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
              <span className="header__lang-sep">|</span>
              <button className={`header__lang-btn ${lang === 'pt' ? 'active' : ''}`} onClick={() => setLang('pt')}>PT</button>
            </div>
            <button className="header__theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}