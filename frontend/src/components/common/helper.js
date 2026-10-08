import {
  BarChart3,
  Bell,
  ClipboardList,
  FileSearch,
  Home,
  Thermometer,
  Truck,
} from 'lucide-react'

export const riskClass = (level = 'Low') => ({
  High: 'risk-high',
  Medium: 'risk-medium',
  Low: 'risk-low',
  Genuine: 'risk-low',
  Suspicious: 'risk-high',
  'Temperature Violation': 'risk-high',
  'Suspicious Movement': 'risk-high',
}[level] || 'risk-medium')

export const navItems = [
  ['/dashboard', 'Dashboard', Home],
  ['/counterfeit', 'Counterfeit Detection', FileSearch],
  ['/temperature', 'Temperature Analysis', Thermometer],
  ['/movement', 'Batch Movement', Truck],
  ['/risk-analysis', 'Risk Analysis', BarChart3],
  ['/alerts', 'Alerts', Bell],
  ['/history', 'History', ClipboardList],
]