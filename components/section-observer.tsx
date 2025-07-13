"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface SectionObserverProps {
  children: React.ReactNode
  className?: string
}

export function SectionObserver({ children, className = "" }: SectionObserverProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <div ref={ref} className={`section-transition ${className}`}>
      {children}
    </div>
  )
}
