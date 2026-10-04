import { riskClass } from './helper'

export default function RiskBadge({
  level,
}) {
  return (
    <span
      className={`risk-badge ${riskClass(
        level
      )}`}
    >
      <i />
      {level || 'Unknown'}
    </span>
  )
}