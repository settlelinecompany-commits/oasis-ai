'use client'

import { Plus, ChevronLeft, Search, Sparkles } from 'lucide-react'
import { useState } from 'react'

interface ChatHistoryProps {
  onCollapse?: () => void
  collapsed?: boolean
}

export default function ChatHistory({ onCollapse, collapsed = false }: ChatHistoryProps) {
  const [searchQuery, setSearchQuery] = useState('')

  if (collapsed) {
    return (
      <div className="w-12 bg-gray-100 border-r border-gray-300 flex flex-col items-center py-4">
        <button
          onClick={onCollapse}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    )
  }

  return (
    <div className="w-80 bg-gray-100 border-r border-gray-300 flex flex-col">
      {/* Top Bar Title */}
      <div className="px-4 py-3 border-b border-gray-300 bg-white">
        <p className="text-xs font-medium text-gray-700">Settleline • SalesGPT</p>
      </div>
      
      {/* SalesGPT Header with Logo */}
      <div className="px-4 py-4 border-b border-gray-300 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg flex items-center justify-center shadow-sm">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-base text-gray-900">SalesGPT</span>
        </div>
      </div>
      
      {/* New Chat Button & Previous Chats Section */}
      <div className="px-4 py-4 border-b border-gray-300 bg-white">
        <div className="flex items-center gap-2 mb-4">
          <button className="flex-1 bg-gray-800 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            New Chat
          </button>
          <button
            onClick={onCollapse}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="text-sm font-semibold text-gray-700 mb-2">Previous Chats</div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        <div className="text-center text-gray-500 text-sm py-8">
          No chats yet
        </div>
      </div>
    </div>
  )
}
