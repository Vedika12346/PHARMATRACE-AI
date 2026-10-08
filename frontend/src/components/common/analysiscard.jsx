import {
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react'

import RiskBadge from './riskbadge'

function AnalysisCard({
  result = 'REAL',
  confidence = 0,
  medicineName = 'Not detected',
  mfgDate = null,
  expDate = null,
}) {
  const suspicious =
    result === 'FAKE' ||
    result === 'SUSPICIOUS' ||
    result === 'FAKE / SUSPICIOUS'

  return (
    <section className="card analysis-result-card">

      <div className="result-header">
        <div>
          <span className="eyebrow">
            VISUAL SCREENING
          </span>

          <h3>Screening result</h3>
        </div>

        <RiskBadge
          level={
            suspicious
              ? 'Suspicious'
              : 'Genuine'
          }
        />
      </div>

      <div className="result-main">
        <div
          className={`result-icon ${
            suspicious
              ? 'suspicious'
              : 'genuine'
          }`}
        >
          {suspicious ? (
            <AlertTriangle size={27} />
          ) : (
            <CheckCircle2 size={27} />
          )}
        </div>

        <div className="result-content">
          <span className="result-label">
            VISUAL SCREENING
          </span>

          <h2>
            {suspicious
              ? 'FAKE / SUSPICIOUS'
              : 'REAL'}
          </h2>

          <p>
            {suspicious
              ? 'The package appearance shows signals associated with suspicious packaging.'
              : 'The package appearance is consistent with the patterns learned by the visual screening model.'}
          </p>
        </div>
      </div>

      <div className="confidence-container">
        <div className="confidence-header">
          <span>Confidence</span>

          <strong>
            {Number(confidence).toFixed(2)}%
          </strong>
        </div>

        <div className="confidence-track">
          <div
            className={`confidence-value ${
              suspicious
                ? 'suspicious'
                : 'genuine'
            }`}
            style={{
              width: `${Math.min(
                Math.max(
                  Number(confidence),
                  0
                ),
                100
              )}%`,
            }}
          />
        </div>
      </div>

      <div className="medicine-information">
        <div className="section-label">
          MEDICINE INFORMATION
        </div>

        <div className="medicine-grid">

          <div className="medicine-field full">
            <span>Medicine name</span>

            <strong>
              {medicineName || 'None'}
            </strong>
          </div>

          <div className="medicine-field">
            <span>MFG Date</span>

            <strong>
              {mfgDate || 'None'}
            </strong>
          </div>

          <div className="medicine-field">
            <span>EXP Date</span>

            <strong>
              {expDate || 'None'}
            </strong>
          </div>

          <div className="medicine-field full">
            <span>Detection status</span>

            <strong>
              Screening completed
            </strong>
          </div>

        </div>
      </div>

      <div className="verification-box">
        <ShieldCheck size={20} />

        <div>
          <strong>
            Further Verification Recommended
          </strong>

          <p>
            This is a preliminary AI screening
            result. Confirm authenticity through
            approved pharmaceutical verification
            procedures before making a final decision.
          </p>
        </div>
      </div>

    </section>
  )
}

export default AnalysisCard