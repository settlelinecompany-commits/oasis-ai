import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types for TypeScript
export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          id: number
          display_name: string
          email: string | null
          phone_e164: string | null
          role: 'landlord' | 'tenant' | 'property_manager' | 'agent' | 'admin'
          created_at: string
        }
        Insert: {
          id?: number
          display_name: string
          email?: string | null
          phone_e164?: string | null
          role: 'landlord' | 'tenant' | 'property_manager' | 'agent' | 'admin'
          created_at?: string
        }
        Update: {
          id?: number
          display_name?: string
          email?: string | null
          phone_e164?: string | null
          role?: 'landlord' | 'tenant' | 'property_manager' | 'agent' | 'admin'
          created_at?: string
        }
      }
      leases: {
        Row: {
          id: number
          unit_id: number | null
          tenant_id: number | null
          landlord_id: number | null
          contract_no: string | null
          start_date: string | null
          end_date: string | null
          annual_rent_aed: number | null
          deposit_aed: number | null
          payment_terms: any | null
          status: 'draft' | 'active' | 'expiring' | 'terminated' | 'closed'
          raw_ocr: any | null
          created_at: string
        }
        Insert: {
          id?: number
          unit_id?: number | null
          tenant_id?: number | null
          landlord_id?: number | null
          contract_no?: string | null
          start_date?: string | null
          end_date?: string | null
          annual_rent_aed?: number | null
          deposit_aed?: number | null
          payment_terms?: any | null
          status?: 'draft' | 'active' | 'expiring' | 'terminated' | 'closed'
          raw_ocr?: any | null
          created_at?: string
        }
        Update: {
          id?: number
          unit_id?: number | null
          tenant_id?: number | null
          landlord_id?: number | null
          contract_no?: string | null
          start_date?: string | null
          end_date?: string | null
          annual_rent_aed?: number | null
          deposit_aed?: number | null
          payment_terms?: any | null
          status?: 'draft' | 'active' | 'expiring' | 'terminated' | 'closed'
          raw_ocr?: any | null
          created_at?: string
        }
      }
    }
  }
}






