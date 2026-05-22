import React from 'react'
import type { Translations } from '../utils/i18n'
import './Ticker.css'

interface Props {
  t: Translations
}

export const Ticker: React.FC<Props> = ({ t }) => {
  const items = [...t.ticker, ...t.ticker] // duplicate for seamless loop

  return (
    <div className="ticker">
      <div className="ticker__label">
        <span className="ticker__dot"></span>
        LIVE
      </div>
      <div className="ticker__track-wrap">
        <div className="ticker__track">
          {items.map((item, i) => (
            <span key={i} className="ticker__item">{item}</span>
          ))}
        </div>
      </div>
    </div>
  )
}