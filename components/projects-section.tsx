"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"
import { projects } from "@/lib/projects-data"
import { SectionObserver } from "@/components/section-observer"

export default function ProjectsSection() {
  const [visibleProjects, setVisibleProjects] = useState(4) // Initially show 4 projects
  const [isLoading, setIsLoading] = useState(false)

  const handleLoadMore = () => {
    setIsLoading(true)

    // Simulate loading delay for better UX
    setTimeout(() => {
      setVisibleProjects((prev) => Math.min(prev + 3, projects.length)) // Load 3 more projects
      setIsLoading(false)
    }, 800)
  }

  const hasMoreProjects = visibleProjects < projects.length
  const displayedProjects = projects.slice(0, visibleProjects)

  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
      <SectionObserver>
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-teal-900/20 px-3 py-1 text-sm text-teal-500">
                Research & Development
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Projects</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Innovative solutions at the intersection of mechanical engineering, biomedical applications, and
                microfluidic technologies.
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            {displayedProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-lg border bg-card p-2 transition-all hover:shadow-lg fade-in-up"
                style={{ animationDelay: `${(index % 3) * 0.1}s` }}
              >
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-background/80 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <Image
                  src={project.mainImage || "/placeholder.svg?height=400&width=600"}
                  width={600}
                  height={400}
                  alt={project.title}
                  className="aspect-video rounded-md object-cover"
                />
                <div className="relative z-20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center rounded-md bg-teal-950/50 px-2 py-1 text-xs font-medium text-teal-400 ring-1 ring-inset ring-teal-500/20">
                      {project.category}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                        project.status === "completed"
                          ? "bg-green-950/50 text-green-400 ring-green-500/20"
                          : project.status === "in-progress"
                            ? "bg-blue-950/50 text-blue-400 ring-blue-500/20"
                            : "bg-gray-950/50 text-gray-400 ring-gray-500/20"
                      }`}
                    >
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace("-", " ")}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => {
                      const bgColors = [
                        "bg-teal-950/50 text-teal-400 ring-teal-500/20",
                        "bg-blue-950/50 text-blue-400 ring-blue-500/20",
                        "bg-purple-950/50 text-purple-400 ring-purple-500/20",
                      ]
                      return (
                        <span
                          key={techIndex}
                          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${bgColors[techIndex % bgColors.length]}`}
                        >
                          {tech}
                        </span>
                      )
                    })}
                    {project.technologies.length > 3 && (
                      <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-muted-foreground">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <Button variant="link" className="p-0 text-teal-500 hover:text-teal-400">
                      <Link href={`/projects/${project.slug}`} className="flex items-center">
                        Learn more <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>

                    <div className="text-xs text-muted-foreground">{project.startDate}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMoreProjects && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="bg-teal-600 hover:bg-teal-700 min-w-[160px]"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Loading...
                  </>
                ) : (
                  <>
                    Load More Projects
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Projects Counter */}
          <div className="flex justify-center mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {visibleProjects} of {projects.length} projects
            </p>
          </div>
        </div>
      </SectionObserver>
    </section>
  )
}
