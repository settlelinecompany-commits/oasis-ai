import ChatInterface from '@/components/ChatInterface'
import { ArrowLeft, MessageSquare, Sparkles } from 'lucide-react'

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl shadow-lg">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Contract Assistant
                </h1>
                <p className="text-gray-600 font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  Ask questions about your rental contracts
                </p>
              </div>
            </div>
            
            <a
              href="/"
              className="group bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-200 font-semibold shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </a>
          </div>
        </div>
      </div>

      {/* Enhanced Chat Interface */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 h-[calc(100vh-200px)] min-h-[700px] overflow-hidden">
          <ChatInterface />
        </div>
      </div>
    </div>
  )
}






