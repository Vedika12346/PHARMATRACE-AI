import { useState } from 'react'
import Sidebar from './sidebar'
import Navbar from './navbar'

function NewLayout({ children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="app-shell">
      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
      />

      <div className="main-area">
        <Navbar onMenu={() => setOpen(true)} />
        <main className="content">{children}</main>
      </div>
    </div>
  )
}

export default NewLayout
