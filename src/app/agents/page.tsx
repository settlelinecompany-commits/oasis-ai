'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Bot, Building, UserSearch, MessageSquare, FileText, Wrench, Receipt, MapPin, ArrowRight } from 'lucide-react'

export default function Agents() {
  const [query, setQuery] = useState('')

  const suggestions = [
    {
      title: 'I want to automate tenant communication workflows',
      description: 'Set up automated responses for inquiries, lease renewals, and maintenance requests',
      icon: MessageSquare,
    },
    {
      title: 'I want to manage property listings and sync with portals',
      description: 'Import and manage listings on Bayut, Dubizzle, and Property Finder',
      icon: Building,
    },
    {
      title: 'I want to automate lead qualification and screening',
      description: 'Create workflows for prospect management, tenant screening, and viewing bookings',
      icon: UserSearch,
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      console.log('Query:', query)
      // Handle AI agent query here
    }
  }

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 bg-white min-h-screen w-full max-w-full">
        {/* AI Assistant Section */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-gradient-to-br from-sky-50 to-purple-50 border border-gray-200 rounded-xl p-8 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-sky-400 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  How would you like to use AI Agents today?
                </h2>
                <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-sky-100 to-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-sky-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Hi there! 👋 Tell me what you&apos;re working on and I&apos;ll help you get started with AI automation for property management. I can help create automated workflows, set up tenant communication, manage listings, qualify leads, and more.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">Suggestions to get started with:</p>
                  <div className="space-y-2">
                    {suggestions.map((suggestion, index) => {
                      const Icon = suggestion.icon
                      return (
                        <button
                          key={index}
                          onClick={() => setQuery(suggestion.title)}
                          className="w-full text-left bg-white border border-gray-200 rounded-lg p-4 hover:border-sky-300 hover:shadow-sm transition-all group"
                        >
                          <div className="flex items-start gap-3">
                            <Icon className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 mb-1 group-hover:text-sky-700 transition-colors">
                                {suggestion.title}
                              </div>
                              <div className="text-sm text-gray-600">{suggestion.description}</div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-sky-500 transition-colors flex-shrink-0" />
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Input Field */}
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Tell us what you want to build..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    disabled={!query.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-sky-400 to-purple-500 text-white rounded-lg font-semibold hover:from-sky-500 hover:to-purple-600 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Let&apos;s Go
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently used workflows</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-sky-50 to-purple-50 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-sky-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">Tenant Communication</div>
                    <div className="text-xs text-gray-500">Last used 2 days ago</div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-sky-50 to-purple-50 rounded-lg flex items-center justify-center">
                    <UserSearch className="w-5 h-5 text-sky-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">Lead Qualification</div>
                    <div className="text-xs text-gray-500">Last used 5 days ago</div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-sky-50 to-purple-50 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-sky-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">Listing Sync</div>
                    <div className="text-xs text-gray-500">Last used 1 week ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

