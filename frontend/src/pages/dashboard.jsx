import { useNavigate } from 'react-router-dom'

import {
  AlertTriangle,
  ChevronRight,
  FileSearch,
  PackageCheck,
  Thermometer,
  Truck,
  Zap,
} from 'lucide-react'

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import PageHeader from '../components/common/pageheader'
import RiskBadge from '../components/common/riskbadge'
import StatCard from '../components/common/statcard'
import EmptyState from '../components/common/emptystate'
import Button from '../components/ui/button'

import {
  alerts,
  batches,
  riskData,
  stats,
  temperatureData,
} from '../data/mockData'

function Dashboard() {
  const navigate = useNavigate()

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Monitor pharmaceutical supply-chain risks and batch activity."
        action={
          <Button
            onClick={() =>
              navigate('/counterfeit')
            }
          >
            <Zap size={16} />
            New analysis
          </Button>
        }
      />

      <div className="stats-grid">
        {stats.map((item, index) => (
          <StatCard
            key={item.label}
            item={item}
            Icon={
              [
                PackageCheck,
                AlertTriangle,
                FileSearch,
                Thermometer,
              ][index]
            }
          />
        ))}
      </div>

      <div className="dashboard-grid">
        <section className="card chart-card wide">
          <div className="card-heading">
            <div>
              <h3>
                Temperature trend
              </h3>

              <p>
                Average readings across active
                cold-chain batches
              </p>
            </div>

            <span className="chart-legend">
              <i className="legend-dot blue" />
              Temperature
            </span>
          </div>

          <div className="chart">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart
                data={temperatureData}
              >
                <defs>
                  <linearGradient
                    id="tempFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#4f46e5"
                      stopOpacity=".2"
                    />

                    <stop
                      offset="100%"
                      stopColor="#4f46e5"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="#e2e8f0"
                  vertical={false}
                />

                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  domain={[0, 12]}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="temp"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  fill="url(#tempFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="card chart-card">
          <div className="card-heading">
            <div>
              <h3>
                Risk distribution
              </h3>

              <p>
                Current batch portfolio
              </p>
            </div>
          </div>

          <div className="donut-wrap">
            <ResponsiveContainer
              width="52%"
              height={170}
            >
              <PieChart>
                <Pie
                  data={riskData}
                  dataKey="value"
                  innerRadius={51}
                  outerRadius={72}
                  paddingAngle={3}
                >
                  {riskData.map(
                    (item) => (
                      <Cell
                        key={item.name}
                        fill={item.color}
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="donut-total">
              <strong>1,248</strong>
              <span>Batches</span>
            </div>
          </div>

          <div className="risk-legend">
            {riskData.map(
              (item) => (
                <div key={item.name}>
                  <span>
                    <i
                      style={{
                        background:
                          item.color,
                      }}
                    />

                    {item.name}
                  </span>

                  <strong>
                    {item.value}%
                  </strong>
                </div>
              )
            )}
          </div>
        </section>
      </div>

      <div className="dashboard-grid lower">
        <section className="card">
          <div className="card-heading">
            <div>
              <h3>
                Recent batch activity
              </h3>

              <p>
                Latest analyses from your workspace
              </p>
            </div>

            <button
              type="button"
              className="link-btn"
              onClick={() =>
                navigate('/history')
              }
            >
              View all
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="activity-list">
            {batches.length ? (
              batches
                .slice(0, 3)
                .map((batch) => (
                  <div
                    className="activity-row"
                    key={batch.id}
                  >
                    <div className="batch-icon">
                      <PackageCheck
                        size={17}
                      />
                    </div>

                    <div>
                      <strong>
                        {batch.id}
                      </strong>

                      <span>
                        {batch.medicine}
                      </span>
                    </div>

                    <RiskBadge
                      level={batch.risk}
                    />

                    <small>
                      Today
                    </small>
                  </div>
                ))
            ) : (
              <EmptyState
                title="No recent batch activity"
                message="There are no batch analyses available right now."
              />
            )}
          </div>
        </section>

        <section className="card">
          <div className="card-heading">
            <div>
              <h3>
                Recent alerts
              </h3>

              <p>
                Items requiring attention
              </p>
            </div>

            <button
              type="button"
              className="link-btn"
              onClick={() =>
                navigate('/alerts')
              }
            >
              View all
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="alert-list">
            {alerts.length ? (
              alerts
                .slice(0, 3)
                .map((alert) => (
                  <div
                    className="alert-row"
                    key={alert.id}
                  >
                    <div className="alert-dot">
                      <AlertTriangle
                        size={14}
                      />
                    </div>

                    <div>
                      <strong>
                        {alert.reason}
                      </strong>

                      <span>
                        {alert.id} ·{' '}
                        {alert.time}
                      </span>
                    </div>

                    <RiskBadge
                      level={alert.level}
                    />
                  </div>
                ))
            ) : (
              <EmptyState
                title="No alerts"
                message="There are no active alerts requiring attention."
              />
            )}
          </div>
        </section>
      </div>

      <section className="quick-actions">
        <h3>Quick actions</h3>

        <div>
          <button
            type="button"
            onClick={() =>
              navigate('/counterfeit')
            }
          >
            <FileSearch size={19} />
            <span>
              Analyze medicine
            </span>
            <ChevronRight size={16} />
          </button>

          <button
            type="button"
            onClick={() =>
              navigate('/temperature')
            }
          >
            <Thermometer size={19} />
            <span>
              Analyze temperature
            </span>
            <ChevronRight size={16} />
          </button>

          <button
            type="button"
            onClick={() =>
              navigate('/movement')
            }
          >
            <Truck size={19} />
            <span>
              Check batch movement
            </span>
            <ChevronRight size={16} />
          </button>
        </div>
      </section>
    </>
  )
}

export default Dashboard