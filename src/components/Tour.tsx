'use client'

import { TourProvider, useTour } from '@reactour/tour'
import { X } from 'lucide-react'

// Tour steps configuration
export const tourSteps = [
  {
    selector: '[data-tour="sidebar"]',
    content: 'This is the navigation sidebar. Use it to navigate between different sections of the dashboard.',
    position: 'right' as const,
  },
  {
    selector: '[data-tour="topbar"]',
    content: 'The top bar contains notifications, user settings, and other quick actions.',
    position: 'bottom' as const,
  },
  {
    selector: '[data-tour="chat-history"]',
    content: 'Your chat history is displayed here. Click on any previous conversation to resume it.',
    position: 'left' as const,
  },
  {
    selector: '[data-tour="main-content"]',
    content: 'This is the main content area where you\'ll see your contracts, insights, and other information.',
    position: 'center' as const,
  },
]

// Tour Configuration
export const tourConfig = {
  steps: tourSteps,
  padding: { popover: 16 },
  styles: {
    popover: (base: any) => ({
      ...base,
      borderRadius: '12px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
    }),
  },
}

// Tour Badge Component (Start Tour Button)
export function TourBadge() {
  const { setIsOpen } = useTour()
  
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
      aria-label="Start tour"
    >
      <span className="text-sm font-semibold">Take Tour</span>
    </button>
  )
}

// Custom Navigation Component (used via TourProvider's afterOpen prop)
export function CustomTourNavigation() {
  const { currentStep, steps, setCurrentStep, setIsOpen } = useTour()
  
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1
  
  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-white border-t border-gray-200">
      <button
        onClick={() => setIsOpen(false)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Close tour"
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>
      
      <div className="flex items-center gap-2">
        <div className="text-sm text-gray-600">
          Step {currentStep + 1} of {steps.length}
        </div>
        <div className="flex gap-1">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep
                  ? 'bg-orange-500'
                  : index < currentStep
                  ? 'bg-orange-300'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="flex gap-2">
        {!isFirstStep && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Previous
          </button>
        )}
        {isLastStep ? (
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-lg hover:from-orange-500 hover:to-yellow-500 transition-all text-sm font-medium"
          >
            Finish
          </button>
        ) : (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="px-4 py-2 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-lg hover:from-orange-500 hover:to-yellow-500 transition-all text-sm font-medium"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}

export { TourProvider }

