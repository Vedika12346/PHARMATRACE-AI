import { useNavigate } from 'react-router-dom'

import {
  ShieldCheck,
  Thermometer,
  Truck,
} from 'lucide-react'

import PageHeader from '../components/common/pageheader'
import RiskBadge from '../components/common/riskbadge'
import Button from '../components/ui/button'

export default function RiskAnalysis() {
  const navigate = useNavigate()

  const risks = [
    ['Counterfeit risk', 22, 'Low'],
    ['Temperature risk', 68, 'High'],
    ['Movement risk', 74, 'High'],
  ]

  return (
    <>
      <PageHeader
        title="Final risk analysis"
        subtitle="Combined pharmaceutical supply-chain risk assessment."
        action={
          <Button
            variant="secondary"
            onClick={() =>
              navigate('/counterfeit')
            }
          >
            Analyze another batch
          </Button>
        }
      />

      <div className="risk-cards">
        {risks.map(
          ([label, score, status]) => (
            <div
              className="card mini-risk"
              key={label}
            >
              <span>{label}</span>

              <strong>
                {score}
                <small>/ 100</small>
              </strong>

              <RiskBadge
                level={status}
              />

              <div className="progress">
                <i
                  style={{
                    width: `${score}%`,
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
            68 <small>/ 100</small>
          </div>

          <RiskBadge level="High" />

          <p>
            Temperature and movement signals
            require immediate review before
            distribution.
          </p>
        </div>

        <div className="radial-score">
          <div>
            <strong>68</strong>
            <span>HIGH RISK</span>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-heading">
          <div>
            <h3>
              Risk explanation
            </h3>

            <p>
              Signals contributing to the final
              assessment.
            </p>
          </div>
        </div>

        <div className="factor-grid">
          <div>
            <Thermometer />

            <strong>
              Temperature exceeded allowed range
            </strong>

            <span>
              +68 temperature risk
            </span>
          </div>

          <div>
            <Truck />

            <strong>
              Batch followed an unexpected route
            </strong>

            <span>
              +74 movement risk
            </span>
          </div>

          <div>
            <ShieldCheck />

            <strong>
              No major packaging mismatch
              detected
            </strong>

            <span>
              22 counterfeit risk
            </span>
          </div>
        </div>
      </section>
    </>
  )
}