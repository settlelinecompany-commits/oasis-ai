'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { ArrowLeft, Calendar, DollarSign, Home, User, FileText, TrendingUp, Shield, Wrench, AlertCircle, CheckCircle, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContractDetails {
  id: string
  contract_no: string
  start_date: string
  end_date: string
  annual_rent_aed: number
  deposit_aed: number
  status: string
  payment_terms: any
  raw_ocr: any
  
  property: {
    name: string
    community: string
    plot_no: string
  }
  
  unit: {
    unit_no: string
    unit_type: string
    size_sqm: number
    bedrooms: number
    dewa_premise_no: string
    furnished: boolean
  }
  
  landlord: {
    name: string
    email: string | null
    phone: string | null
  }
  
  tenant: {
    name: string
    email: string | null
    phone: string | null
  }
  
  payments: any[]
  documents: any[]
  responsibilities: any[]
  deposits: any[]
  renewals: any[]
  insights: any[]
}

export default function ContractDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [contract, setContract] = useState<ContractDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchContractDetails(params.id as string)
    }
  }, [params.id])

  const fetchContractDetails = async (contractId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/contracts/${contractId}`)
      const data = await response.json()
      
      if (data.success) {
        setContract(data.contract)
      } else {
        setError(data.error || 'Failed to fetch contract details')
      }
    } catch (error) {
      console.error('Error fetching contract details:', error)
      setError('Failed to fetch contract details')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">Loading contract details...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (error || !contract) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Contract Not Found</h2>
            <p className="text-gray-600 mb-4">{error || 'The requested contract could not be found.'}</p>
            <button
              onClick={() => router.push('/properties')}
              className="bg-gradient-to-r from-sky-400 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-sky-500 hover:to-purple-600 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Back to Properties
            </button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // Calculate financial metrics (with placeholders)
  const grossYield = 7.4 // Placeholder - would be calculated from rent/property value
  const rentCollected = contract.payments?.filter(p => p.status === 'cleared').reduce((sum, p) => sum + (p.amount_aed || 0), 0) || 0
  const totalRent = contract.annual_rent_aed || 0
  const collectionPercentage = totalRent > 0 ? Math.round((rentCollected / totalRent) * 100) : 0
  const maintenanceSpend = 1200 // Placeholder
  const maintenancePercentage = totalRent > 0 ? Math.round((maintenanceSpend / totalRent) * 100) : 0
  const vacancyDays = 0 // Placeholder
  const suggestedRent = contract.renewals?.[0]?.suggested_rent || Math.round(contract.annual_rent_aed * 1.05)

  // Document completeness
  const totalDocs = 4
  const completedDocs = contract.documents?.filter(d => d.status === 'uploaded').length || 1
  const docCompleteness = Math.round((completedDocs / totalDocs) * 100)

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 bg-white min-h-screen w-full max-w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/properties')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{contract.property.name}</h1>
                <p className="text-sm text-gray-600">Contract {contract.contract_no}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn(
                "px-3 py-1 rounded-full text-sm font-medium",
                contract.status === 'active' && "bg-green-100 text-green-800",
                contract.status === 'expired' && "bg-red-100 text-red-800",
                contract.status === 'upcoming' && "bg-blue-100 text-blue-800"
              )}>
                {contract.status?.charAt(0).toUpperCase() + contract.status?.slice(1)}
              </span>
              <button className="bg-gradient-to-r from-sky-400 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-sky-500 hover:to-purple-600 transition-all duration-200 shadow-sm hover:shadow-md">
                Renew Lease
              </button>
            </div>
          </div>
        </div>
        {/* Property Header */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-sky-50 to-purple-50 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-sky-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">{contract.property.name}</h2>
              <p className="text-gray-600">Unit {contract.unit.unit_no} • {contract.property.community}</p>
              <p className="text-sm text-gray-500">Tenant: {contract.tenant.name}</p>
              <p className="text-sm text-gray-500">Lease: {contract.start_date} - {contract.end_date}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">AED {contract.annual_rent_aed?.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Annual Rent</p>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Financial Health */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Health</h3>
            <p className="text-sm text-gray-600 mb-4">Yield metrics and performance indicators</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">Gross Yield</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{grossYield}%</p>
                <p className="text-xs text-green-600">+0.8% vs last year</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-sky-600" />
                  <span className="text-sm text-gray-600">Rent Collected</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">AED {rentCollected.toLocaleString()}</p>
                <p className="text-xs text-sky-600">{collectionPercentage}% received</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-gray-600">Maintenance Spend</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">AED {maintenanceSpend.toLocaleString()}</p>
                <p className="text-xs text-orange-600">{maintenancePercentage}% of rent</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-600">Vacancy Days</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{vacancyDays}</p>
                <p className="text-xs text-purple-600">Perfect occupancy</p>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-gradient-to-r from-sky-50 to-purple-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-sky-600" />
                <span className="text-sm font-medium text-gray-900">Expected Renewal Rent</span>
              </div>
              <p className="text-xl font-bold text-sky-900">AED {suggestedRent.toLocaleString()}</p>
              <p className="text-xs text-sky-600">+5.0% within RERA cap</p>
            </div>
          </div>

          {/* Document Completeness */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Completeness</h3>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-medium text-gray-900">{docCompleteness}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-sky-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${docCompleteness}%` }}
                ></div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">Upload missing docs to reach 100% compliance</p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-900">Tenancy Contract</span>
                </div>
                <button className="text-sky-600 text-sm hover:text-sky-800 transition-colors">View</button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-900">Move-in NOC</span>
                </div>
                <button className="text-sky-600 text-sm hover:text-sky-800 transition-colors">View</button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-gray-900">Ejari Certificate</span>
                </div>
                <button className="text-gray-400 text-sm">
                  <Upload className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-gray-900">Inventory List</span>
                </div>
                <button className="text-gray-400 text-sm">
                  <Upload className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Maintenance & Responsibilities */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance & Responsibilities</h3>
            <p className="text-sm text-gray-600 mb-4">Cost allocation and service responsibilities</p>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Landlord Responsibilities</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-900">Service Charges</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-900">Major Maintenance</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Tenant Responsibilities</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-900">DEWA (Premise: {contract.unit.dewa_premise_no})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-900">Chiller Charges</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Minor Maintenance (≤ AED 500):</strong> Tenant responsibility
              </p>
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
            <p className="text-sm text-gray-600 mb-4">AI-powered recommendations</p>
            
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  Your tenant's average payment delay is <strong>0 days</strong> — top 5% on-time performance.
                </p>
              </div>
              
              <div className="p-3 bg-gradient-to-r from-sky-50 to-purple-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  RERA cap allows <strong>+5% increase</strong> → suggested new rent <strong>AED {suggestedRent.toLocaleString()}</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information & Security Deposit */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Security Deposit */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Deposit</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Held by Landlord</p>
                <p className="text-3xl font-bold text-gray-900">AED {contract.deposit_aed?.toLocaleString()}</p>
              </div>
              <Shield className="w-12 h-12 text-sky-600" />
            </div>
            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <p className="text-sm text-gray-700">
                Deposit release due in 14 days - remind tenant to upload final DEWA bills.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Tenant</p>
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{contract.tenant.name}</span>
                </div>
                {contract.tenant.email && (
                  <div className="flex items-center gap-3 mt-1">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{contract.tenant.email}</span>
                  </div>
                )}
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">Property Details</p>
                <div className="flex items-center gap-3">
                  <Home className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{contract.unit.size_sqm} sqm • Plot {contract.property.plot_no}</span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{contract.property.community}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}




