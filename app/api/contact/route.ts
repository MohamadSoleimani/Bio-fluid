import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    // Simple test endpoint
    return NextResponse.json({
      status: "API is working",
      timestamp: new Date().toISOString(),
      environment: {
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        nodeEnv: process.env.NODE_ENV,
      },
    })
  } catch (error) {
    console.error("GET Error:", error)
    return NextResponse.json({ error: "GET endpoint failed", details: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  console.log("🚀 POST /api/contact called")

  try {
    // Parse request body
    const body = await request.json()
    console.log("📝 Request body:", body)

    const { name, email, subject, message } = body

    // Validate fields
    if (!name || !email || !subject || !message) {
      console.log("❌ Missing required fields")
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.log("❌ Missing environment variables")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    console.log("✅ Environment variables present")

    // Import and use Supabase
    const { createClient } = await import("@supabase/supabase-js")
    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log("🔄 Inserting into database...")

    const { data, error } = await supabase
      .from("contact_submissions")
      .insert([
        {
          name,
          email,
          subject,
          message,
        },
      ])
      .select()

    if (error) {
      console.error("❌ Supabase error:", error)
      return NextResponse.json(
        {
          error: "Database error",
          details: error.message,
          code: error.code,
        },
        { status: 500 },
      )
    }

    console.log("✅ Success! Data inserted:", data)

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
      data: data,
    })
  } catch (error) {
    console.error("💥 Unexpected error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
