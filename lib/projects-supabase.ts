import { supabase } from "./supabase"
import type { Project } from "./supabase"

// Fetch all projects from Supabase
export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching projects:", error)
    return []
  }

  return data || []
}

// Fetch a single project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).single()

  if (error) {
    console.error("Error fetching project:", error)
    return null
  }

  return data
}

// Add a new project (admin function)
export async function addProject(project: Omit<Project, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase.from("projects").insert([project]).select()

  if (error) {
    console.error("Error adding project:", error)
    return null
  }

  return data[0]
}

// Update a project (admin function)
export async function updateProject(id: string, updates: Partial<Project>) {
  const { data, error } = await supabase.from("projects").update(updates).eq("id", id).select()

  if (error) {
    console.error("Error updating project:", error)
    return null
  }

  return data[0]
}
