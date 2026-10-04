import { useState } from 'react'

import {
  Activity,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
  Thermometer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import PageHeader from '../components/common/pageheader'
import UploadBox from '../components/common/uploadbox'
import EmptyState from '../components/common/emptystate'
import RiskBadge from '../components/common/riskbadge'
import Button from '../components/ui/button'

import {
  analyzeTemperature,
} from '../services/api'

export default function Temperature() {

  const [file, setFile] =
    useState(null)

  const [result, setResult] =
    useState(null)

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const run = async () => {

    if (!file) return

    setLoading(true)
    setError('')
    setResult(null)

    try {

      const response =
        await analyzeTemperature(
          file
        )

      setResult(
        response.data
      )

    } catch (err) {

      console.error(err)

      setError(
        'Unable to analyze the temperature file. Please check that the backend is running.'
      )

    } finally {

      setLoading(false)

    }
  }

  const records =
    result?.records ||
    result?.data ||
    []

  return (
    <>
      <PageHeader
        title="Cold-chain temperature analysis"
        subtitle="Upload a temperature log CSV to detect abnormal conditions."
      />

      <div className="analysis-layout">

        <section className="card form-card">

          <div className="section-title">

            <div className="step-num">
              01
            </div>

            <div>

              <h3>
                Upload temperature log
              </h3>

              <p>
                Analyze readings against the
                safe 2°C – 8°C range.
              </p>

            </div>

          </div>

          <UploadBox
            accept=".csv"
            kind="CSV log"
            selected={file}
            onFile={setFile}
          />

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <Button
            disabled={!file || loading}
            onClick={run}
          >

            {loading ? (
              <>
                <Activity
                  className="spin"
                  size={16}
                />
                Analyzing temperature data...
              </>
            ) : (
              <>
                <Thermometer
                  size={16}
                />
                Analyze temperature
              </>
            )}

          </Button>

        </section>

        {result && (
          <section className="card result-card">

            <div className="result-top">

              <div>

                <span className="eyebrow">
                  TEMPERATURE RISK SCORE
                </span>

                <h3>
                  {result.score ?? '--'}
                  <small>/ 100</small>
                </h3>

              </div>

              <RiskBadge
                level={
                  result.status ||
                  result.risk
                }
              />

            </div>

            {records.length > 0 ? (

              <div className="chart large">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <LineChart
                    data={records}
                  >

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
                      tickLine={false}
                      axisLine={false}
                    />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="temp"
                      stroke="#4f46e5"
                      strokeWidth={3}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            ) : (

              <EmptyState
                message="Temperature records were not returned by the backend."
              />

            )}

            <div className="stat-pills">

              {result.minimum != null && (
                <span>
                  <b>
                    {result.minimum}°C
                  </b>{' '}
                  Minimum
                </span>
              )}

              {result.maximum != null && (
                <span>
                  <b>
                    {result.maximum}°C
                  </b>{' '}
                  Maximum
                </span>
              )}

              {result.violationDuration && (
                <span>
                  <b>
                    {result.violationDuration}
                  </b>{' '}
                  Violation duration
                </span>
              )}

            </div>

          </section>
        )}

      </div>
    </>
  )
}