"use client"

import type React from "react"

import type { ReactNode } from "react"

interface SmoothScrollLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function SmoothScrollLink({ href, children, className, onClick }: SmoothScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    const targetId = href.replace("#", "")
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      const headerHeight = 64 // Height of sticky header
      const targetPosition = targetElement.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }

    onClick?.()
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
