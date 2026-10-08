import { useState } from 'react'

import {
  ChevronRight,
  Search,
} from 'lucide-react'

import {
  useNavigate,
} from 'react-router-dom'

import PageHeader from '../components/common/pageheader'
import RiskBadge from '../components/common/riskbadge'
import EmptyState from '../components/common/emptystate'

import {
  history,
} from '../data/mockData'

export default function History() {
  const [query, setQuery] =
    useState('')

  const navigate = useNavigate()

  const rows = history.filter(
    (item) =>
      `${item.id} ${item.medicine}`
        .toLowerCase()
        .includes(
          query.toLowerCase()
        )
  )

  return (
    <>
      <PageHeader
        title="Analysis history"
        subtitle="View previous pharmaceutical batch risk analyses."
      />

      <section className="card table-card">
        <div className="toolbar">
          <div className="search">
            <Search size={17} />

            <input
              placeholder="Search batch ID or medicine..."
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
            />
          </div>

          <select defaultValue="">
            <option value="">
              All risk levels
            </option>
            <option value="High">
              High
            </option>
            <option value="Medium">
              Medium
            </option>
            <option value="Low">
              Low
            </option>
          </select>
        </div>

        {rows.length ? (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Batch ID</th>
                  <th>Medicine</th>
                  <th>Counterfeit</th>
                  <th>Temperature</th>
                  <th>Movement</th>
                  <th>Final risk</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {rows.map(
                  (item) => (
                    <tr
                      key={item.id}
                    >
                      <td>
                        <strong>
                          {item.id}
                        </strong>
                      </td>

                      <td>
                        {item.medicine}
                      </td>

                      <td>
                        {item.counterfeit}
                      </td>

                      <td>
                        {item.temperature}
                      </td>

                      <td>
                        {item.movement}
                      </td>

                      <td>
                        <strong>
                          {item.score}
                        </strong>
                      </td>

                      <td>
                        <RiskBadge
                          level={item.risk}
                        />
                      </td>

                      <td>
                        {item.date}
                      </td>

                      <td>
                        <button
                          type="button"
                          className="row-action"
                          onClick={() =>
                            navigate(
                              `/history/${item.id}`
                            )
                          }
                        >
                          View details
                          <ChevronRight
                            size={13}
                          />
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
            title="No analysis history found"
            message="No batch matches your current search."
          />
        )}
      </section>
    </>
  )
}