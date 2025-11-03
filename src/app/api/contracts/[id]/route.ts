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

    // Transform the data
    const contract = {
      id: lease.id.toString(),
      contract_no: lease.contract_no || 'N/A',
      tenant_name: tenantResult.data?.display_name || 'Tenant Name Not Available',
      landlord_name: landlordResult.data?.display_name || 'Landlord Name Not Available',
      tenant_email: tenantResult.data?.email || null,
      landlord_email: landlordResult.data?.email || null,
      tenant_phone: tenantResult.data?.phone_e164 || null,
      landlord_phone: landlordResult.data?.phone_e164 || null,
      property_address: unit && property ? `${unit.unit_no}, ${property.name}` : 'N/A',
      rent_amount:
        lease.annual_rent_aed && typeof lease.annual_rent_aed === 'number'
          ? `AED ${lease.annual_rent_aed.toLocaleString()}`
          : 'N/A',
      lease_start: lease.start_date || 'N/A',
      lease_end: lease.end_date || 'N/A',
      security_deposit:
        lease.deposit_aed && typeof lease.deposit_aed === 'number'
          ? `AED ${lease.deposit_aed.toLocaleString()}`
          : 'N/A',
      property_size: unit?.size_sqm ? `${unit.size_sqm} SQ. M.` : 'N/A',
      status: lease.status || 'active',
      uploaded_at: lease.created_at,
      bedrooms: unit?.bedrooms || null,
      furnished: unit?.furnished || false,
      dewa_premise_no: unit?.dewa_premise_no || 'N/A',
      community: property?.community || 'N/A',
      plot_no: property?.plot_no || 'N/A',
      property_name: property?.name || 'N/A',
      unit_no: unit?.unit_no || 'N/A',
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

