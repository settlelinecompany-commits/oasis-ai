'use client'

import { 
  Sparkles, 
  Search, 
  List, 
  Mail, 
  Phone, 
  Radio, 
  Globe, 
  Bot,
  BarChart3
} from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    {
      category: 'SalesGPT',
      items: [
        { label: 'Insights', icon: Sparkles, path: '/salesgpt' },
      ]
    },
    {
      category: 'Prospect',
      items: [
        { label: 'Prospect Search', icon: Search, path: '/salesgpt/prospects/search' },
        { label: 'Prospect Lists', icon: List, path: '/salesgpt/prospects/lists' },
      ]
    },
    {
      category: 'Engage',
      items: [
        { label: 'Campaigns', icon: Radio, path: '/salesgpt/campaigns' },
        { label: 'Inbox', icon: Mail, path: '/salesgpt/inbox' },
        { label: 'Power Dialer', icon: Phone, path: '/salesgpt/dialer' },
      ]
    },
    {
      category: 'Signals',
      items: [
        { label: 'Website Intent', icon: Globe, path: '/salesgpt/signals/website' },
        { label: 'Agents', icon: Bot, path: '/salesgpt/signals/agents' },
      ]
    },
  ]

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gray-100 text-gray-900 border-r border-gray-300">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-4 py-4 border-b border-gray-300">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">SALESGPT</h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {navItems.map((category) => (
            <div key={category.category}>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
                {category.category === 'SalesGPT' ? '' : category.category}
              </div>
              <div className="space-y-1">
                {category.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.path
                  return (
                    <button
                      key={item.label}
                      onClick={() => router.push(item.path)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-gray-200 text-gray-900 font-medium shadow-sm'
                          : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-gray-900' : 'text-gray-600'}`} />
                      <span className={`text-sm ${isActive ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Credits Section */}
        <div className="p-4 border-t border-gray-300">
          <div className="bg-white rounded-lg p-3 space-y-2 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-900 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">N</span>
                </div>
                <span className="text-xs font-medium text-gray-700">Credits</span>
              </div>
              <span className="text-xs px-2 py-0.5 bg-orange-500/10 text-orange-600 rounded font-medium">Hobby</span>
            </div>
            <div className="text-xs text-gray-500">
              Your free trial will expire on November 7th, 2025.
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-orange-400 to-yellow-400 h-2 rounded-full" style={{ width: '96%' }}></div>
            </div>
            <div className="text-xs text-gray-500 text-center">4.8k / 5k</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
