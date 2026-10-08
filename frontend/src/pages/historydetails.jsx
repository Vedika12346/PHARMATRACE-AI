import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

import {
  useNavigate,
  useParams,
} from 'react-router-dom'

import PageHeader from '../components/common/pageheader'
import RiskBadge from '../components/common/riskbadge'
import AnalysisCard from '../components/common/analysiscard'
import Button from '../components/ui/button'

import {
  history,
  temperatureData,
} from '../data/mockData'

export default function Details() {
  const { id } = useParams()
  const navigate = useNavigate()

  const item =
    history.find(
      (record) => record.id === id
    ) || history[0]

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
            {item.medicine}
          </h3>

          <div className="detail-facts">
            <span>
              <b>Batch ID</b>
              {item.id}
            </span>

            <span>
              <b>Manufacturer</b>
              {item.manufacturer}
            </span>

            <span>
              <b>Current location</b>
              {item.location}
            </span>

            <span>
              <b>Analysis date</b>
              {item.date}
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
                Signals from all analysis
                modules.
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
                item.score,
              ],
            ].map(([label, value]) => (
              <div key={label}>
                <span>
                  {label}
                  <b>
                    {value}/100
                  </b>
                </span>

                <i>
                  <em
                    style={{
                      width: `${value}%`,
                    }}
                  />
                </i>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="detail-grid">
        <AnalysisCard
          type="Counterfeit analysis"
          score={item.counterfeit}
          status={
            item.counterfeit < 40
              ? 'Genuine'
              : 'Suspicious'
          }
        />

        <section className="card detail-panel">
          <span className="eyebrow">
            TEMPERATURE ANALYSIS
          </span>

          <h3>
            Cold-chain readings
          </h3>

          <div className="chart">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={temperatureData}
              >
                <CartesianGrid
                  stroke="#e2e8f0"
                  vertical={false}
                />

                <XAxis
                  dataKey="time"
                  hide
                />

                <YAxis
                  hide
                  domain={[0, 12]}
                />

                <Line
                  dataKey="temp"
                  stroke="#4f46e5"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <RiskBadge
            level="Temperature Violation"
          />

          <p>
            Temperature exceeded the allowed
            range for 1h 48m.
          </p>
        </section>
      </div>
    </>
  )
}