import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const OCR_API_URL = "https://api.runpod.ai/v2/01s4u2uzv9343o/runsync"
const OCR_API_KEY = process.env.RUNPOD_API_KEY || ""

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Upload API called')
    let file: File
    let base64: string
    
    // Handle both FormData and JSON requests
    const contentType = request.headers.get('content-type')
    console.log('📋 Content-Type:', contentType)
    
    if (contentType?.includes('application/json')) {
      // Handle JSON request with base64 data
      console.log('📄 Processing JSON request')
      const body = await request.json()
      const fileData = body.file_data
      const filename = body.filename || 'contract.pdf'
      
      console.log('📄 File data length:', fileData?.length || 0)
      console.log('📄 Filename:', filename)
      
      if (!fileData) {
        console.log('❌ No file data provided')
        return NextResponse.json(
          { success: false, error: 'No file data provided' },
          { status: 400 }
        )
      }
      
      // Convert base64 to buffer and create File object
      console.log('🔄 Converting base64 to buffer')
      const buffer = Buffer.from(fileData, 'base64')
      file = new File([buffer], filename, { type: 'application/pdf' })
      base64 = fileData
      console.log('✅ File conversion complete')
    } else {
      // Handle FormData request (original behavior)
      const formData = await request.formData()
      file = formData.get('file') as File
      
      if (!file) {
        return NextResponse.json(
          { success: false, error: 'No file provided' },
          { status: 400 }
        )
      }
      
      // Convert file to base64
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      base64 = buffer.toString('base64')
    }

    console.log('Starting OCR processing...')
    console.log('PDF size:', base64.length, 'characters')

    // Call OCR API exactly like the working test
    console.log('🚀 Calling RunPod OCR API...')
    console.log('🔗 URL:', OCR_API_URL)
    console.log('🔑 API Key length:', OCR_API_KEY.length)
    
    const ocrResponse = await fetch(OCR_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OCR_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: {
          pdf_data: base64
        }
      })
    })

    console.log('📊 OCR response status:', ocrResponse.status)

    if (!ocrResponse.ok) {
      const errorText = await ocrResponse.text()
      console.error('OCR API error:', errorText)
      throw new Error(`OCR API error: ${ocrResponse.status} - ${errorText}`)
    }

    const ocrResult = await ocrResponse.json()
    console.log('OCR result keys:', Object.keys(ocrResult))
    
    // Handle the response structure properly
    const ocrData = ocrResult.output || ocrResult
    
    if (!ocrData || !ocrData.success) {
      console.error('OCR processing failed:', ocrData)
      return NextResponse.json(
        { success: false, error: 'OCR processing failed', details: ocrData },
        { status: 500 }
      )
    }

    const ocrText = ocrData.ocr_text
    console.log('OCR completed successfully, text length:', ocrText?.length || 0)
    console.log('OCR completed, extracting fields with GPT-4...')

    // Extract structured fields using GPT-4 directly
    const { extractFieldsFromOCR } = await import('@/lib/extractFields')
    const extractionResult = await extractFieldsFromOCR(ocrText)
    
    if (!extractionResult.success) {
      throw new Error('Field extraction failed')
    }

    console.log('Fields extracted, storing in Supabase...')

    // Store in Supabase directly (simplified approach)
    const { supabase } = await import('@/lib/supabase')
    const extractedData = extractionResult.extracted_data
    
    console.log('Extracted data keys:', Object.keys(extractedData))
    
    // Create landlord account
    let landlordId: number
    if (extractedData.landlord.email) {
      const { data: existingLandlord } = await supabase
        .from('accounts')
        .select('id')
        .eq('email', extractedData.landlord.email)
        .eq('role', 'landlord')
        .single()
      
      if (existingLandlord) {
        landlordId = existingLandlord.id
      } else {
        const { data: newLandlord, error: landlordError } = await supabase
          .from('accounts')
          .insert({
            display_name: extractedData.landlord.name || 'Unknown Landlord',
            email: extractedData.landlord.email,
            phone_e164: extractedData.landlord.phone,
            role: 'landlord'
          })
          .select('id')
          .single()
        
        if (landlordError) throw landlordError
        landlordId = newLandlord.id
      }
    } else {
      const { data: newLandlord, error: landlordError } = await supabase
        .from('accounts')
        .insert({
          display_name: extractedData.landlord.name || 'Unknown Landlord',
          email: null,
          phone_e164: extractedData.landlord.phone,
          role: 'landlord'
        })
        .select('id')
        .single()
      
      if (landlordError) throw landlordError
      landlordId = newLandlord.id
    }
    
    // Create tenant account
    let tenantId: number
    if (extractedData.tenant.email) {
      const { data: existingTenant } = await supabase
        .from('accounts')
        .select('id')
        .eq('email', extractedData.tenant.email)
        .eq('role', 'tenant')
        .single()
      
      if (existingTenant) {
        tenantId = existingTenant.id
      } else {
        const { data: newTenant, error: tenantError } = await supabase
          .from('accounts')
          .insert({
            display_name: extractedData.tenant.name || 'Unknown Tenant',
            email: extractedData.tenant.email,
            phone_e164: extractedData.tenant.phone,
            role: 'tenant'
          })
          .select('id')
          .single()
        
        if (tenantError) throw tenantError
        tenantId = newTenant.id
      }
    } else {
      const { data: newTenant, error: tenantError } = await supabase
        .from('accounts')
        .insert({
          display_name: extractedData.tenant.name || 'Unknown Tenant',
          email: null,
          phone_e164: extractedData.tenant.phone,
          role: 'tenant'
        })
        .select('id')
        .single()
      
      if (tenantError) throw tenantError
      tenantId = newTenant.id
    }
    
    // Create property
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .insert({
        name: extractedData.property.name || 'Unknown Property',
        community: extractedData.property.community || 'Unknown Community',
        plot_no: extractedData.property.plot_no || 'Unknown'
      })
      .select('id')
      .single()
    
    if (propertyError) throw propertyError
    
    // Create unit
    const { data: unit, error: unitError } = await supabase
      .from('units')
      .insert({
        property_id: property.id,
        unit_no: extractedData.unit.unit_no || 'Unknown',
        bedrooms: extractedData.unit.bedrooms || 1,
        size_sqm: extractedData.unit.size_sqm || 100,
        dewa_premise_no: extractedData.unit.dewa_premise_no,
        furnished: extractedData.unit.furnished || false
      })
      .select('id')
      .single()
    
    if (unitError) throw unitError
    
    // Create lease
    const { data: lease, error: leaseError } = await supabase
      .from('leases')
      .insert({
        unit_id: unit.id,
        tenant_id: tenantId,
        landlord_id: landlordId,
        contract_no: extractedData.lease.contract_no || 'Unknown',
        start_date: extractedData.lease.start_date,
        end_date: extractedData.lease.end_date,
        annual_rent_aed: extractedData.lease.annual_rent_aed,
        deposit_aed: extractedData.lease.deposit_aed,
        payment_terms: extractedData.lease.payment_terms,
        raw_ocr: { text: ocrText, extracted_data: extractedData },
        status: 'active'
      })
      .select('id')
      .single()
    
    if (leaseError) throw leaseError
    
    const supabaseResult = {
      success: true,
      lease_id: lease.id,
      property_id: property.id,
      unit_id: unit.id,
      landlord_id: landlordId,
      tenant_id: tenantId
    }

    console.log('Supabase storage completed, storing vectors in Qdrant...')

    // Store vectors in Qdrant for semantic search
    try {
      const { storeContractVectors } = await import('@/lib/qdrant')
      console.log('Starting Qdrant storage for lease:', lease.id)
      await storeContractVectors(lease.id, ocrText, {
        tenant_id: tenantId,
        property_id: property.id,
        contract_no: extractedData.lease.contract_no,
        user_id: 'temp-user' // TODO: Replace with actual user_id from auth
      })
      console.log('Qdrant storage completed successfully')
    } catch (qdrantError) {
      console.error('Qdrant storage failed:', qdrantError)
      console.error('Qdrant error details:', JSON.stringify(qdrantError, null, 2))
      // Don't fail the upload if Qdrant fails
    }

    console.log('Contract processing completed successfully!')

    return NextResponse.json({
      success: true,
      message: 'Contract processed and stored successfully',
      data: {
        lease_id: supabaseResult.lease_id,
        contract_no: extractionResult.extracted_data.lease.contract_no,
        tenant_name: extractionResult.extracted_data.tenant.name,
        landlord_name: extractionResult.extracted_data.landlord.name,
        property_address: `${extractionResult.extracted_data.unit.unit_no}, ${extractionResult.extracted_data.property.name}`,
        rent_amount: extractionResult.extracted_data.lease.annual_rent_aed,
        supabase_stored: true,
        qdrant_stored: true
      }
    })

  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: `Upload failed: ${error.message}` },
      { status: 500 }
    )
  }
}
