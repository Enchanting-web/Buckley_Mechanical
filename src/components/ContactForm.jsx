import { useState } from 'react'
import { databases, ID } from '../lib/appwrite'
import './ContactForm.css'

const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || ''
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID || ''

function ContactForm({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      if (DB_ID && COLLECTION_ID) {
        await databases.createDocument(DB_ID, COLLECTION_ID, ID.unique(), {
          name: form.name,
          email: form.email,
          phone: form.phone || '',
          message: form.message,
          submitted_at: new Date().toISOString(),
        })
      }
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          aria-label="Close contact form"
          onClick={onClose}
        >
          ✕
        </button>

        {status === 'success' ? (
          <div className="form-success">
            <span className="success-icon">✅</span>
            <h2>Message Sent!</h2>
            <p>Thanks, {form.name}! We&apos;ll be in touch shortly.</p>
            <button className="btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 id="contact-title">Request a Quote</h2>
            <p className="modal-sub">
              Fill in the form below and we&apos;ll get back to you within one
              business day.
            </p>

            {status === 'error' && (
              <p className="form-error">
                Something went wrong. Please try again or call us directly.
              </p>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Smith"
              />

              <label htmlFor="email">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="jane@example.com"
              />

              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="(555) 000-0000"
              />

              <label htmlFor="message">How can we help? *</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Describe your project or issue…"
              />

              <button
                className="btn-primary large"
                type="submit"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default ContactForm
