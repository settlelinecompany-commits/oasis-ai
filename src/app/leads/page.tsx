'use client'

import DashboardLayout from '@/components/DashboardLayout'
import {
  UserSearch,
  MapPin,
  Globe,
  Phone,
  MessageSquare,
  Mail,
  ArrowRight,
} from 'lucide-react'

interface ServiceCard {
  icon: any
  title: string
  description: string
}

export default function Leads() {
  // Lead Management Cards
  const leadCards: ServiceCard[] = [
    { icon: UserSearch, title: 'Prospect Management', description: 'Automate lead conversion, tenant screening' },
    { icon: MapPin, title: 'AI-Guided Tours', description: 'Seamless and personalized AI-powered tours' },
    { icon: Globe, title: 'Property Portal Sync', description: 'Sync listings with Bayut, Dubizzle' },
  ]

  // Communication Cards
  const communicationCards: ServiceCard[] = [
    { icon: Phone, title: 'VoiceAI', description: 'Answer prospect and tenant calls 24/7' },
    { icon: MessageSquare, title: 'WhatsApp', description: 'Automated WhatsApp messaging' },
    { icon: Mail, title: 'Email Automation', description: 'Automated email responses' },
  ]

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 bg-white min-h-screen w-full max-w-full">
        {/* Header */}
        <div className="mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Leads</h1>
            <p className="text-sm sm:text-base text-gray-600">Manage prospects and communication channels</p>
          </div>
        </div>

        {/* Lead Management Section */}
        <div className="mb-12">
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
    </DashboardLayout>
  )
}

