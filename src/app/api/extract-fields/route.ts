import { NextRequest, NextResponse } from 'next/server'
import { extractFieldsFromOCR } from '@/lib/extractFields'

export async function POST(req: NextRequest) {
  try {
    const { ocr_text } = await req.json()
    
    if (!ocr_text) {
      return NextResponse.json(
        { success: false, error: 'OCR text is required' },
        { status: 400 }
      )
    }
    
    const result = await extractFieldsFromOCR(ocr_text)
    
    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Extract fields error:', error)
    return NextResponse.json(
      { success: false, error: `Extraction failed: ${error.message}` },
      { status: 500 }
    )
  }
}

