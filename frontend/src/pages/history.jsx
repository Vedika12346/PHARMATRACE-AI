import {
  useEffect,
  useState,
} from 'react'

import {
  ChevronRight,
  Search,
} from 'lucide-react'

import {
  useNavigate,
} from 'react-router-dom'

import PageHeader from '../components/common/pageheader'
import EmptyState from '../components/common/emptystate'
import LoadingState from '../components/common/loadingstate'
import RiskBadge from '../components/common/riskbadge'

import {
  getHistory,
} from '../services/api'

export default function History() {

  const [query, setQuery] =
    useState('')

  const [riskFilter, setRiskFilter] =
    useState('All')

  const [history, setHistory] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const navigate = useNavigate()

  useEffect(() => {

    const loadHistory =
      async () => {

        try {

          const response =
            await getHistory()

          setHistory(
            Array.isArray(
              response.data
            )
              ? response.data
              : []
          )

        } catch (error) {

          console.error(
            'Failed to load history:',
            error
          )

        } finally {

          setLoading(false)

        }

      }

    loadHistory()

  }, [])

  const rows =
    history.filter(
      (item) => {

        const matchesSearch =
          `${item.id || ''} ${
            item.medicine || ''
          }`
            .toLowerCase()
            .includes(
              query.toLowerCase()
            )

        const matchesRisk =
          riskFilter === 'All' ||
          item.risk === riskFilter

        return (
          matchesSearch &&
          matchesRisk
        )
      }
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
              onChange={(event) =>
                setQuery(
                  event.target.value
                )
              }
            />

          </div>

          <select
            value={riskFilter}
            onChange={(event) =>
              setRiskFilter(
                event.target.value
              )
            }
          >

            <option value="All">
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

        {loading ? (

          <LoadingState
            message="Loading history..."
          />

        ) : rows.length === 0 ? (

          <EmptyState
            message="No analysis history available."
          />

        ) : (

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
                        {item.medicine ||
                          '-'}
                      </td>

                      <td>
                        {item.counterfeit ??
                          '-'}
                      </td>

                      <td>
                        {item.temperature ??
                          '-'}
                      </td>

                      <td>
                        {item.movement ??
                          '-'}
                      </td>

                      <td>
                        <strong>
                          {item.score ??
                            item.final ??
                            '-'}
                        </strong>
                      </td>

                      <td>
                        <RiskBadge
                          level={
                            item.risk
                          }
                        />
                      </td>

                      <td>
                        {item.date ||
                          '-'}
                      </td>

                      <td>

                        <button
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

        )}

      </section>
    </>
  )
}