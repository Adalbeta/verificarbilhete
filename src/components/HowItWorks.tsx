import React from 'react'
import type { Translations } from '../utils/i18n'
import './HowItWorks.css'

const ICONS = [
  // Step 1 - Form
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M9 12h14M9 16h10M9 20h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>,
  // Step 2 - Search / Check
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M20 20l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M11 14l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  // Step 3 - Shield / OK
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3L5 7.5v8.5c0 7.2 4.8 13.5 11 15 6.2-1.5 11-7.8 11-15V7.5L16 3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M11 16l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
]

interface Props {
  t: Translations
}

export const HowItWorks: React.FC<Props> = ({ t }) => {
  return (
    <section className="hiw" id="how-it-works">
      <div className="hiw__inner">
        <div className="hiw__header">
          <span className="hiw__tag">Process</span>
          <h2 className="hiw__title">{t.howItWorks.title}</h2>
          <p className="hiw__subtitle">{t.howItWorks.subtitle}</p>
        </div>

        <div className="hiw__steps">
          {t.howItWorks.steps.map((step, i) => (
            <div key={i} className="hiw__step" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="hiw__step-number">{String(i + 1).padStart(2, '0')}</div>
              <div className="hiw__step-icon">{ICONS[i]}</div>
              <h3 className="hiw__step-title">{step.title}</h3>
              <p className="hiw__step-desc">{step.desc}</p>
              {i < t.howItWorks.steps.length - 1 && (
                <div className="hiw__connector">
                  <svg viewBox="0 0 40 12" fill="none">
                    <path d="M0 6h36M30 1l6 5-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}