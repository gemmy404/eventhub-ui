import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext'
import type { RegisterRequest } from '../../types/auth'
import { getApiErrorMessage, getValidationMessages, validateRegistration, type FormErrors } from '../../utils/authValidation'

const initialValues: RegisterRequest = { name: '', email: '', password: '' }

export function RegisterPage() {
  const { register, isLoading } = useAuth()
  const navigate = useNavigate()
  const [values, setValues] = useState<RegisterRequest>(initialValues)
  const [errors, setErrors] = useState<FormErrors<RegisterRequest>>({})
  const [serverError, setServerError] = useState<string | undefined>()
  const [validationMessages, setValidationMessages] = useState<string[]>([])
  const [successMessage, setSuccessMessage] = useState<string | undefined>()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateRegistration(values)
    setErrors(nextErrors)
    setServerError(undefined)
    setValidationMessages([])
    if (Object.keys(nextErrors).length > 0) return
    try {
      const response = await register(values)
      setSuccessMessage(response.message ?? 'Registration successful. Please sign in.')
      window.setTimeout(() => navigate('/login'), 650)
    } catch (error: unknown) {
      setServerError(getApiErrorMessage(error))
      setValidationMessages(getValidationMessages(error))
    }
  }

  return <section className="auth-page" aria-labelledby="register-title"><div className="auth-card">
    <p className="eyebrow">Join EventHub</p><h1 id="register-title">Create your account</h1><p>Start exploring events in one simple place.</p>
    <form className="auth-form" noValidate onSubmit={handleSubmit}>
      {serverError && <div className="form-alert" role="alert"><p>{serverError}</p>{validationMessages.length > 0 && <ul>{validationMessages.map((message) => <li key={message}>{message}</li>)}</ul>}</div>}
      {successMessage && <div className="form-success" role="status">{successMessage}</div>}
      <label htmlFor="register-name">Name<input id="register-name" type="text" autoComplete="name" maxLength={50} value={values.name} onChange={(event) => setValues({ ...values, name: event.target.value })} aria-invalid={Boolean(errors.name)} /></label>
      {errors.name && <p className="field-error">{errors.name}</p>}
      <label htmlFor="register-email">Email<input id="register-email" type="email" autoComplete="email" maxLength={30} value={values.email} onChange={(event) => setValues({ ...values, email: event.target.value })} aria-invalid={Boolean(errors.email)} /></label>
      {errors.email && <p className="field-error">{errors.email}</p>}
      <label htmlFor="register-password">Password<input id="register-password" type="password" autoComplete="new-password" maxLength={20} value={values.password} onChange={(event) => setValues({ ...values, password: event.target.value })} aria-invalid={Boolean(errors.password)} /></label>
      {errors.password && <p className="field-error">{errors.password}</p>}
      <button className="button button--primary" type="submit" disabled={isLoading}>{isLoading ? 'Creating account…' : 'Register'}</button>
    </form>
    <p className="auth-card__switch">Already have an account? <Link to="/login">Sign in</Link></p>
  </div></section>
}
