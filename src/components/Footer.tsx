import React from 'react'
import type { Translations } from '../utils/i18n'
import './Footer.css'

interface Props {
  t: Translations
}

export const Footer: React.FC<Props> = ({ t }) => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <div className="footer__logo-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <span className="footer__logo-text">
              verificar<span>bilhete</span>
            </span>
          </div>
          <p className="footer__tagline">{t.footer.tagline}</p>
        </div>

        <div className="footer__links">
          <a href="#" className="footer__link">{t.footer.privacy}</a>
          <span className="footer__sep">·</span>
          <a href="#" className="footer__link">{t.footer.terms}</a>
        </div>

        <p className="footer__copy">
          © {year} VerificarBilhete. {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}