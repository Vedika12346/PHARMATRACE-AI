import {
  LogOut,
  X,
} from 'lucide-react'

import {
  NavLink,
  useNavigate,
} from 'react-router-dom'

import Logo from './logo'
import { navItems } from '../common/helper'

export default function Sidebar({
  open,
  onClose,
}) {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem(
      'pharmatrace-auth'
    )

    navigate('/login')
  }

  return (
    <>
      <aside
        className={`sidebar ${
          open ? 'open' : ''
        }`}
      >
        <div className="sidebar-top">
          <Logo />

          <button
            type="button"
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
                className={({
                  isActive,
                }) =>
                  isActive ? 'active' : ''
                }
              >
                <Icon size={18} />

                <span>{label}</span>

                {label === 'Alerts' && (
                  <b className="nav-count">
                    3
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
                Dr. Ananya Rao
              </strong>

              <small>
                Supply Chain Analyst
              </small>
            </div>
          </div>

          <button
            type="button"
            className="logout"
            onClick={logout}
          >
            <LogOut size={17} />
            Log out
          </button>
        </div>
      </aside>

      {open && (
        <button
          type="button"
          className="scrim"
          onClick={onClose}
          aria-label="Close menu"
        />
      )}
    </>
  )
}