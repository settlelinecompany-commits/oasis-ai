import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const leaseId = parseInt(id)
    
    if (isNaN(leaseId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid contract ID' },
        { status: 400 }
      )
    }

    // Fetch contract from Supabase
    const { data: lease, error: leaseError } = await supabase
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
        units!inner(
          unit_no,
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
      .eq('id', leaseId)
      .single()

    if (leaseError || !lease) {
      return NextResponse.json(
        { success: false, error: 'Contract not found' },
        { status: 404 }
      )
    }

    // Get landlord and tenant info
    const [landlordResult, tenantResult] = await Promise.all([
      lease.landlord_id
        ? supabase
            .from('accounts')
            .select('id, display_name, email, phone_e164')
            .eq('id', lease.landlord_id)
            .eq('role', 'landlord')
            .single()
        : Promise.resolve({ data: null, error: null }),
      lease.tenant_id
        ? supabase
            .from('accounts')
            .select('id, display_name, email, phone_e164')
            .eq('id', lease.tenant_id)
            .eq('role', 'tenant')
            .single()
        : Promise.resolve({ data: null, error: null }),
    ])

    // Handle nested data structure
    const unit = Array.isArray(lease.units) ? lease.units[0] : lease.units
    const property = unit?.properties
      ? Array.isArray(unit.properties)
        ? unit.properties[0]
        : unit.properties
      : null

    // Transform the data to match the frontend ContractDetails interface
    const contract = {
      id: lease.id.toString(),
      contract_no: lease.contract_no || 'N/A',
      start_date: lease.start_date || 'N/A',
      end_date: lease.end_date || 'N/A',
      annual_rent_aed: lease.annual_rent_aed || 0,
      deposit_aed: lease.deposit_aed || 0,
      status: lease.status || 'active',
      payment_terms: { cheques: 4 }, // Placeholder
      raw_ocr: null,
      
      property: {
        name: property?.name || 'N/A',
        community: property?.community || 'N/A',
        plot_no: property?.plot_no || 'N/A',
      },
      
      unit: {
        unit_no: unit?.unit_no || 'N/A',
        unit_type: 'Apartment', // Placeholder
        size_sqm: unit?.size_sqm || 0,
        bedrooms: unit?.bedrooms || null,
        dewa_premise_no: unit?.dewa_premise_no || 'N/A',
        furnished: unit?.furnished || false,
      },
      
      landlord: {
        name: landlordResult.data?.display_name || 'Landlord Name Not Available',
        email: landlordResult.data?.email || null,
        phone: landlordResult.data?.phone_e164 || null,
      },
      
      tenant: {
        name: tenantResult.data?.display_name || 'Tenant Name Not Available',
        email: tenantResult.data?.email || null,
        phone: tenantResult.data?.phone_e164 || null,
      },
      
      payments: [], // Placeholder - would come from payments table
      documents: [
        { name: 'Tenancy Contract', status: 'uploaded' },
        { name: 'Move-in NOC', status: 'uploaded' },
        { name: 'Ejari Certificate', status: 'missing' },
        { name: 'Inventory List', status: 'missing' },
      ],
      responsibilities: [], // Placeholder
      deposits: [{ amount_aed: lease.deposit_aed || 0, held_by: 'landlord' }],
      renewals: [{ rera_cap_pct: 5, suggested_rent: Math.round((lease.annual_rent_aed || 0) * 1.05) }],
      insights: [],
    }

    return NextResponse.json({
      success: true,
      contract,
    })
  } catch (error: any) {
    console.error('Error fetching contract:', error)
    return NextResponse.json(
      { success: false, error: `Failed to fetch contract: ${error.message}` },
      { status: 500 }
    )
  }
}

