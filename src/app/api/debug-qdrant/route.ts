import { NextRequest, NextResponse } from 'next/server'
import { QdrantClient } from '@qdrant/js-client-rest'

const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL || process.env.NEXT_PUBLIC_QDRANT_URL!,
  apiKey: process.env.QDRANT_API_KEY || process.env.NEXT_PUBLIC_QDRANT_API_KEY!,
  timeout: 10000,
  checkCompatibility: false,
})

export async function GET(req: NextRequest) {
  try {
    // Check if collection exists
    const collections = await qdrant.getCollections()
    console.log('Collections:', collections)
    
    // Get collection info
    const collectionInfo = await qdrant.getCollection('contract_vectors')
    console.log('Collection info:', collectionInfo)
    
    // Get some points
    const points = await qdrant.scroll('contract_vectors', {
      limit: 5,
      with_payload: true,
    })
    console.log('Points:', points)
    
    return NextResponse.json({
      success: true,
      collections: collections.collections,
      collection_info: collectionInfo,
      points_count: points.points.length,
      sample_points: points.points.slice(0, 2)
    })
  } catch (error: any) {
    console.error('Qdrant debug error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}










