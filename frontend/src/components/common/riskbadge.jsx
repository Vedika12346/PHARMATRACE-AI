import { Activity } from 'lucide-react'

export default function LoadingState({
  message = 'Loading...',
}) {
  return (
    <div className="loading-state">
      <Activity className="spin" size={20} />
      <span>{message}</span>
    </div>
  )
}