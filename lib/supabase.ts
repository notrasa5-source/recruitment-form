import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

export interface Registration {
  id?: string
  name: string
  roll_no: number
  year: '1st' | '2nd'
  email: string
  phone_number: string
  hobbies: string
  why_interested: string
  why_hire: string
  best_work: string
  created_at?: string
}