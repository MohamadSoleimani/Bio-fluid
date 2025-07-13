import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface ContactSubmission {
  id?: string
  name: string
  email: string
  subject: string
  message: string
  created_at?: string
}

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  long_description: string
  technologies: string[]
  main_image: string
  images: string[]
  category: string
  status: "completed" | "in-progress" | "planned"
  start_date: string
  end_date?: string
  collaborators?: string[]
  publications?: string[]
  github?: string
  demo?: string
  created_at?: string
  updated_at?: string
}
