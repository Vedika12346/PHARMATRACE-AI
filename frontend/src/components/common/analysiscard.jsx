import RiskBadge from './riskbadge'

export default function AnalysisCard({
  type,
  score,
  status,
  details,
}) {
  return (
    <section className="card result-card">

      <div className="result-top">

        <div>

          <span className="eyebrow">
            ANALYSIS RESULT
          </span>

          <h3>{type}</h3>

        </div>

        <RiskBadge
          level={status}
        />

      </div>

      <div className="score-row">

        <div
          className="score-ring"
          style={{
            '--score': `${
              Number(score || 0) *
              3.6
            }deg`,
          }}
        >

          <strong>
            {score ?? '--'}
          </strong>

          <span>/ 100</span>

        </div>

        <div>

          <h4>
            {status ||
              'Analysis completed'}
          </h4>

          <p>
            {details ||
              'Analysis completed using the pharmaceutical supply-chain analysis system.'}
          </p>

        </div>

      </div>

    </section>
  )
}