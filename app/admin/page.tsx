"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import type { ContactSubmission } from "@/lib/supabase"

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching submissions:", error)
      } else {
        setSubmissions(data || [])
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage contact submissions and projects</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Submissions ({submissions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {submissions.length === 0 ? (
                <p className="text-muted-foreground">No submissions yet.</p>
              ) : (
                submissions.map((submission) => (
                  <div key={submission.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{submission.name}</h3>
                        <p className="text-sm text-muted-foreground">{submission.email}</p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(submission.created_at!).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{submission.subject}</p>
                      <p className="text-sm mt-1">{submission.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
