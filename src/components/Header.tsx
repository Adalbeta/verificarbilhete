import React from 'react'
import type { Translations } from '../utils/i18n'
import './Header.css'

interface HeaderProps {
  t: Translations
  onVerifyClick: () => void
}

export const Header: React.FC<HeaderProps> = ({
  t,
  onVerifyClick
}) => {
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
        <a
          href="#"
          className="header__logo"
          onClick={e => {
            e.preventDefault()
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            })
          }}
        >
          <div className="header__logo-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12l2 2 4-4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </div>

          <span className="header__logo-text">
            Ticket<span className="header__logo-accent">Verify</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="header__nav">
          <button
            className="header__nav-link"
            onClick={onVerifyClick}
          >
            {t.nav.verify}
          </button>

          <a
            href="#how-it-works"
            className="header__nav-link"
          >
            {t.nav.howItWorks}
          </a>
        </nav>

        {/* Controls */}
        <div className="header__controls">

          {/* CTA */}
          <button
            className="header__cta"
            onClick={onVerifyClick}
          >
            {t.nav.verify}

            <svg
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Mobile hamburger */}
          <button
            className="header__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={menuOpen ? 'open' : ''}></span>
            <span className={menuOpen ? 'open' : ''}></span>
            <span className={menuOpen ? 'open' : ''}></span>
          </button>

        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="header__mobile-menu">

          <button
            className="header__mobile-link"
            onClick={() => {
              onVerifyClick()
              setMenuOpen(false)
            }}
          >
            {t.nav.verify}
          </button>

          <a
            href="#how-it-works"
            className="header__mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {t.nav.howItWorks}
          </a>

        </div>
      )}
    </header>
  )
}
