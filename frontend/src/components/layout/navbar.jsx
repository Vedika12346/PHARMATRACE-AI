import { Bell, Menu } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { navItems } from '../common/helper'

function Navbar({ onMenu }) {
  const location = useLocation()

  const title =
    navItems.find(([to]) => to === location.pathname)?.[1] ||
    (location.pathname.startsWith('/history/')
      ? 'Batch Analysis Details'
      : 'Dashboard')

  return (
    <header className="navbar">
      <button
        type="button"
        className="icon-btn mobile-only"
        onClick={onMenu}
      >
        <Menu size={20} />
      </button>

      <div>
        <div className="eyebrow">PHARMATRACE / WORKSPACE</div>
        <h1>{title}</h1>
      </div>

      <div className="nav-actions">
        <button type="button" className="icon-btn notification">
          <Bell size={18} />
          <i />
        </button>

        <div className="avatar">AR</div>

        <div className="desktop-user">
          <strong>Dr. Ananya Rao</strong>
          <small>Analyst</small>
        </div>
      </div>
    </header>
  )
}

export default Navbar
