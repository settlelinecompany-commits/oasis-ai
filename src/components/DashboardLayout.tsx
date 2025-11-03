'use client'

import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { TourProvider, tourConfig } from '@/components/Tour'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <TourProvider {...tourConfig}>
      <div className="flex h-screen bg-gray-50">
        {/* Left Sidebar */}
        <div data-tour="sidebar">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col ml-64 overflow-hidden">
          {/* Top Bar */}
          <div data-tour="topbar">
            <Topbar />
          </div>

          {/* Main Content */}
          <main data-tour="main-content" className="flex-1 overflow-y-auto overflow-x-hidden bg-white w-full">
            {children}
          </main>
        </div>
      </div>
    </TourProvider>
  )
}

