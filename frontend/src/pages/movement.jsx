import { useState } from 'react'

import {
  AlertTriangle,
  Search,
} from 'lucide-react'

import PageHeader from '../components/common/pageheader'
import LoadingState from '../components/common/loadingstate'
import RiskBadge from '../components/common/riskbadge'
import Button from '../components/ui/button'

import {
  movementStages,
} from '../data/mockData'

import {
  analyzeMovement,
} from '../services/api'

export default function Movement() {
  const [batchId, setBatchId] =
    useState('PT-2026-00124')

  const [result, setResult] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  const run = async () => {
    if (!batchId.trim()) return

    setLoading(true)

    try {
      await analyzeMovement()
      setResult(true)
    } finally {
      setLoading(false)
    }
  }

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
            onChange={(e) =>
              setBatchId(e.target.value)
            }
            placeholder="Enter Batch ID"
          />

          <Button
            onClick={run}
            disabled={loading}
          >
            {loading ? (
              'Analyzing...'
            ) : (
              <>
                <Search size={16} />
                Analyze movement
              </>
            )}
          </Button>
        </div>
      </section>

      {loading && (
        <LoadingState
          message="Analyzing batch movement..."
        />
      )}

      {result && !loading && (
        <div className="movement-results">
          <section className="card">
            <div className="card-heading">
              <div>
                <h3>
                  Supply-chain journey
                </h3>

                <p>
                  Verified handoffs for{' '}
                  {batchId}
                </p>
              </div>

              <RiskBadge
                level="Suspicious Movement"
              />
            </div>

            <div className="timeline">
              {movementStages.map(
                (stage, index) => (
                  <div
                    className="timeline-item"
                    key={stage.stage}
                  >
                    <div className="timeline-marker">
                      <span>
                        {index + 1}
                      </span>
                    </div>

                    <div className="timeline-content">
                      <div>
                        <span className="eyebrow">
                          {stage.stage}
                        </span>

                        <h4>
                          {stage.org}
                        </h4>

                        <p>
                          {stage.location} ·{' '}
                          {stage.date}
                        </p>
                      </div>

                      <RiskBadge
                        level={
                          stage.status ===
                          'Flagged'
                            ? 'High'
                            : stage.status ===
                              'Delayed'
                            ? 'Medium'
                            : 'Low'
                        }
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </section>

          <section className="card anomaly-card">
            <span className="eyebrow">
              MOVEMENT ANOMALY SCORE
            </span>

            <div className="big-score">
              74 <small>/ 100</small>
            </div>

            <RiskBadge
              level="Suspicious Movement"
            />

            <p>
              Batch movement contains an
              unexpected destination and abnormal
              travel duration compared with the
              expected route.
            </p>

            <div className="factor-list">
              {[
                'Unexpected location',
                'Unknown distributor',
                'Unusual travel time',
                'Abnormal route',
              ].map((item) => (
                <span key={item}>
                  <AlertTriangle size={14} />
                  {item}
                </span>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  )
}