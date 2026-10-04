export const riskClass = (
  level = 'Low'
) => ({
  High: 'risk-high',
  Medium: 'risk-medium',
  Low: 'risk-low',
  Genuine: 'risk-low',
  Suspicious: 'risk-high',
  'Temperature Violation':
    'risk-high',
  'Suspicious Movement':
    'risk-high',
}[level] || 'risk-medium')
