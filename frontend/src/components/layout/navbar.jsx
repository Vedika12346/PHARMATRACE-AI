import {
  Bell,
  Menu,
} from 'lucide-react'

import {
  useLocation,
} from 'react-router-dom'

import { navItems } from './sidebar'

export default function Navbar({
  onMenu,
  alertCount,
}) {
  const location = useLocation()

  const title =
    navItems.find(
      ([to]) =>
        to === location.pathname
    )?.[1] ||
    (
      location.pathname.startsWith(
        '/history/'
      )
        ? 'Batch Analysis Details'
        : 'Dashboard'
    )

  return (
    <header className="navbar">

      <button
        className="icon-btn mobile-only"
        onClick={onMenu}
      >
        <Menu size={20} />
      </button>

      <div>

        <div className="eyebrow">
          PHARMATRACE / WORKSPACE
        </div>

        <h1>{title}</h1>

      </div>

      <div className="nav-actions">

        <button className="icon-btn notification">

          <Bell size={18} />

          {alertCount > 0 && <i />}

        </button>

        <div className="avatar">
          AR
        </div>

        <div className="desktop-user">

          <strong>
            Supply Chain Analyst
          </strong>

          <small>
            Analyst
          </small>

        </div>

      </div>

    </header>
  )
}