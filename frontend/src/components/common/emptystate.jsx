import { ClipboardList } from 'lucide-react'

export default function EmptyState({
  title = 'No data available',
  message = 'There is no information to display right now.',
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <ClipboardList size={22} />
      </div>

      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  )
}