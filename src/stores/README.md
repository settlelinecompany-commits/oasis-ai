# State Management with Zustand

This directory contains Zustand stores for global state management.

## Usage Example

```tsx
import { useDashboardStore } from '@/stores/dashboardStore'

export default function MyComponent() {
  // Access state and actions
  const contracts = useDashboardStore(state => state.contracts)
  const searchQuery = useDashboardStore(state => state.searchQuery)
  const setSearchQuery = useDashboardStore(state => state.setSearchQuery)
  const filteredContracts = useDashboardStore(state => state.getFilteredContracts())

  return (
    <div>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search contracts..."
      />
      <ul>
        {filteredContracts().map(contract => (
          <li key={contract.id}>{contract.contract_no}</li>
        ))}
      </ul>
    </div>
  )
}
```

## Stores

- `dashboardStore.ts` - Manages contracts, search, filters, and loading state




