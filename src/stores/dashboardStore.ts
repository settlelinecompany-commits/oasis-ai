import { create } from 'zustand'

interface Contract {
  id: string
  contract_no: string
  status: 'active' | 'expired' | 'upcoming'
  annual_rent_aed: number
}

interface DashboardState {
  contracts: Contract[]
  searchQuery: string
  filterStatus: 'all' | 'active' | 'expired' | 'upcoming'
  isLoading: boolean
  
  // Actions
  setContracts: (contracts: Contract[]) => void
  setSearchQuery: (query: string) => void
  setFilterStatus: (status: 'all' | 'active' | 'expired' | 'upcoming') => void
  setIsLoading: (loading: boolean) => void
  
  // Computed
  getFilteredContracts: () => Contract[]
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  contracts: [],
  searchQuery: '',
  filterStatus: 'all',
  isLoading: false,
  
  setContracts: (contracts) => set({ contracts }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setFilterStatus: (status) => set({ filterStatus: status }),
  
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  getFilteredContracts: () => {
    const { contracts, searchQuery, filterStatus } = get()
    
    let filtered = contracts
    
    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(contract => contract.status === filterStatus)
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(contract =>
        contract.contract_no.toLowerCase().includes(query) ||
        contract.id.toLowerCase().includes(query)
      )
    }
    
    return filtered
  }
}))




