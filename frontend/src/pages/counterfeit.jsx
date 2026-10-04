import { useState } from 'react'

import {
  Activity,
  CheckCircle2,
  ClipboardList,
  FileSearch,
  ShieldCheck,
} from 'lucide-react'

import PageHeader from '../components/common/pageheader'
import UploadBox from '../components/common/uploadbox'
import AnalysisCard from '../components/common/analysiscard'
import Button from '../components/ui/button'

import {
  analyzeCounterfeit,
} from '../services/api'

export default function Counterfeit() {

  const [file, setFile] =
    useState(null)

  const [loading, setLoading] =
    useState(false)

  const [result, setResult] =
    useState(null)

  const [error, setError] =
    useState('')

  const run = async () => {

    if (!file) return

    setLoading(true)
    setError('')
    setResult(null)

    try {

      const response =
        await analyzeCounterfeit(
          file
        )

      setResult(
        response.data
      )

    } catch (err) {

      console.error(err)

      setError(
        'Unable to analyze the medicine image. Please check that the backend is running.'
      )

    } finally {

      setLoading(false)

    }
  }

  return (
    <>
      <PageHeader
        title="Counterfeit medicine detection"
        subtitle="Upload a medicine package image to analyze authenticity."
      />

      <div className="analysis-layout">

        <section className="card form-card">

          <div className="section-title">

            <div className="step-num">
              01
            </div>

            <div>

              <h3>
                Upload package image
              </h3>

              <p>
                Use a clear image of the
                front packaging.
              </p>

            </div>

          </div>

          <UploadBox
            accept=".jpg,.jpeg,.png"
            kind="package image"
            selected={file}
            onFile={setFile}
          />

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <Button
            disabled={
              !file || loading
            }
            onClick={run}
          >

            {loading ? (
              <>
                <Activity
                  className="spin"
                  size={16}
                />
                Analyzing medicine package...
              </>
            ) : (
              <>
                <FileSearch
                  size={16}
                />
                Analyze medicine
              </>
            )}

          </Button>

        </section>

        {result && (
          <AnalysisCard
            type="Medicine authenticity"
            score={result.score}
            status={result.status}
            details={
              result.message ||
              result.reason
            }
          />
        )}

        <section className="card info-card">

          <div className="card-heading">

            <div>

              <h3>
                What we analyze
              </h3>

              <p>
                Our visual intelligence checks
                key authenticity signals.
              </p>

            </div>

          </div>

          <div className="info-grid">

            <div>

              <ShieldCheck size={18} />

              <strong>
                Packaging similarity
              </strong>

              <span>
                Compare visual patterns
                against trusted references.
              </span>

            </div>

            <div>

              <ClipboardList
                size={18}
              />

              <strong>
                OCR extraction
              </strong>

              <span>
                Read batch, date, and
                manufacturer details.
              </span>

            </div>

            <div>

              <CheckCircle2
                size={18}
              />

              <strong>
                Master data match
              </strong>

              <span>
                Validate extracted
                information.
              </span>

            </div>

          </div>

        </section>

      </div>
    </>
  )
}