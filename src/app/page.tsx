'use client'

import { useState, useEffect } from 'react'
import { Upload, Search, FileText, Calendar, DollarSign, Home, Filter, ChevronDown, MessageSquare, TrendingUp, Users, Building } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface Contract {
  id: string
  contract_no?: string
  tenant_name?: string
  landlord_name?: string
  property_address?: string
  rent_amount?: string
  lease_start?: string
  lease_end?: string
  security_deposit?: string
  property_size?: string
  status?: 'active' | 'expired' | 'upcoming'
  uploaded_at?: string
  ocr_text?: string
  score?: number
  property_name?: string
  unit_no?: string
  community?: string
}

export default function Dashboard() {
  const router = useRouter()
  const [contracts, setContracts] = useState<Contract[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'expired' | 'upcoming'>('all')
  const [loading, setLoading] = useState(false) // Start with false to show UI immediately
  const [isSearching, setIsSearching] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedContractId, setSelectedContractId] = useState<string>('')
  
  // Fetch contracts on component mount
  useEffect(() => {
    fetchContracts()
  }, [])

  const fetchContracts = async () => {
    try {
      const response = await fetch('/api/contracts')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success) {
        setContracts(data.contracts || [])
      } else {
        console.error('Failed to fetch contracts:', data.error)
        setContracts([])
      }
    } catch (error) {
      console.error('Error fetching contracts:', error)
      setContracts([])
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchContracts()
      return
    }

    try {
      setIsSearching(true)
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          limit: 10
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setContracts(data.contracts || [])
      } else {
        console.error('Search failed:', data.error)
      }
    } catch (error) {
      console.error('Error searching contracts:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const getContractStats = (contracts: Contract[]) => {
    const active = contracts.filter(c => c.status === 'active').length
    const expired = contracts.filter(c => c.status === 'expired').length
    const upcoming = contracts.filter(c => c.status === 'upcoming').length
    const totalRent = contracts.reduce((sum, c) => {
      const amount = c.rent_amount ? parseInt(c.rent_amount.replace(/[^\d]/g, '')) : 0
      return sum + amount
    }, 0)

    return {
      total: contracts.length,
      active,
      expired,
      upcoming,
      totalRent: `AED ${totalRent.toLocaleString()}`
    }
  }
  
  const stats = getContractStats(contracts)
  
  const filteredContracts = contracts.filter(contract => {
    const matchesFilter = filterStatus === 'all' || contract.status === filterStatus
    return matchesFilter
  })

  const handleViewDetails = (contract: Contract) => {
    router.push(`/contracts/${contract.id}`)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)

      console.log('Uploading file:', file.name, 'Size:', file.size)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        // Add longer timeout for OCR processing
        signal: AbortSignal.timeout(120000) // 2 minutes timeout
      })

      console.log('Upload response status:', response.status)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Upload response data:', data)
      
      if (data.success) {
        // Refresh contracts list
        await fetchContracts()
        alert('Contract uploaded and processed successfully!')
      } else {
        alert('Failed to process contract: ' + data.error)
      }
    } catch (error) {
      console.error('Upload error:', error)
      if (error instanceof Error) {
        if (error.name === 'TimeoutError') {
          alert('Upload timed out. OCR processing is taking longer than expected. Please try again.')
        } else {
          alert('Failed to upload contract: ' + error.message)
        }
      } else {
        alert('Failed to upload contract: Unknown error occurred')
      }
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-400 animate-pulse"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Contracts</h3>
          <p className="text-gray-600">Please wait while we fetch your data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Building className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Contract Intelligence
          </h1>
                <p className="text-gray-600 font-medium">Smart rental contract management</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Enhanced Chat Link */}
              <a
                href="/chat"
                className="group bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Ask AI</span>
              </a>
              
              {/* Enhanced Contract Selector */}
              {contracts.length > 0 && (
                <div className="relative group">
                  <select
                    value={selectedContractId}
                    onChange={(e) => {
                      setSelectedContractId(e.target.value)
                      if (e.target.value) {
                        router.push(`/contracts/${e.target.value}`)
                      }
                    }}
                    className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-5 py-3 pr-10 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                  >
                    <option value="">Select Contract</option>
                    {contracts.map((contract) => (
                      <option key={contract.id} value={contract.id}>
                        {contract.contract_no} - {contract.property_address}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none group-hover:text-gray-600 transition-colors" />
                </div>
              )}
              
              {/* Enhanced Upload Button */}
              <label className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                {uploading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />
                )}
                <span className="font-semibold">
                  {uploading ? 'Processing...' : 'Upload Contract'}
                </span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Contracts</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Active</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.active}</p>
              </div>
            </div>
          </div>

          <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Expired</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.expired}</p>
              </div>
            </div>
          </div>

          <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Rent</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalRent}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filter */}
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-gray-600 transition-colors" />
              <input
                type="text"
                placeholder="Search contracts semantically (e.g., 'security deposit', 'rent payment')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-medium text-gray-700 placeholder-gray-500"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
              >
                {isSearching ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Searching...
                  </div>
                ) : (
                  'Search'
                )}
              </button>
              
              <button
                onClick={() => {
                  setSearchQuery('')
                  fetchContracts()
                }}
                className="bg-gray-100 text-gray-700 px-6 py-4 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
              >
                Clear
              </button>
            </div>
            
            <div className="flex gap-2">
              {['all', 'active', 'expired'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status as any)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md",
                    filterStatus === status 
                      ? status === 'all' 
                        ? "bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg" 
                        : status === 'active'
                        ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg"
                        : "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  )}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Contracts List */}
        <div className="space-y-6">
          {filteredContracts.map((contract) => (
            <div key={contract.id} className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Home className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {contract.property_address || 'Property Address Not Available'}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 font-medium">Tenant:</span>
                          <span className="text-gray-800">{contract.tenant_name || 'Not Available'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 font-medium">Landlord:</span>
                          <span className="text-gray-800">{contract.landlord_name || 'Not Available'}</span>
                        </div>
                      </div>
                      {contract.score && (
                        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                          <TrendingUp className="w-3 h-3" />
                          Similarity: {(contract.score * 100).toFixed(1)}%
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {contract.rent_amount || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600 font-medium">Annual Rent</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-900">
                      {contract.lease_start && contract.lease_end 
                        ? `${contract.lease_start} - ${contract.lease_end}`
                        : 'Lease Period Not Available'
                      }
                    </p>
                    <p className="text-sm text-gray-600 font-medium">Lease Period</p>
                  </div>
                  
                  <div className="flex flex-col items-center gap-3">
                    <span className={cn(
                      "px-4 py-2 rounded-xl text-sm font-bold shadow-sm",
                      contract.status === 'active' && "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200",
                      contract.status === 'expired' && "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200",
                      contract.status === 'upcoming' && "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200",
                      !contract.status && "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200"
                    )}>
                      {contract.status ? contract.status.charAt(0).toUpperCase() + contract.status.slice(1) : 'Unknown'}
                    </span>
                    
                    <button 
                      onClick={() => handleViewDetails(contract)}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Empty State */}
        {filteredContracts.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="p-6 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl inline-block mb-6">
              <FileText className="w-16 h-16 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No contracts found</h3>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              {searchQuery ? 'Try adjusting your search criteria or upload a new contract.' : 'Upload your first contract to get started with smart contract management.'}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}