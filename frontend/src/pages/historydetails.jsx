import {
  useEffect,
  useState,
} from 'react'

import {
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

import {
  useNavigate,
  useParams,
} from 'react-router-dom'

import PageHeader from '../components/common/pageheader'
import EmptyState from '../components/common/emptystate'
import LoadingState from '../components/common/loadingstate'
import RiskBadge from '../components/common/riskbadge'
import AnalysisCard from '../components/common/analysiscard'
import Button from '../components/ui/button'

import {
  getHistoryDetails,
} from '../services/api'

export default function HistoryDetails() {

  const { id } = useParams()

  const navigate = useNavigate()

  const [item, setItem] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const loadDetails =
      async () => {

        try {

          const response =
            await getHistoryDetails(id)

          setItem(
            response.data
          )

        } catch (error) {

          console.error(
            'Failed to load history details:',
            error
          )

        } finally {

          setLoading(false)

        }

      }

    loadDetails()

  }, [id])

  if (loading) {

    return (
      <LoadingState
        message="Loading batch details..."
      />
    )

  }

  if (!item) {

    return (
      <EmptyState
        message="Batch details not found."
      />
    )

  }

  const temperatureRecords =
    item.temperatureRecords ||
    item.records ||
    []

  return (
    <>
      <PageHeader
        title="Batch analysis details"
        subtitle={`Complete risk assessment for ${item.id}.`}
        action={
          <Button
            variant="secondary"
            onClick={() =>
              navigate('/history')
            }
          >
            Back to history
          </Button>
        }
      />

      <div className="detail-grid">

        <section className="card">

          <span className="eyebrow">
            BATCH INFORMATION
          </span>

          <h3>
            {item.medicine ||
              'Medicine'}
          </h3>

          <div className="detail-facts">

            <span>
              <b>Batch ID</b>
              {item.id}
            </span>

            <span>
              <b>Manufacturer</b>
              {item.manufacturer ||
                '-'}
            </span>

            <span>
              <b>Current location</b>
              {item.location ||
                '-'}
            </span>

            <span>
              <b>Analysis date</b>
              {item.date ||
                '-'}
            </span>

          </div>

        </section>

        <section className="card">

          <div className="card-heading">

            <div>

              <h3>
                Risk summary
              </h3>

              <p>
                Signals from all
                analysis modules.
              </p>

            </div>

            <RiskBadge
              level={item.risk}
            />

          </div>

          <div className="summary-bars">

            {[
              [
                'Counterfeit',
                item.counterfeit,
              ],
              [
                'Temperature',
                item.temperature,
              ],
              [
                'Movement',
                item.movement,
              ],
              [
                'Final risk',
                item.score ??
                  item.final,
              ],
            ].map(
              ([label, value]) => (

                <div key={label}>

                  <span>

                    {label}

                    <b>
                      {value ?? '-'}
                      /100
                    </b>

                  </span>

                  <i>

                    <em
                      style={{
                        width: `${
                          value || 0
                        }%`,
                      }}
                    />

                  </i>

                </div>

              )
            )}

          </div>

        </section>

      </div>

      <div className="detail-grid">

        <AnalysisCard
          type="Counterfeit analysis"
          score={item.counterfeit}
          status={
            item.counterfeit != null
              ? item.counterfeit < 40
                ? 'Genuine'
                : 'Suspicious'
              : 'Unknown'
          }
        />

        <section className="card detail-panel">

          <span className="eyebrow">
            TEMPERATURE ANALYSIS
          </span>

          <h3>
            Cold-chain readings
          </h3>

          {temperatureRecords.length >
          0 ? (

            <div className="chart">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <LineChart
                  data={
                    temperatureRecords
                  }
                >

                  <CartesianGrid
                    stroke="#e2e8f0"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="time"
                    hide
                  />

                  <YAxis hide />

                  <Line
                    dataKey="temp"
                    stroke="#4f46e5"
                    strokeWidth={3}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          ) : (

            <EmptyState
              message="Temperature records are not available for this batch."
            />

          )}

          {item.temperature !=
            null && (

            <RiskBadge
              level={
                item.temperature >= 40
                  ? 'Temperature Violation'
                  : 'Low'
              }
            />

          )}

          {item.temperatureReason && (
            <p>
              {item.temperatureReason}
            </p>
          )}

        </section>

      </div>
    </>
  )
}