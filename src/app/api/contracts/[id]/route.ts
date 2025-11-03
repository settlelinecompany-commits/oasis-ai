import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const contractId = resolvedParams.id
    console.log('Contract ID:', contractId)

    // Fetch basic contract data from Supabase
    const { data: lease, error } = await supabase
      .from('leases')
      .select(`
        id,
        contract_no,
        start_date,
        end_date,
        annual_rent_aed,
        deposit_aed,
        status,
        created_at,
        landlord_id,
        tenant_id,
        payment_terms,
        raw_ocr,
        units!inner(
          unit_no,
          unit_type,
          size_sqm,
          bedrooms,
          dewa_premise_no,
          furnished,
          properties!inner(
            name,
            community,
            plot_no
          )
        )
      `)
      .eq('id', contractId)
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    if (!lease) {
      return NextResponse.json(
        { success: false, error: 'Contract not found' },
        { status: 404 }
      )
    }

    // Get landlord and tenant details
    let landlord = null
    let tenant = null
    
    if (lease.landlord_id) {
      const { data: landlordData } = await supabase
        .from('accounts')
        .select('id, display_name, email, phone_e164')
        .eq('id', lease.landlord_id)
        .single()
      landlord = landlordData
    }

    if (lease.tenant_id) {
      const { data: tenantData } = await supabase
        .from('accounts')
        .select('id, display_name, email, phone_e164')
        .eq('id', lease.tenant_id)
        .single()
      tenant = tenantData
    }

    // Handle nested data structure
    const unit = Array.isArray(lease.units) ? lease.units[0] : lease.units
    const property = unit?.properties ? (Array.isArray(unit.properties) ? unit.properties[0] : unit.properties) : null

    // Transform the data
    const contractDetails = {
      id: lease.id.toString(),
      contract_no: lease.contract_no || 'N/A',
      start_date: lease.start_date,
      end_date: lease.end_date,
      annual_rent_aed: lease.annual_rent_aed,
      deposit_aed: lease.deposit_aed,
      status: lease.status,
      payment_terms: lease.payment_terms,
      raw_ocr: lease.raw_ocr,
      
      // Property details
      property: {
        name: property?.name || 'N/A',
        community: property?.community || 'N/A',
        plot_no: property?.plot_no || 'N/A'
      },
      
      // Unit details
      unit: {
        unit_no: unit?.unit_no || 'N/A',
        unit_type: unit?.unit_type || 'apartment',
        size_sqm: unit?.size_sqm || null,
        bedrooms: unit?.bedrooms || null,
        dewa_premise_no: unit?.dewa_premise_no || 'N/A',
        furnished: unit?.furnished || false
      },
      
      // People
      landlord: {
        name: landlord?.display_name || 'Landlord Name Not Available',
        email: landlord?.email || null,
        phone: landlord?.phone_e164 || null
      },
      
      tenant: {
        name: tenant?.display_name || 'Tenant Name Not Available',
        email: tenant?.email || null,
        phone: tenant?.phone_e164 || null
      },
      
      // Related data (empty for now)
      payments: [],
      documents: [],
      responsibilities: [],
      deposits: [],
      renewals: [],
      insights: []
    }

    return NextResponse.json({
      success: true,
      contract: contractDetails
    })
  } catch (error) {
    console.error('Error fetching contract details:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { success: false, error: `Failed to fetch contract details: ${errorMessage}` },
      { status: 500 }
    )
  }
}






