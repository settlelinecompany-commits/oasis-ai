'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import {
  MessageSquare,
  Users,
  UserSearch,
  TrendingUp,
  Calendar,
  Building,
  Phone,
  Mail,
  Globe,
  FileText,
  Wrench,
  Receipt,
  MapPin,
  Wallet,
  Coins,
  RotateCcw,
  Plus,
  Search,
  MoreVertical,
  Filter,
  ArrowRight,
} from 'lucide-react'

interface ServiceCard {
  icon: any
  title: string
  description: string
  category: 'rental' | 'operations' | 'lead' | 'communication'
}

interface Meeting {
  name: string
  date: string
  time: string
  type: 'PHONE CALL' | 'IN PERSON VISIT'
  location?: string
}

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 30 days')
  const [activeTab, setActiveTab] = useState<'meetings' | 'leads'>('meetings')

  // Service Cards organized by category
  const serviceCards: ServiceCard[] = [
    // Rental Management
    { icon: Receipt, title: 'Cheque Management', description: 'Rental cheque drop-off service, tracking, receipts', category: 'rental' },
    { icon: MapPin, title: 'Move-in/Move-out', description: 'Resident-led inspections, inventory tracking', category: 'rental' },
    { icon: RotateCcw, title: 'Renewals', description: 'Automated contract renewal management', category: 'rental' },
    { icon: Coins, title: 'Delinquency & Rent', description: 'Collect rent payments, track cheques', category: 'rental' },
    
    // Property Operations
    { icon: FileText, title: 'Contract Audits', description: 'Contract review, addendum drafting', category: 'operations' },
    { icon: Wrench, title: 'Maintenance', description: 'Streamline work orders, coordinate issues', category: 'operations' },
    { icon: Wallet, title: 'Fee Transparency', description: 'Track owner association fees', category: 'operations' },
    
    // Lead Management
    { icon: UserSearch, title: 'Prospect Management', description: 'Automate lead conversion, tenant screening', category: 'lead' },
    { icon: MapPin, title: 'AI-Guided Tours', description: 'Seamless and personalized AI-powered tours', category: 'lead' },
    { icon: Globe, title: 'Property Portal Sync', description: 'Sync listings with Bayut, Dubizzle', category: 'lead' },
    
    // Communication
    { icon: Phone, title: 'VoiceAI', description: 'Answer prospect and tenant calls 24/7', category: 'communication' },
    { icon: MessageSquare, title: 'WhatsApp', description: 'Automated WhatsApp messaging', category: 'communication' },
    { icon: Mail, title: 'Email Automation', description: 'Automated email responses', category: 'communication' },
  ]

  const meetings: Meeting[] = [
    { name: 'Mary Garcia', date: 'Today', time: '4:00PM', type: 'IN PERSON VISIT', location: 'Forest City Tower' },
    { name: 'Noura Fahim', date: 'Tomorrow', time: '10:00AM', type: 'PHONE CALL', location: 'Grand Bleu Tower' },
    { name: 'Ali Hassan', date: 'Tomorrow', time: '2:00PM', type: 'PHONE CALL' },
    { name: 'David Kim', date: 'May 2', time: '11:00AM', type: 'IN PERSON VISIT', location: 'Marina Vista Tower' },
    { name: 'Leila Hernandez', date: 'May 2', time: '3:00PM', type: 'PHONE CALL', location: 'Yasmina Villas' },
  ]

  const rentalCards = serviceCards.filter(c => c.category === 'rental')
  const operationsCards = serviceCards.filter(c => c.category === 'operations')
  const leadCards = serviceCards.filter(c => c.category === 'lead')
  const communicationCards = serviceCards.filter(c => c.category === 'communication')

  return (
    <DashboardLayout>
      <div className="p-8 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back Hakim, here&apos;s an overview of your activity.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <Search className="w-4 h-4" />
              <span className="text-sm font-medium">Update knowledge</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-400 to-purple-500 text-white rounded-lg font-semibold hover:from-sky-500 hover:to-purple-600 transition-all duration-200 shadow-sm hover:shadow-md">
              <Plus className="w-4 h-4" />
              <span>Add property</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Total Messages</span>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-xs text-gray-600 border border-gray-300 rounded px-2 py-1 bg-white"
            >
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Today</option>
            </select>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">3,296</div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>18%</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">Avg. 8 msgs/conv.</div>
            </div>
            <MessageSquare className="w-10 h-10 text-gray-300" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Total Conversations</span>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-xs text-gray-600 border border-gray-300 rounded px-2 py-1 bg-white"
            >
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Today</option>
            </select>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">412</div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>12%</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">44% became leads</div>
            </div>
            <Users className="w-10 h-10 text-gray-300" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Total Leads</span>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-xs text-gray-600 border border-gray-300 rounded px-2 py-1 bg-white"
            >
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Today</option>
            </select>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">181</div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>27%</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">60% booked a meeting</div>
            </div>
            <UserSearch className="w-10 h-10 text-gray-300" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Service Cards */}
        <div className="lg:col-span-2 space-y-8">
          {/* Rental Management Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Rental Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rentalCards.map((card, index) => {
                const Icon = card.icon
                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:border-sky-200 cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-sky-50 to-purple-50 rounded-lg flex items-center justify-center group-hover:from-sky-100 group-hover:to-purple-100 transition-colors">
                        <Icon className="w-6 h-6 text-gray-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{card.title}</h3>
                        <p className="text-sm text-gray-600">{card.description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-sky-500 transition-colors" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Property Operations Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Property Operations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {operationsCards.map((card, index) => {
                const Icon = card.icon
                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:border-sky-200 cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-sky-50 to-purple-50 rounded-lg flex items-center justify-center group-hover:from-sky-100 group-hover:to-purple-100 transition-colors">
                        <Icon className="w-6 h-6 text-gray-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{card.title}</h3>
                        <p className="text-sm text-gray-600">{card.description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-sky-500 transition-colors" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Lead Management Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Lead Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {leadCards.map((card, index) => {
                const Icon = card.icon
                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:border-sky-200 cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-sky-50 to-purple-50 rounded-lg flex items-center justify-center group-hover:from-sky-100 group-hover:to-purple-100 transition-colors">
                        <Icon className="w-6 h-6 text-gray-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{card.title}</h3>
                        <p className="text-sm text-gray-600">{card.description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-sky-500 transition-colors" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Communication Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Communication</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communicationCards.map((card, index) => {
                const Icon = card.icon
                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:border-sky-200 cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-sky-50 to-purple-50 rounded-lg flex items-center justify-center group-hover:from-sky-100 group-hover:to-purple-100 transition-colors">
                        <Icon className="w-6 h-6 text-gray-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{card.title}</h3>
                        <p className="text-sm text-gray-600">{card.description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-sky-500 transition-colors" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Meetings/Leads */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('meetings')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'meetings'
                    ? 'text-gray-900 border-b-2 border-sky-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Next Meetings
              </button>
              <button
                onClick={() => setActiveTab('leads')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'leads'
                    ? 'text-gray-900 border-b-2 border-sky-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Last Leads
              </button>
            </div>

            <div className="p-4 space-y-3">
              {activeTab === 'meetings' && meetings.map((meeting, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">{meeting.name}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>{meeting.date} - {meeting.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded font-medium">
                          {meeting.type}
                        </span>
                        {meeting.location && (
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Building className="w-3 h-3" />
                            <span>{meeting.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
              {activeTab === 'leads' && (
                <div className="text-center py-8 text-gray-500">
                  <UserSearch className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-sm">No recent leads</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </DashboardLayout>
  )
}

