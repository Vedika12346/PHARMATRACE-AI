import { useState } from 'react'

import { AlertTriangle } from 'lucide-react'

import { useNavigate } from 'react-router-dom'

import PageHeader from '../components/common/pageheader'
import RiskBadge from '../components/common/riskbadge'
import Button from '../components/ui/button'

import {
  getRiskAnalysis,
} from '../services/api'

export default function RiskAnalysis() {

  const navigate = useNavigate()

  const [batchId, setBatchId] =
    useState('')

  const [result, setResult] =
    useState(null)

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const runAnalysis = async () => {

    if (!batchId.trim()) return

    setLoading(true)
    setError('')

    try {

      const response =
        await getRiskAnalysis(
          batchId
        )

      setResult(
        response.data
      )

    } catch (err) {

      console.error(err)

      setError(
        'Unable to load risk analysis.'
      )

    } finally {

      setLoading(false)

    }
  }

  return (
    <>
      <PageHeader
        title="Final risk analysis"
        subtitle="Combined pharmaceutical supply-chain risk assessment."
        action={
          <Button
            variant="secondary"
            onClick={() =>
              navigate(
                '/counterfeit'
              )
            }
          >
            Analyze another batch
          </Button>
        }
      />

      <section className="card movement-input">

        <div>

          <span className="eyebrow">
            BATCH RISK LOOKUP
          </span>

          <h3>
            Enter a batch ID
          </h3>

        </div>

        <div className="input-action">

          <input
            value={batchId}
            onChange={(event) =>
              setBatchId(
                event.target.value
              )
            }
            placeholder="Enter Batch ID"
          />

          <Button
            onClick={runAnalysis}
            disabled={
              loading ||
              !batchId.trim()
            }
          >
            {loading
              ? 'Loading...'
              : 'Get risk analysis'}
          </Button>

        </div>

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

      </section>

      {result && (
        <>

          <div className="risk-cards">

            {[
              [
                'Counterfeit risk',
                result.counterfeit,
              ],
              [
                'Temperature risk',
                result.temperature,
              ],
              [
                'Movement risk',
                result.movement,
              ],
            ].map(
              ([label, score]) => (

                <div
                  className="card mini-risk"
                  key={label}
                >

                  <span>
                    {label}
                  </span>

                  <strong>

                    {score ?? '--'}

                    <small>
                      / 100
                    </small>

                  </strong>

                  <RiskBadge
                    level={
                      score >= 70
                        ? 'High'
                        : score >= 40
                          ? 'Medium'
                          : 'Low'
                    }
                  />

                  <div className="progress">

                    <i
                      style={{
                        width: `${
                          score || 0
                        }%`,
                      }}
                    />

                  </div>

                </div>

              )
            )}

          </div>

          <section className="card final-card">

            <div>

              <span className="eyebrow">
                FINAL RISK SCORE
              </span>

              <div className="final-score">

                {result.final ??
                  result.finalScore ??
                  '--'}

                <small>
                  / 100
                </small>

              </div>

              <RiskBadge
                level={
                  result.status ||
                  result.risk ||
                  'Unknown'
                }
              />

              <p>
                {result.reason ||
                  result.message ||
                  'Final risk assessment generated from the available supply-chain signals.'}
              </p>

            </div>

            <div className="radial-score">

              <div>

                <strong>
                  {result.final ??
                    result.finalScore ??
                    '--'}
                </strong>

                <span>
                  {result.status ||
                    result.risk ||
                    'RISK'}
                </span>

              </div>

            </div>

          </section>

          {Array.isArray(
            result.reasons
          ) &&
            result.reasons.length > 0 && (

              <section className="card">

                <div className="card-heading">

                  <div>

                    <h3>
                      Risk explanation
                    </h3>

                    <p>
                      Signals contributing
                      to the final assessment.
                    </p>

                  </div>

                </div>

                <div className="factor-grid">

                  {result.reasons.map(
                    (reason, index) => (

                      <div key={index}>

                        <AlertTriangle />

                        <strong>
                          {reason}
                        </strong>

                      </div>

                    )
                  )}

                </div>

              </section>

            )}

        </>
      )}

    </>
  )
}