'use client'

import DashboardLayout from '@/components/DashboardLayout'
import { UserSearch, Send, List as ListIcon, Building2, Sparkles, TrendingUp, ArrowRight, MessageSquare } from 'lucide-react'
import { useState } from 'react'

export default function SalesGPTPage() {
  const [query, setQuery] = useState('')

  const actionCards = [
    {
      icon: UserSearch,
      title: 'Research Agent',
      description: 'Find prospects and companies',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Send,
      title: 'Sequence Builder',
      description: 'Create email sequences',
      gradient: 'from-orange-400 to-yellow-400',
    },
    {
      icon: ListIcon,
      title: 'List Builder',
      description: 'Build prospect lists',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Building2,
      title: 'Market Research',
      description: 'Analyze markets & trends',
      gradient: 'from-emerald-500 to-teal-500',
    },
  ]

  return (
    <DashboardLayout>
      <div className="min-h-full bg-white">
        <div className="p-8">
          {/* Metric Cards - Top Row */}
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-4xl">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-blue-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">1,234</p>
                  <p className="text-xs text-gray-600 mt-0.5">Prospects</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-orange-50 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">48</p>
                  <p className="text-xs text-gray-600 mt-0.5">Active Sequences</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-green-50 rounded-lg">
                  <Sparkles className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">89%</p>
                  <p className="text-xs text-gray-600 mt-0.5">Open Rate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Cards Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8 max-w-4xl">
            {actionCards.map((card, index) => {
              const Icon = card.icon
              return (
                <button
                  key={index}
                  className="group relative p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all duration-200 text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${card.gradient} rounded-lg flex items-center justify-center shadow-sm`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        {card.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {card.description}
                      </p>
                      <div className="flex items-center gap-1 text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                        <span>Get started</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* AI Query Input */}
          <div className="max-w-4xl">
            <div className="relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="flex items-center gap-4 px-5 py-4">
                <div className="flex-shrink-0">
                  <div className="w-9 h-9 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask me anything... (e.g., 'Find tech companies in Dubai')"
                  className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-400"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && query.trim()) {
                      console.log('Query:', query)
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (query.trim()) {
                      console.log('Query:', query)
                    }
                  }}
                  disabled={!query.trim()}
                  className="flex-shrink-0 w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
            
            {/* Quick Suggestions */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500">Try:</span>
              {['Find prospects in tech', 'Create email sequence', 'Analyze market trends'].map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => setQuery(suggestion)}
                  className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
