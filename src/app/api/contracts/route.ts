import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Fetch contracts from Supabase with all related data
    const { data: leases, error } = await supabase
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
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    // Get landlord and tenant info for each lease
    const leaseIds = leases?.map(l => l.id) || []
    
    let landlordMap: { [key: number]: any } = {}
    let tenantMap: { [key: number]: any } = {}
    
    if (leaseIds.length > 0) {
      // Get landlords for these leases
      const { data: landlordData } = await supabase
        .from('accounts')
        .select('id, display_name, email, phone_e164')
        .eq('role', 'landlord')
      
      // Get tenants for these leases  
      const { data: tenantData } = await supabase
        .from('accounts')
        .select('id, display_name, email, phone_e164')
        .eq('role', 'tenant')
        
      // Create maps for quick lookup
      landlordData?.forEach(landlord => {
        landlordMap[landlord.id] = landlord
      })
      
      tenantData?.forEach(tenant => {
        tenantMap[tenant.id] = tenant
      })
    }

    // Transform the data to match the frontend contract interface
    const contracts = leases?.map(lease => {
      // Handle nested data structure from Supabase
      const unit = Array.isArray(lease.units) ? lease.units[0] : lease.units
      const property = unit?.properties ? (Array.isArray(unit.properties) ? unit.properties[0] : unit.properties) : null
      
      // Get landlord and tenant info
      const landlord = landlordMap[lease.landlord_id]
      const tenant = tenantMap[lease.tenant_id]
      
      return {
        id: lease.id.toString(),
        contract_no: lease.contract_no || 'N/A',
        tenant_name: tenant?.display_name || 'Tenant Name Not Available',
        landlord_name: landlord?.display_name || 'Landlord Name Not Available',
        tenant_email: tenant?.email || null,
        landlord_email: landlord?.email || null,
        tenant_phone: tenant?.phone_e164 || null,
        landlord_phone: landlord?.phone_e164 || null,
        property_address: unit && property ? `${unit.unit_no}, ${property.name}` : 'N/A',
        rent_amount: lease.annual_rent_aed && typeof lease.annual_rent_aed === 'number' ? `AED ${lease.annual_rent_aed.toLocaleString()}` : 'N/A',
        lease_start: lease.start_date || 'N/A',
        lease_end: lease.end_date || 'N/A',
        security_deposit: lease.deposit_aed && typeof lease.deposit_aed === 'number' ? `AED ${lease.deposit_aed.toLocaleString()}` : 'N/A',
        property_size: unit?.size_sqm ? `${unit.size_sqm} SQ. M.` : 'N/A',
        status: lease.status || 'active',
        uploaded_at: lease.created_at,
        bedrooms: unit?.bedrooms || null,
        furnished: unit?.furnished || false,
        dewa_premise_no: unit?.dewa_premise_no || 'N/A',
        community: property?.community || 'N/A',
        plot_no: property?.plot_no || 'N/A',
        property_name: property?.name || 'N/A',
        unit_no: unit?.unit_no || 'N/A'
      }
    }) || []

    return NextResponse.json({ 
      success: true, 
      contracts,
      count: contracts.length 
    })
  } catch (error) {
    console.error('Error fetching contracts:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { success: false, error: `Failed to fetch contracts: ${errorMessage}` },
      { status: 500 }
    )
  }
}
