import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import NewLayout from './components/layout/newlayout'

import Login from './pages/login'
import Dashboard from './pages/dashboard'
import Counterfeit from './pages/counterfeit'
import Temperature from './pages/temperature'
import Movement from './pages/movement'
import RiskAnalysis from './pages/riskanalysis'
import Alerts from './pages/alerts'
import History from './pages/history'
import Details from './pages/historydetails'


function Protected() {
  const isAuthenticated =
    localStorage.getItem(
      'pharmatrace-auth'
    )

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  return (
    <NewLayout>
      <Routes>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/counterfeit"
          element={<Counterfeit />}
        />

        <Route
          path="/temperature"
          element={<Temperature />}
        />

        <Route
          path="/movement"
          element={<Movement />}
        />

        <Route
          path="/risk-analysis"
          element={<RiskAnalysis />}
        />

        <Route
          path="/alerts"
          element={<Alerts />}
        />

        <Route
          path="/history"
          element={<History />}
        />

        <Route
          path="/history/:id"
          element={<Details />}
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />
      </Routes>
    </NewLayout>
  )
}


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/*"
          element={<Protected />}
        />
      </Routes>
    </BrowserRouter>
  )
}