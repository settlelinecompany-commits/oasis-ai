'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { Upload, Search, FileText, Calendar, Building, Filter, ChevronDown, MessageSquare, TrendingUp, Users, Plus, X, Eye, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

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

export default function Properties() {
  const router = useRouter()
  const [contracts, setContracts] = useState<Contract[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'expired' | 'upcoming'>('all')
  const [loading, setLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [showUploadArea, setShowUploadArea] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  
  // Fetch contracts on component mount
  useEffect(() => {
    fetchContracts()
  }, [])

  const fetchContracts = async () => {
    try {
      setLoading(true)
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
    } finally {
      setLoading(false)
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

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    try {
      setUploading(true)
      const formData = new FormData()
      Array.from(files).forEach(file => {
        formData.append('files', file)
      })

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      
      if (data.success) {
        await fetchContracts()
        setShowUploadArea(false)
      } else {
        console.error('Upload failed:', data.error)
        alert('Upload failed: ' + (data.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error uploading files:', error)
      alert('Upload failed: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setUploading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const filteredContracts = contracts.filter(contract => {
    if (filterStatus !== 'all' && contract.status !== filterStatus) return false
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      return (
        contract.tenant_name?.toLowerCase().includes(query) ||
        contract.property_address?.toLowerCase().includes(query) ||
        contract.contract_no?.toLowerCase().includes(query) ||
        contract.property_name?.toLowerCase().includes(query)
      )
    }
    return true
  })

  const getContractStats = (contracts: Contract[]) => {
    const active = contracts.filter(c => c.status === 'active').length
    const expired = contracts.filter(c => c.status === 'expired').length
    const upcoming = contracts.filter(c => c.status === 'upcoming').length
    return { active, expired, upcoming, total: contracts.length }
  }

  const stats = getContractStats(contracts)

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 bg-white min-h-screen w-full max-w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Properties</h1>
            <p className="text-sm sm:text-base text-gray-600">Manage your properties and tenancy contracts</p>
          </div>
          <button
            onClick={() => setShowUploadArea(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-400 to-purple-500 text-white rounded-lg font-semibold hover:from-sky-500 hover:to-purple-600 transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Contract</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-gradient-to-r from-sky-50 to-purple-50 rounded-lg">
              <Building className="w-5 h-5 text-gray-700" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-600 mt-0.5">Total Properties</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-green-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{stats.active}</p>
              <p className="text-xs text-gray-600 mt-0.5">Active</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-orange-50 rounded-lg">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{stats.expired}</p>
              <p className="text-xs text-gray-600 mt-0.5">Expired</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-blue-50 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{stats.upcoming}</p>
              <p className="text-xs text-gray-600 mt-0.5">Upcoming</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Area Modal */}
      {showUploadArea && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowUploadArea(false)}>
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Upload Tenancy Contract</h2>
              <button
                onClick={() => setShowUploadArea(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={cn(
                "border-2 border-dashed rounded-xl p-12 text-center transition-colors",
                dragActive
                  ? "border-sky-500 bg-sky-50"
                  : "border-gray-300 bg-gray-50 hover:border-gray-400"
              )}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                Drag files here or click to upload
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Upload tenancy contract documents (PDF, JPG, PNG)
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block px-6 py-3 bg-gradient-to-r from-sky-400 to-purple-500 text-white rounded-lg font-semibold hover:from-sky-500 hover:to-purple-600 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
              >
                Choose Files to Upload
              </label>
            </div>

            {uploading && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">Uploading and processing contract...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch()
              }
            }}
            placeholder="Search by tenant name, property address, or contract number..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
            className="appearance-none pr-10 pl-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="upcoming">Upcoming</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="px-6 py-2.5 bg-gradient-to-r from-sky-400 to-purple-500 text-white rounded-lg font-semibold hover:from-sky-500 hover:to-purple-600 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Contracts Table */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading contracts...</p>
        </div>
      ) : filteredContracts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">No contracts found</p>
          <p className="text-sm text-gray-500">Upload your first tenancy contract to get started</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden w-full">
          <div className="overflow-x-auto">
            <table className="w-full" style={{ minWidth: '800px' }}>
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Tenant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Contract No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Rent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Lease Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-sky-50 to-purple-50 rounded-lg flex items-center justify-center">
                          <Building className="w-5 h-5 text-gray-700" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {contract.property_name || contract.property_address || 'N/A'}
                          </div>
                          {contract.unit_no && (
                            <div className="text-sm text-gray-500">Unit {contract.unit_no}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{contract.tenant_name || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{contract.contract_no || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {contract.rent_amount ? `AED ${contract.rent_amount}` : 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {contract.lease_start && contract.lease_end
                          ? `${contract.lease_start} - ${contract.lease_end}`
                          : 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={cn(
                          "px-2 py-1 text-xs font-medium rounded-full",
                          contract.status === 'active'
                            ? "bg-green-100 text-green-800"
                            : contract.status === 'expired'
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        )}
                      >
                        {contract.status || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => router.push(`/contracts/${contract.id}`)}
                          className="text-sky-600 hover:text-sky-800 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      </div>
    </DashboardLayout>
  )
}

