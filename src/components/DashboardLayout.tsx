'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import ChatHistory from './ChatHistory'
import { TourProvider, tourConfig, TourBadge } from './Tour'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [chatHistoryCollapsed, setChatHistoryCollapsed] = useState(false)

  return (
    <TourProvider {...tourConfig}>
      <div className="flex h-screen bg-gray-50">
        {/* Left Sidebar */}
        <div data-tour="sidebar">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col ml-64">
          {/* Top Bar */}
          <div data-tour="topbar">
            <Topbar />
          </div>

          {/* Content with Chat History */}
          <div className="flex-1 flex overflow-hidden">
            {/* Chat History Panel */}
            <div data-tour="chat-history">
              <ChatHistory
                collapsed={chatHistoryCollapsed}
                onCollapse={() => setChatHistoryCollapsed(!chatHistoryCollapsed)}
              />
            </div>

            {/* Main Content */}
            <main data-tour="main-content" className="flex-1 overflow-y-auto bg-white">
              {children}
            </main>
          </div>
        </div>
        
        {/* Tour Badge (Start Tour Button) */}
        <TourBadge />
      </div>
    </TourProvider>
  )
}

