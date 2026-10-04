import { Activity } from 'lucide-react'

export default function LoadingState({
  message = 'Loading...',
}) {
  return (
    <div className="empty-state">

      <Activity
        className="spin"
        size={18}
      />

      {message}

    </div>
  )
}