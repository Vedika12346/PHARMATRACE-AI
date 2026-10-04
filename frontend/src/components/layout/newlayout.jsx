import {
  useEffect,
  useState,
} from 'react'

import { getAlerts } from '../../services/api'

import Sidebar from './sidebar'
import Navbar from './navbar'

export default function Layout({
  children,
}) {
  const [open, setOpen] =
    useState(false)

  const [alertCount, setAlertCount] =
    useState(0)

  useEffect(() => {

    const loadAlertCount =
      async () => {

        try {

          const response =
            await getAlerts()

          const data =
            response.data

          if (Array.isArray(data)) {

            setAlertCount(
              data.filter(
                (item) =>
                  item.unread
              ).length
            )

          }

        } catch (error) {

          console.error(
            'Failed to load alerts:',
            error
          )

        }

      }

    loadAlertCount()

  }, [])

  return (
    <div className="app-shell">

      <Sidebar
        open={open}
        onClose={() =>
          setOpen(false)
        }
        alertCount={alertCount}
      />

      <div className="main-area">

        <Navbar
          onMenu={() =>
            setOpen(true)
          }
          alertCount={alertCount}
        />

        <main className="content">
          {children}
        </main>

      </div>

    </div>
  )
}