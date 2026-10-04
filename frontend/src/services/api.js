import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
})

// Login
export const loginUser = (credentials) => {
  return api.post('/api/auth/login', credentials)
}

// Counterfeit medicine analysis
export const analyzeCounterfeit = (image) => {
  const formData = new FormData()
  formData.append('image', image)

  return api.post('/api/counterfeit/analyze', formData)
}

// Temperature analysis
export const analyzeTemperature = (file) => {
  const formData = new FormData()
  formData.append('file', file)

  return api.post('/api/temperature/analyze', formData)
}

// Batch movement analysis
export const analyzeMovement = (batchId) => {
  return api.post('/api/movement/analyze', {
    batchId,
  })
}

// Final risk analysis
export const getRiskAnalysis = (batchId) => {
  return api.get(`/api/risk-analysis/${batchId}`)
}

// Alerts
export const getAlerts = () => {
  return api.get('/api/alerts')
}

// History
export const getHistory = () => {
  return api.get('/api/history')
}

// History details
export const getHistoryDetails = (id) => {
  return api.get(`/api/history/${id}`)
}