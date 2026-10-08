import { useState } from 'react'
import { Activity, Thermometer } from 'lucide-react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import PageHeader from '../components/common/pageheader'
import LoadingState from '../components/common/loadingstate'
import RiskBadge from '../components/common/riskbadge'
import UploadBox from '../components/common/uploadbox'
import Button from '../components/ui/button'
import { temperatureData } from '../data/mockData'
import { analyzeTemperature } from '../services/api'

function Temperature() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(false)
  const [loading, setLoading] = useState(false)

  const run = async () => {
    if (!file) return

    setLoading(true)
    try {
      await analyzeTemperature()
      setResult(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHeader
        title="Cold-chain temperature analysis"
        subtitle="Upload a temperature log CSV to detect abnormal conditions."
      />

      <div className="analysis-layout">
        <section className="card form-card">
          <div className="section-title">
            <div className="step-num">01</div>
            <div>
              <h3>Upload temperature log</h3>
              <p>Analyze readings against the safe 2°C – 8°C range.</p>
            </div>
          </div>

          <UploadBox
            accept=".csv"
            kind="CSV log"
            selected={file}
            onFile={setFile}
          />

          <Button disabled={!file || loading} onClick={run}>
            {loading ? (
              <>
                <Activity className="spin" size={16} />
                Analyzing temperature data...
              </>
            ) : (
              <>
                <Thermometer size={16} />
                Analyze temperature
              </>
            )}
          </Button>
        </section>

        {loading && <LoadingState message="Analyzing temperature data..." />}

        {result && !loading && (
          <section className="card result-card">
            <div className="result-top">
              <div>
                <span className="eyebrow">TEMPERATURE RISK SCORE</span>
                <h3>68 <small>/ 100</small></h3>
              </div>
              <RiskBadge level="Temperature Violation" />
            </div>

            <div className="chart large">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={temperatureData}>
                  <CartesianGrid stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="time" tickLine={false} axisLine={false} />
                  <YAxis domain={[0, 12]} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#fff', stroke: '#ef4444', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="stat-pills">
              <span><b>2.1°C</b> Minimum</span>
              <span><b>9.4°C</b> Maximum</span>
              <span><b>01h 48m</b> Violation duration</span>
            </div>
          </section>
        )}
      </div>
    </>
  )
}

export default Temperature
