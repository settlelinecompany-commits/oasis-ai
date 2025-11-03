import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    console.log('Environment variables:')
    console.log('QDRANT_URL:', process.env.QDRANT_URL)
    console.log('NEXT_PUBLIC_QDRANT_URL:', process.env.NEXT_PUBLIC_QDRANT_URL)
    console.log('QDRANT_API_KEY:', process.env.QDRANT_API_KEY ? 'Set' : 'Not set')
    console.log('NEXT_PUBLIC_QDRANT_API_KEY:', process.env.NEXT_PUBLIC_QDRANT_API_KEY ? 'Set' : 'Not set')
    console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'Set' : 'Not set')
    
    return NextResponse.json({
      success: true,
      env: {
        qdrant_url: process.env.QDRANT_URL || process.env.NEXT_PUBLIC_QDRANT_URL,
        qdrant_api_key_set: !!(process.env.QDRANT_API_KEY || process.env.NEXT_PUBLIC_QDRANT_API_KEY),
        openai_api_key_set: !!process.env.OPENAI_API_KEY
      }
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
