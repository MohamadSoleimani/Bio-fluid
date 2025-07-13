import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <FileQuestion className="h-24 w-24 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Project Not Found</h1>
          <p className="text-muted-foreground">The project you're looking for doesn't exist or has been moved.</p>
        </div>
        <Link href="/">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
