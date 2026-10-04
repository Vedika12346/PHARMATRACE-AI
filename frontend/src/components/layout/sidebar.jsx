import {
  Bell,
  BarChart3,
  ClipboardList,
  FileSearch,
  Home,
  LogOut,
  Thermometer,
  Truck,
  X,
} from 'lucide-react'

import {
  NavLink,
  useNavigate,
} from 'react-router-dom'

import Logo from './logo'

export const navItems = [
  ['/dashboard', 'Dashboard', Home],
  ['/counterfeit', 'Counterfeit Detection', FileSearch],
  ['/temperature', 'Temperature Analysis', Thermometer],
  ['/movement', 'Batch Movement', Truck],
  ['/risk-analysis', 'Risk Analysis', BarChart3],
  ['/alerts', 'Alerts', Bell],
  ['/history', 'History', ClipboardList],
]

export default function Sidebar({
  open,
  onClose,
  alertCount,
}) {
  const navigate = useNavigate()

  return (
    <>
      <aside className={`sidebar ${open ? 'open' : ''}`}>

        <div className="sidebar-top">

          <Logo />

          <button
            className="icon-btn mobile-only"
            onClick={onClose}
          >
            <X size={19} />
          </button>

        </div>

        <nav>

          {navItems.map(
            ([to, label, Icon]) => (
              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                className={({ isActive }) =>
                  isActive ? 'active' : ''
                }
              >
                <Icon size={18} />

                <span>{label}</span>

                {label === 'Alerts' &&
                  alertCount > 0 && (
                    <b className="nav-count">
                      {alertCount}
                    </b>
                  )}
              </NavLink>
            )
          )}

        </nav>

        <div className="sidebar-bottom">

          <div className="user-mini">

            <div className="avatar">
              AR
            </div>

            <div>
              <strong>
                Supply Chain Analyst
              </strong>

              <small>
                PharmaTrace User
              </small>
            </div>

          </div>

          <button
            className="logout"
            onClick={() => {
              localStorage.removeItem(
                'pharmatrace-auth'
              )

              localStorage.removeItem(
                'pharmatrace-token'
              )

              navigate('/login')
            }}
          >
            <LogOut size={17} />
            Log out
          </button>

        </div>

      </aside>

      {open && (
        <button
          className="scrim"
          onClick={onClose}
          aria-label="Close menu"
        />
      )}
    </>
  )
}