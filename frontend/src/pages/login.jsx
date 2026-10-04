import { useState } from 'react'

import {
  Activity,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react'

import { useNavigate } from 'react-router-dom'

import Button from '../components/ui/button'
import Logo from '../components/layout/logo'

import { loginUser } from '../services/api'

export default function Login() {

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [error, setError] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const navigate = useNavigate()

  const submit = async (
    event
  ) => {

    event.preventDefault()

    if (!email || !password) {

      setError(
        'Enter your email and password to continue.'
      )

      return
    }

    setLoading(true)
    setError('')

    try {

      const response =
        await loginUser({
          email,
          password,
        })

      const token =
        response.data?.token

      if (token) {

        localStorage.setItem(
          'pharmatrace-token',
          token
        )

      }

      localStorage.setItem(
        'pharmatrace-auth',
        'true'
      )

      navigate('/dashboard')

    } catch (err) {

      console.error(err)

      setError(
        'Login failed. Please check your credentials and backend connection.'
      )

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className="login-page">

      <div className="login-panel">

        <Logo />

        <div className="login-copy">

          <span className="eyebrow">
            PHARMACEUTICAL INTELLIGENCE PLATFORM
          </span>

          <h1>
            See risk before it
            <br />
            <em>
              reaches the patient.
            </em>
          </h1>

          <p>
            PharmaTrace-AI helps your team
            monitor authenticity, cold-chain
            compliance, and batch movement in
            one secure workspace.
          </p>

        </div>

        <div className="login-note">

          <CheckCircle2 size={17} />

          Built for safer pharmaceutical
          supply chains

        </div>

      </div>

      <div className="login-form-wrap">

        <form
          className="login-form"
          onSubmit={submit}
        >

          <span className="eyebrow">
            WELCOME BACK
          </span>

          <h2>
            Sign in to your workspace
          </h2>

          <p>
            Enter your registered account
            credentials.
          </p>

          <label>

            Email address

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              placeholder="you@company.com"
            />

          </label>

          <label>

            Password

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Enter your password"
            />

          </label>

          <div className="form-options">

            <label className="check">

              <input
                type="checkbox"
              />

              Remember me

            </label>

            <button
              type="button"
              className="text-btn"
            >
              Forgot password?
            </button>

          </div>

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
          >

            {loading ? (
              <>
                <Activity
                  className="spin"
                  size={16}
                />

                Signing in...
              </>
            ) : (
              <>
                Sign in
                <ChevronRight
                  size={16}
                />
              </>
            )}

          </Button>

          <small className="demo-note">

            <ShieldCheck size={15} />

            Authentication is handled
            by the backend.

          </small>

        </form>

      </div>

    </div>
  )
}