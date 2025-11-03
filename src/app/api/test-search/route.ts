import { NextRequest, NextResponse } from 'next/server'
import { searchContractVectors } from '@/lib/qdrant'

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json()
    
    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Query is required' },
        { status: 400 }
      )
    }
    
    const results = await searchContractVectors(query)
    
    return NextResponse.json({ 
      success: true, 
      results: results.map(r => ({
        id: r.id,
        score: r.score,
        payload: r.payload
      }))
    })
    
  } catch (error: any) {
    console.error('Search error:', error)
    return NextResponse.json(
      { success: false, error: `Search failed: ${error.message}` },
      { status: 500 }
    )
  }
}










