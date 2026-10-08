import { useState } from 'react'

import { Search } from 'lucide-react'

import PageHeader from '../components/common/pageheader'
import RiskBadge from '../components/common/riskbadge'
import EmptyState from '../components/common/emptystate'

import {
  alerts,
} from '../data/mockData'

export default function Alerts() {
  const [filter, setFilter] =
    useState('All')

  const [query, setQuery] =
    useState('')

  const [items, setItems] =
    useState(alerts)

  const filtered = items.filter(
    (item) =>
      (filter === 'All' ||
        item.level === filter) &&
      `${item.id} ${item.reason}`
        .toLowerCase()
        .includes(
          query.toLowerCase()
        )
  )

  return (
    <>
      <PageHeader
        title="Alerts"
        subtitle="Monitor high-risk and suspicious pharmaceutical batches."
      />

      <section className="card table-card">
        <div className="toolbar">
          <div className="search">
            <Search size={17} />

            <input
              placeholder="Search alerts..."
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
            />
          </div>

          <div className="filters">
            {[
              'All',
              'High',
              'Medium',
              'Low',
            ].map((item) => (
              <button
                type="button"
                className={
                  filter === item
                    ? 'selected'
                    : ''
                }
                onClick={() =>
                  setFilter(item)
                }
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {filtered.length ? (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Batch ID</th>
                  <th>Risk type</th>
                  <th>Risk level</th>
                  <th>Reason</th>
                  <th>Timestamp</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {filtered.map(
                  (alert) => (
                    <tr
                      key={alert.id}
                    >
                      <td>
                        <strong>
                          {alert.id}
                        </strong>
                      </td>

                      <td>
                        {alert.type}
                      </td>

                      <td>
                        <RiskBadge
                          level={
                            alert.level
                          }
                        />
                      </td>

                      <td>
                        {alert.reason}
                      </td>

                      <td>
                        {alert.time}
                      </td>

                      <td>
                        <span
                          className={
                            alert.unread
                              ? 'unread'
                              : 'read'
                          }
                        >
                          {alert.unread
                            ? 'Unread'
                            : 'Read'}
                        </span>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="row-action"
                          onClick={() =>
                            setItems(
                              items.map(
                                (item) =>
                                  item.id ===
                                  alert.id
                                    ? {
                                        ...item,
                                        unread:
                                          !item.unread,
                                      }
                                    : item
                              )
                            )
                          }
                        >
                          {alert.unread
                            ? 'Mark read'
                            : 'Mark unread'}
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No alerts found"
            message="No alerts match your current search or filter."
          />
        )}
      </section>
    </>
  )
}