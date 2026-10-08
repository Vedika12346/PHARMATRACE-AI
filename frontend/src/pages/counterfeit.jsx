import { useState } from 'react'

import {
  AlertCircle,
  FileSearch,
  ShieldCheck,
  X,
} from 'lucide-react'

import PageHeader from '../components/common/pageheader'
import AnalysisCard from '../components/common/analysiscard'
import LoadingState from '../components/common/loadingstate'
import Button from '../components/ui/button'

function Counterfeit() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  // =========================
  // SELECT IMAGE
  // =========================
  const handleFile = (selectedFile) => {
    if (!selectedFile) return

    setError('')
    setResult(null)

    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
    ]

    // Validate file type
    if (!allowedTypes.includes(selectedFile.type)) {
      setError(
        'Please upload a JPG, JPEG or PNG image.'
      )
      return
    }

    // Validate file size
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError(
        'Image size should be less than 10 MB.'
      )
      return
    }

    setFile(selectedFile)

    const imageUrl =
      URL.createObjectURL(selectedFile)

    setPreview(imageUrl)
  }

  // =========================
  // REMOVE IMAGE
  // =========================
  const removeImage = () => {
    setFile(null)
    setPreview(null)
    setResult(null)
    setError('')
  }

  // =========================
  // ANALYZE MEDICINE
  // =========================
  const handleAnalyze = async () => {
    // Check if image exists
    if (!file) {
      setError(
        'Please upload a medicine package image first.'
      )
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      /*
       * TEMPORARY DEMO ANALYSIS
       *
       * This will later be replaced by your
       * actual backend API call.
       */

      await new Promise((resolve) => {
        setTimeout(resolve, 2000)
      })

      // Demo JSON response
      const response = {
        result: 'REAL',
        confidence: 61.42,

        medicineName:
          'Paracetamol, Propyphenazone and Caffeine Tablets',

        mfgDate: null,
        expDate: null,
      }

      // Display result
      setResult(response)

    } catch (err) {
      console.error(
        'Counterfeit analysis error:',
        err
      )

      setError(
        'Unable to analyze the image. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* =========================
          PAGE HEADER
      ========================== */}

      <PageHeader
        title="Counterfeit Medicine"
        subtitle="AI-based visual screening of pharmaceutical package images."
      />

      <div className="counterfeit-page">

        {/* =========================
            MAIN TWO COLUMN LAYOUT
        ========================== */}

        <div className="counterfeit-grid">

          {/* =================================
              LEFT SIDE - UPLOAD CARD
          ================================= */}

          <section className="card upload-card">

            {/* CARD HEADER */}
            <div className="card-heading">
              <div>
                <span className="eyebrow">
                  MEDICINE IMAGE
                </span>

                <h3>
                  Upload package image
                </h3>

                <p>
                  Upload a clear image of the
                  medicine package for visual
                  screening.
                </p>
              </div>
            </div>


            {/* =================================
                UPLOAD AREA
            ================================= */}

            {!file ? (

              /* -------------------------------
                 NO IMAGE SELECTED
              -------------------------------- */

              <label className="upload-box">

                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(event) => {
                    const selectedFile =
                      event.target.files?.[0] || null

                    handleFile(selectedFile)

                    // Allows selecting same file again
                    event.target.value = ''
                  }}
                />

                <div className="upload-icon">
                  <FileSearch size={26} />
                </div>

                <strong>
                  Upload medicine package
                </strong>

                <span>
                  Drag and drop or <u>browse</u>
                </span>

                <small>
                  JPG, JPEG, PNG · Maximum 10 MB
                </small>

              </label>

            ) : (

              /* -------------------------------
                 IMAGE SELECTED
              -------------------------------- */

              <div className="selected-image">

                {/* IMAGE HEADER */}
                <div className="selected-image-header">

                  <div>
                    <span className="eyebrow">
                      SELECTED IMAGE
                    </span>

                    <strong>
                      {file.name}
                    </strong>
                  </div>

                  {/* REMOVE IMAGE */}
                  <button
                    type="button"
                    className="remove-image"
                    onClick={removeImage}
                    aria-label="Remove image"
                  >
                    <X size={17} />
                  </button>

                </div>


                {/* IMAGE PREVIEW */}
                <div className="image-preview">

                  <img
                    src={preview}
                    alt="Uploaded medicine package"
                  />

                </div>

              </div>
            )}


            {/* =================================
                ACTION BUTTONS
                ALWAYS VISIBLE
            ================================= */}

            <div className="upload-actions">

              {/* CHANGE IMAGE */}
              {file && (
                <label
                  htmlFor="change-medicine-image"
                  className="change-image"
                >
                  Change image

                  <input
                    id="change-medicine-image"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    hidden
                    onChange={(event) => {
                      const selectedFile =
                        event.target.files?.[0] || null

                      handleFile(selectedFile)

                      event.target.value = ''
                    }}
                  />
                </label>
              )}


              {/* ANALYZE MEDICINE */}
              <Button
                type="button"
                onClick={handleAnalyze}
                disabled={loading}
              >
                <FileSearch size={16} />

                {loading
                  ? 'Analyzing...'
                  : 'Analyze medicine'}
              </Button>

            </div>


            {/* =================================
                ERROR MESSAGE
            ================================= */}

            {error && (
              <div className="screening-error">

                <AlertCircle size={17} />

                <span>
                  {error}
                </span>

              </div>
            )}

          </section>


          {/* =================================
              RIGHT SIDE - RESULT
          ================================= */}

          <div className="result-column">

            {/* -------------------------------
                LOADING STATE
            -------------------------------- */}

            {loading && (
              <section className="card result-placeholder">

                <LoadingState
                  message="Analyzing medicine package..."
                />

              </section>
            )}


            {/* -------------------------------
                RESULT AFTER ANALYSIS
            -------------------------------- */}

            {!loading && result && (
              <AnalysisCard
                result={result.result}
                confidence={result.confidence}
                medicineName={result.medicineName}
                mfgDate={result.mfgDate}
                expDate={result.expDate}
              />
            )}


            {/* -------------------------------
                INITIAL STATE
            -------------------------------- */}

            {!loading && !result && (
              <section className="card result-placeholder">

                <div className="placeholder-icon">
                  <ShieldCheck size={27} />
                </div>

                <span className="eyebrow">
                  VISUAL SCREENING
                </span>

                <h3>
                  Ready to analyze
                </h3>

                <p>
                  Upload a medicine package image
                  and click{' '}

                  <strong>
                    Analyze medicine
                  </strong>{' '}

                  to view the screening result.
                </p>

              </section>
            )}

          </div>

        </div>


        {/* =================================
            DISCLAIMER
        ================================= */}

        <section className="card screening-info">

          <div className="info-icon">
            <ShieldCheck size={21} />
          </div>

          <div>
            <h3>
              About visual screening
            </h3>

            <p>
              PharmaTrace-AI provides a preliminary
              visual screening of pharmaceutical
              packaging. The result should not be
              considered laboratory authentication.
            </p>
          </div>

        </section>

      </div>
    </>
  )
}

export default Counterfeit