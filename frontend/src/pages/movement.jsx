import { useState } from 'react'

import {
  Activity,
  AlertTriangle,
  Search,
} from 'lucide-react'

import PageHeader from '../components/common/pageheader'
import EmptyState from '../components/common/emptystate'
import RiskBadge from '../components/common/riskbadge'
import Button from '../components/ui/button'

import {
  analyzeMovement,
} from '../services/api'

export default function Movement() {

  const [batchId, setBatchId] =
    useState('')

  const [result, setResult] =
    useState(null)

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const run = async () => {

    if (!batchId.trim()) return

    setLoading(true)
    setError('')
    setResult(null)

    try {

      const response =
        await analyzeMovement(
          batchId
        )

      setResult(
        response.data
      )

    } catch (err) {

      console.error(err)

      setError(
        'Unable to analyze batch movement. Please check that the backend is running.'
      )

    } finally {

      setLoading(false)

    }
  }

  const stages =
    result?.stages ||
    result?.movementStages ||
    []

  return (
    <>
      <PageHeader
        title="Suspicious batch movement"
        subtitle="Analyze pharmaceutical batch movement across the supply chain."
      />

      <section className="card movement-input">

        <div>

          <span className="eyebrow">
            BATCH LOOKUP
          </span>

          <h3>
            Enter a batch ID to begin
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
            onClick={run}
            disabled={
              loading ||
              !batchId.trim()
            }
          >

            {loading ? (
              <>
                <Activity
                  className="spin"
                  size={16}
                />
                Analyzing...
              </>
            ) : (
              <>
                <Search size={16} />
                Analyze movement
              </>
            )}

          </Button>

        </div>

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

      </section>

      {result && (

        <div className="movement-results">

          <section className="card">

            <div className="card-heading">

              <div>

                <h3>
                  Supply-chain journey
                </h3>

                <p>
                  Batch movement for{' '}
                  {batchId}
                </p>

              </div>

              <RiskBadge
                level={
                  result.status ||
                  result.risk
                }
              />

            </div>

            {stages.length > 0 ? (

              <div className="timeline">

                {stages.map(
                  (stage, index) => (

                    <div
                      className="timeline-item"
                      key={
                        stage.stage ||
                        index
                      }
                    >

                      <div className="timeline-marker">

                        <span>
                          {index + 1}
                        </span>

                      </div>

                      <div className="timeline-content">

                        <div>

                          <span className="eyebrow">
                            {stage.stage ||
                              'Supply Chain Stage'}
                          </span>

                          <h4>
                            {stage.org ||
                              stage.organization ||
                              'Organization'}
                          </h4>

                          <p>

                            {stage.location ||
                              'Location not available'}

                            {stage.date &&
                              ` · ${stage.date}`}

                          </p>

                        </div>

                        <RiskBadge
                          level={
                            stage.status ||
                            'Low'
                          }
                        />

                      </div>

                    </div>

                  )
                )}

              </div>

            ) : (

              <EmptyState
                message="No movement stages were returned."
              />

            )}

          </section>

          <section className="card anomaly-card">

            <span className="eyebrow">
              MOVEMENT ANOMALY SCORE
            </span>

            <div className="big-score">

              {result.score ?? '--'}

              <small>
                / 100
              </small>

            </div>

            <RiskBadge
              level={
                result.status ||
                result.risk
              }
            />

            <p>
              {result.reason ||
                result.message ||
                'Movement analysis completed.'}
            </p>

            {Array.isArray(
              result.factors
            ) &&
              result.factors.length > 0 && (

                <div className="factor-list">

                  {result.factors.map(
                    (factor) => (

                      <span key={factor}>

                        <AlertTriangle
                          size={14}
                        />

                        {factor}

                      </span>

                    )
                  )}

                </div>

              )}

          </section>

        </div>

      )}

    </>
  )
}