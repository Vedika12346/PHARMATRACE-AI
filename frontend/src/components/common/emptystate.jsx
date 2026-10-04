export default function EmptyState({
  message = 'No data available yet.',
}) {
  return (
    <div className="empty-state">
      {message}
    </div>
  )
}