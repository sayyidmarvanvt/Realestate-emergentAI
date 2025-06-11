import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Property = {
  id: string
  title: string
  type: 'apartment' | 'townhouse' | 'villa'
  price: number
  bedrooms: number
  bathrooms: number
  size: number
  location: string
  area: string
  description: string
  images: string[]
  amenities: string[]
  featured: boolean
  created_at: string
  updated_at: string
}

export type User = {
  id: string
  email: string
  name: string
  avatar_url?: string
  created_at: string
}