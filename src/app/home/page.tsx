'use client'

import LandingHeader from '@/components/LandingHeader'
import {
  UserSearch,
  MapPin,
  FileText,
  Wallet,
  Wrench,
  Smartphone,
  Coins,
  RotateCcw,
  Phone,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  MessageSquare,
  Globe,
  Calendar,
  Mail,
  Check,
  X,
  Receipt,
  Home,
} from 'lucide-react'
import { useState } from 'react'

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<number>(2) // Voice tab is default active

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // Product Suite Cards - Ordered by agent interview priorities
  const productCards = [
    {
      icon: Receipt,
      title: 'Cheque Management',
      description: 'Rental cheque drop-off service, tracking, receipts, and bounced cheque penalty handling.',
    },
    {
      icon: Home,
      title: 'Move-in/Move-out Inspection',
      description: 'Resident-led inspections, inventory tracking with photos, and wear & tear documentation.',
    },
    {
      icon: FileText,
      title: 'Contract Audits',
      description: 'Contract review, addendum drafting, and compliance checking with AI-driven accuracy.',
    },
    {
      icon: Wrench,
      title: 'Maintenance',
      description: 'Streamline work orders, coordinate AC & water heater issues, and manage major/minor thresholds.',
    },
    {
      icon: Coins,
      title: 'Delinquency & Rent Collection',
      description: 'Collect rent payments, track cheques, reduce late payments with smart reminders.',
    },
    {
      icon: RotateCcw,
      title: 'Renewals',
      description: 'Automated contract renewal management, vacancy notices, and tenant retention.',
    },
    {
      icon: UserSearch,
      title: 'Prospect Management',
      description: 'Automate lead conversion, tenant screening, and property viewing bookings.',
    },
    {
      icon: Wallet,
      title: 'Fee Transparency',
      description: 'Track owner association fees, service charges, DEWA, and property management fees.',
    },
    {
      icon: Globe,
      title: 'Property Portal Sync',
      description: 'Sync listings with Bayut, Dubizzle & Property Finder.',
    },
    {
      icon: MapPin,
      title: 'AI-Guided Tours',
      description: 'Seamless and personalized AI-powered property tours.',
    },
    {
      icon: Phone,
      title: 'VoiceAI',
      description: 'Answer prospect and tenant calls 24/7.',
    },
  ]

  // Why Choose Pillars
  const pillars = [
    {
      icon: CheckCircle,
      title: 'Automate at Scale',
      description: 'Simplify processes by automating responses, scheduling, and follow-ups, freeing your team to focus on strategic, high-impact tasks.',
    },
    {
      icon: CheckCircle,
      title: 'Personalized Experiences',
      description: 'Craft customized interactions that address the unique needs of every renter, ensuring a human touch at scale.',
    },
    {
      icon: CheckCircle,
      title: 'Centralized Solutions',
      description: 'Manage all communications and operations within a single, unified platform for maximum efficiency and clarity.',
    },
    {
      icon: CheckCircle,
      title: '24/7 Availability',
      description: 'Provide round-the-clock support, ensuring customers and tenants receive instant responses whenever they need assistance.',
    },
  ]

  // FAQ Items
  const faqs = [
    {
      question: 'What is the OasisAI platform?',
      answer: 'OasisAI centralizes operations and communications—managing tours, scheduling, maintenance, renewals, delinquency, and reporting—in a unified hub called OasisCRM.',
    },
    {
      question: 'Which industries does OasisAI serve?',
      answer: 'OasisAI supports property management companies, real estate agencies, and property owners across the UAE, including Dubai, Abu Dhabi, and other emirates.',
    },
    {
      question: 'What channels of communication does OasisAI support?',
      answer: 'OasisAI works across voice (calls), SMS, email, and web chat to provide 24/7 support to prospects and tenants alike.',
    },
    {
      question: 'How does OasisAI integrate with existing systems?',
      answer: 'The platform syncs with leading property management systems (PMS) and CRMs, auto-imports data, and reduces manual handoffs through self-learning capabilities.',
    },
    {
      question: 'What is OasisCRM?',
      answer: 'OasisCRM is an AI-powered CRM designed for property management that centralizes prospect and tenant data, streamlines communications, and automates workflows across your portfolio.',
    },
    {
      question: 'How does OasisAI manage maintenance requests?',
      answer: 'OasisAI\'s platform triages, categorizes, and routes maintenance requests automatically while allowing for escalation when needed.',
    },
    {
      question: 'What does "renewals & delinquency" automation include?',
      answer: 'OasisAI proactively reaches out to tenants on lease renewals, handles payment reminders, explains late fees, and coordinates follow-up workflows, decreasing bad debt, increasing renewal velocity, and securing promises to pay.',
    },
    {
      question: 'Does OasisAI support self-guided or AI-guided tours?',
      answer: 'Yes — OasisAI\'s tools automate tour scheduling and management, with purpose-built AI Guided Tours capabilities that leverage AI to guide prospects through your properties in real time.',
    },
    {
      question: 'How does OasisAI help with UAE property compliance?',
      answer: 'For UAE properties, OasisAI screens, qualifies, and schedules prospects, manages documents, ensures regulatory compliance, and automates documentation workflows.',
    },
    {
      question: 'Can OasisAI scale across multiple properties or portfolios?',
      answer: 'Absolutely — the platform is designed with centralization in mind, enabling management across multiple properties, owner operators, and property management portfolios throughout the UAE.',
    },
    {
      question: 'What kind of ROI can a client expect?',
      answer: 'OasisAI\'s clients have reported reductions in staffing costs, faster leasing cycles, decreased marketing spend, increased conversion rates, lower delinquency rates, and improved operational efficiency, as well as increases in onsite staff retention and improved renewal rates.',
    },
    {
      question: 'How does OasisAI support centralized operations?',
      answer: 'OasisAI enables back-office centralization by shifting site-level tasks—like leasing, tenant inquiries, and maintenance workflows—into a unified, remote infrastructure powered by agentic AI.',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative bg-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Always-On Automation for Centralized Property Operations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Seamlessly integrate with Bayut, Dubizzle, ZohoCRM, and WhatsApp to capture, qualify, and convert leads 24/7.
          </p>
          <div className="mt-10">
            <a
              href="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-sky-400 to-purple-500 text-white font-semibold rounded-lg hover:from-sky-500 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Product Suite Section */}
      <section id="platform" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Product suite</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Agentic AI that Powers Every Stage of the Tenant Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Harness agentic AI to transform every tenant interaction into a seamless, efficient, and personalized experience, reducing costs while elevating performance.
            </p>
          </div>

          {/* 3x3 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {productCards.map((card, index) => {
              const Icon = card.icon
              return (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <Icon className="w-8 h-8 text-gray-900 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{card.description}</p>
                  <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-700 inline-flex items-center gap-1">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Integrations</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Connected to your ecosystem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Bayut to ZohoCRM, OasisAI syncs instantly with the tools you already use.
            </p>
          </div>

          {/* Integrations Diagram - Matching attached image */}
          <div className="max-w-6xl mx-auto mt-12">
            <div className="bg-gradient-to-b from-sky-100 to-purple-100 rounded-2xl p-12 shadow-xl relative">
              {/* Connection lines (visual representation) - Behind everything */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="none">
                  {/* Lines from center (400, 200) to each integration card - horizontal lines */}
                  {/* Left column - 4 cards */}
                  <line x1="400" y1="200" x2="180" y2="80" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" />
                  <line x1="400" y1="200" x2="180" y2="140" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" />
                  <line x1="400" y1="200" x2="180" y2="200" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" />
                  <line x1="400" y1="200" x2="180" y2="260" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" />
                  {/* Right column - 4 cards */}
                  <line x1="400" y1="200" x2="620" y2="80" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" />
                  <line x1="400" y1="200" x2="620" y2="140" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" />
                  <line x1="400" y1="200" x2="620" y2="200" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" />
                  <line x1="400" y1="200" x2="620" y2="260" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" />
                </svg>
              </div>

              {/* Central OasisAI Box - Horizontal, centered */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="bg-blue-700 rounded-lg px-8 py-4 shadow-2xl">
                  <span className="text-2xl font-bold text-white">OasisAI</span>
                </div>
              </div>

              {/* Integration Cards - Two vertical columns, 4 cards each */}
              <div className="relative flex justify-between items-start z-10 min-h-[400px] pt-8">
                {/* Left Column - 4 cards */}
                <div className="flex flex-col gap-4 w-[200px]">
                  <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-blue-600">B</span>
                      </div>
                      <span className="font-semibold text-gray-900 text-sm lowercase">bayut</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="font-semibold text-gray-900 text-sm">Property Finder</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-blue-600">Z</span>
                      </div>
                      <span className="font-semibold text-gray-900 text-sm">ZohoCRM</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                        <Globe className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-semibold text-gray-900 text-sm">Website</span>
                    </div>
                  </div>
                </div>

                {/* Right Column - 4 cards */}
                <div className="flex flex-col gap-4 w-[200px]">
                  <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-blue-600">D</span>
                      </div>
                      <span className="font-semibold text-gray-900 text-sm lowercase">dubizzle</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-semibold text-gray-900 text-sm">WhatsApp</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-semibold text-gray-900 text-sm">Outlook</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-semibold text-gray-900 text-sm">Calendar</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Omnichannel Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-4">
              CONSISTENT, CONNECTED CONVERSATIONS
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Omnichannel Automation, Singular Intelligence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              OasisAI seamlessly manages conversations across WhatsApp, email, chat, and voice, so renters get consistent, instant answers without ever repeating themselves.
            </p>
          </div>

          {/* Communication Interface Simulation */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-gradient-to-b from-sky-100 to-purple-100 rounded-2xl p-8 shadow-xl">
              {/* Tabs */}
              <div className="flex gap-4 mb-6">
                {['Email', 'WhatsApp', 'Voice', 'Chat'].map((tab, index) => {
                  const isActive = activeTab === index
                  
                  // All tabs use black text when inactive, white background when active
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(index)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-900 bg-transparent hover:text-gray-900'
                      }`}
                    >
                      {tab}
                    </button>
                  )
                })}
              </div>

              {/* Content Area - Changes based on active tab */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8">
                {/* Email Interface (activeTab === 0) */}
                {activeTab === 0 && (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">New Message</h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-gray-500">To:</span> <span className="text-gray-900 font-medium">Hannah S.</span>
                        </div>
                        <div>
                          <span className="text-gray-500">From:</span> <span className="text-gray-900 font-medium">OasisAI</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">Subject:</span> 
                          <span className="text-gray-900 font-medium">Unit 4C - Application</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <p className="text-gray-900 mb-2">
                        Hi, Hannah! We're happy you'd like to make this your new home. You can apply at: auraestates.com/apply
                      </p>
                      <p className="text-gray-900">
                        The application takes about 20 minutes to complete. Please have your ID and income documents ready. Let me know if you have any questions!
                      </p>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-sky-400 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-sky-500 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl">
                      Send
                    </button>
                  </div>
                )}

                {/* WhatsApp Interface (activeTab === 1) */}
                {activeTab === 1 && (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp with OasisAI</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Automatically replies to Bayut & Dubizzle WhatsApp inquiries • Qualifies leads and books viewings 24/7
                      </p>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      {/* User message (green bubble) */}
                      <div className="flex justify-start">
                        <div className="bg-green-500 rounded-lg p-3 max-w-xs rounded-tl-none">
                          <p className="text-white text-sm">Hi! I saw your listing on Bayut. Is this 2BR available?</p>
                          <p className="text-xs text-green-100 mt-1">10:23 AM</p>
                        </div>
                      </div>
                      
                      {/* OasisAI message (gradient bubble) */}
                      <div className="flex justify-end">
                        <div className="bg-gradient-to-r from-sky-400 to-purple-500 rounded-lg p-3 max-w-xs rounded-tr-none text-white">
                          <p className="text-sm">Yes! The 2BR apartment is available for AED 85,000/year. Would you like to schedule a viewing?</p>
                          <p className="text-xs text-white/80 mt-1">10:23 AM ✓✓</p>
                        </div>
                      </div>
                      
                      {/* User message */}
                      <div className="flex justify-start">
                        <div className="bg-green-500 rounded-lg p-3 max-w-xs rounded-tl-none">
                          <p className="text-white text-sm">Yes, I'm interested. When can we see it?</p>
                          <p className="text-xs text-green-100 mt-1">10:24 AM</p>
                        </div>
                      </div>
                      
                      {/* OasisAI message */}
                      <div className="flex justify-end">
                        <div className="bg-gradient-to-r from-sky-400 to-purple-500 rounded-lg p-3 max-w-xs rounded-tr-none text-white">
                          <p className="text-sm">Great! I have availability tomorrow at 3 PM or Friday at 11 AM. Which works better for you?</p>
                          <p className="text-xs text-white/80 mt-1">10:24 AM ✓✓</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 border-t border-gray-200 pt-4">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                      />
                      <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Voice Call Interface (activeTab === 2) */}
                {activeTab === 2 && (
                  <div>
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Call with OasisAI</h3>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Phone className="w-4 h-4" />
                        <span>Outgoing Call</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <p className="text-sm text-gray-500 mb-1">OasisAI</p>
                      <p className="text-gray-900">
                        Hi Jake, I just wanted to remind you there's a AED 500 balance on your account that will be due with your rent on September 1st.
                      </p>
                    </div>

                    <div className="flex flex-col items-center">
                      <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                        <Phone className="w-6 h-6 text-gray-700 rotate-180" />
                      </button>
                      <p className="text-sm text-gray-500 mt-2">End</p>
                    </div>
                  </div>
                )}

                {/* Chat Interface (activeTab === 3) */}
                {activeTab === 3 && (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Chat with James T.</h3>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-start">
                        <div className="bg-gray-200 rounded-lg p-4 max-w-xs">
                          <p className="text-gray-900">Hello! Do you have pet-friendly units? I have 2 pets.</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <div className="bg-gradient-to-r from-sky-400 to-purple-500 text-white rounded-lg p-4 max-w-xs">
                          <p>Yes! We welcome cats and dogs. There's a AED 1,100 one-time fee + AED 150/month per pet.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 border-t border-gray-200 pt-4">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button className="p-2 bg-gradient-to-r from-sky-400 to-purple-500 text-white rounded-lg hover:from-sky-500 hover:to-purple-600 transition-all">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Centralized Operations Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              CENTRALIZE YOUR OPERATIONS
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need In One CRM
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              OasisCRM centralizes tenant interactions with detailed records, robust reporting, and actionable insights, built for property managers to streamline tasks and drive smarter decisions.
            </p>
            <a
              href="#"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-sky-400 to-purple-500 text-white font-semibold rounded-lg hover:from-sky-500 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Learn More <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Comparison</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              How OasisAI Compares
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              OasisAI does more and better. Everything you need, in one intelligent platform.
            </p>
          </div>

          {/* Comparison Table - Matching Omnichannel aesthetic */}
          <div className="max-w-5xl mx-auto mt-12">
            <div className="bg-gradient-to-b from-sky-100 to-purple-100 rounded-2xl p-8 shadow-xl overflow-hidden">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-white/50">
                {/* Table Header */}
                <div className="grid grid-cols-3 bg-gray-900 text-white">
                  <div className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">Feature</div>
                  <div className="px-6 py-4 bg-gradient-to-r from-sky-400 to-purple-500 font-semibold text-sm uppercase tracking-wider">
                    OasisAI
                  </div>
                  <div className="px-6 py-4 bg-gray-700 font-semibold text-sm uppercase tracking-wider">Others</div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-gray-200">
                  {[
                    {
                      feature: 'Channels',
                      oasisai: 'WhatsApp, Web, Email, SMS (and more coming...)',
                      others: 'Limited or single-channel only',
                    },
                    {
                      feature: 'Property Portal Integration',
                      oasisai: '1-click import, sync with Bayut, Dubizzle & Property Finder',
                      others: 'Manual entry only',
                    },
                    {
                      feature: 'Built-in Property Manager',
                      oasisai: 'Add & manage listings in-app',
                      others: 'No property manager',
                    },
                    {
                      feature: 'Deep Customization',
                      oasisai: 'Behavior, tone & data per channel',
                      others: 'Generic, non-adaptive answers',
                    },
                    {
                      feature: 'Local Expertise',
                      oasisai: 'Trained on UAE real estate data & regulations',
                      others: 'Generic or international models',
                    },
                    {
                      feature: 'Adaptive by Property Type',
                      oasisai: 'Off-plan, secondary, rental, short-term',
                      others: 'One-size-fits-all replies',
                    },
                    {
                      feature: '24/7 Automation',
                      oasisai: 'Always-on AI for lead capture and qualification',
                      others: 'Business hours only',
                    },
                  ].map((row, index) => (
                    <div key={index} className="grid grid-cols-3 hover:bg-gray-50 transition-colors">
                      <div className="px-6 py-4 font-semibold text-gray-900">{row.feature}</div>
                      <div className="px-6 py-4 bg-gradient-to-r from-sky-50 to-purple-50">
                        <div className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{row.oasisai}</span>
                        </div>
                      </div>
                      <div className="px-6 py-4 bg-gray-50">
                        <div className="flex items-start gap-2">
                          <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{row.others}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="solutions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              WHY TEAMS CHOOSE OASISAI
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Smarter Conversations, Seamless Operations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              OasisAI helps property managers connect with tenants through automation, personalization, and 24/7 support, freeing teams to focus on delivering great living experiences.
            </p>
          </div>

          {/* 4 Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{pillar.title}</h3>
                  <p className="text-gray-600">{pillar.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Proof in the Results</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how OasisAI revolutionizes leasing, tenant management, and operations, delivering measurable results for our clients.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                quote: 'OasisAI and OasisCRM are obviously fantastic lead nurturing tools, but to our company they\'re more than that—they\'re also employee nurturing tools.',
                company: 'Dubai Properties Group',
              },
              {
                quote: 'OasisAI has been a game-changer for our teams, streamlining communication and enhancing the customer experience in ways we couldn\'t have imagined.',
                company: 'Abu Dhabi Real Estate',
              },
              {
                quote: 'When it came time to test the product, it turned out OasisAI was one of the only companies actually using AI in the sense they said they were using it.',
                company: 'UAE Property Management',
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <p className="text-gray-700 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                <p className="text-sm font-semibold text-gray-900">{testimonial.company}</p>
                <a href="#" className="text-sm text-purple-600 hover:text-purple-700 mt-2 inline-flex items-center gap-1">
                  Read More <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">FAQ</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Platform Overview</a></li>
                <li><a href="#" className="hover:text-white">OasisCRM</a></li>
                <li><a href="#" className="hover:text-white">VoiceAI</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">LeasingAI</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Prospect Management</a></li>
                <li><a href="#" className="hover:text-white">AI-Guided Tours</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">ResidentAI</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Maintenance</a></li>
                <li><a href="#" className="hover:text-white">Renewals</a></li>
                <li><a href="#" className="hover:text-white">Delinquency</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p className="mb-2">AI-Driven Innovation for Property Management</p>
            <p>© 2025 OasisAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
    