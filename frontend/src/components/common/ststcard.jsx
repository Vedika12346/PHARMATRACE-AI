export default function StatCard({
  item,
  Icon,
}) {
  return (
    <div className="stat-card">

      <div
        className={`stat-icon ${
          item.tone || ''
        }`}
      >
        <Icon size={19} />
      </div>

      <div>

        <span>
          {item.label}
        </span>

        <strong>
          {item.value}
        </strong>

        {item.change && (
          <small
            className={
              item.tone === 'rose'
                ? 'negative'
                : ''
            }
          >
            {item.change}
          </small>
        )}

      </div>

    </div>
  )
}