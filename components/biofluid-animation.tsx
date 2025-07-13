"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

interface FlowLine {
  points: { x: number; y: number }[]
  opacity: number
  width: number
}

export default function BiofluidAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const flowLinesRef = useRef<FlowLine[]>([])
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initializeAnimation = () => {
      const particles: Particle[] = []
      const flowLines: FlowLine[] = []

      // Create more particles for full screen coverage
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 4 + 2,
          opacity: Math.random() * 0.6 + 0.2,
          color: Math.random() > 0.5 ? "teal" : "blue",
        })
      }

      // Create more flow lines for full screen coverage
      for (let i = 0; i < 15; i++) {
        const points: { x: number; y: number }[] = []
        const startX = Math.random() * canvas.width
        const startY = Math.random() * canvas.height

        for (let j = 0; j < 30; j++) {
          points.push({
            x: startX + Math.sin(j * 0.3 + i) * 80 + j * 20,
            y: startY + Math.cos(j * 0.2 + i) * 50 + j * 15,
          })
        }

        flowLines.push({
          points,
          opacity: Math.random() * 0.2 + 0.05,
          width: Math.random() * 2 + 1,
        })
      }

      particlesRef.current = particles
      flowLinesRef.current = flowLines
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const particles = particlesRef.current
      const flowLines = flowLinesRef.current
      const isDark = theme === "dark"

      // Create gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2,
      )

      if (isDark) {
        gradient.addColorStop(0, "rgba(15, 23, 42, 0.95)")
        gradient.addColorStop(0.5, "rgba(15, 23, 42, 0.98)")
        gradient.addColorStop(1, "rgba(15, 23, 42, 1)")
      } else {
        gradient.addColorStop(0, "rgba(248, 250, 252, 0.95)")
        gradient.addColorStop(0.5, "rgba(248, 250, 252, 0.98)")
        gradient.addColorStop(1, "rgba(248, 250, 252, 1)")
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw microfluidic channels (flow lines)
      flowLines.forEach((line) => {
        if (line.points.length < 2) return

        ctx.strokeStyle = isDark
          ? `rgba(20, 184, 166, ${line.opacity * 0.4})`
          : `rgba(20, 184, 166, ${line.opacity * 0.3})`
        ctx.lineWidth = line.width
        ctx.lineCap = "round"

        ctx.beginPath()
        ctx.moveTo(line.points[0].x % canvas.width, line.points[0].y % canvas.height)

        for (let i = 1; i < line.points.length; i++) {
          const point = line.points[i]
          ctx.lineTo(point.x % canvas.width, point.y % canvas.height)
        }

        ctx.stroke()

        // Animate flow lines
        line.points.forEach((point) => {
          point.x += 0.3
          point.y += 0.2
          if (point.x > canvas.width + 100) point.x = -100
          if (point.y > canvas.height + 100) point.y = -100
        })
      })

      // Draw DNA helix structures across the screen
      const time = Date.now() * 0.001

      // Multiple DNA helixes
      for (let helix = 0; helix < 3; helix++) {
        const centerX = (canvas.width / 4) * (helix + 1)
        const offsetY = helix * 100

        for (let i = 0; i < 80; i++) {
          const angle = (i / 80) * Math.PI * 6 + time + helix
          const y = (i / 80) * canvas.height * 0.8 + canvas.height * 0.1 + offsetY
          const radius = 60 + Math.sin(time + i * 0.1 + helix) * 15

          if (y > canvas.height + 50) continue

          const x1 = centerX + Math.cos(angle) * radius
          const x2 = centerX + Math.cos(angle + Math.PI) * radius

          const alpha = 0.15 + Math.sin(time + i * 0.1) * 0.1

          ctx.fillStyle = isDark ? `rgba(59, 130, 246, ${alpha})` : `rgba(59, 130, 246, ${alpha * 0.7})`

          ctx.beginPath()
          ctx.arc(x1, y, 1.5, 0, Math.PI * 2)
          ctx.fill()

          ctx.fillStyle = isDark ? `rgba(168, 85, 247, ${alpha})` : `rgba(168, 85, 247, ${alpha * 0.7})`

          ctx.beginPath()
          ctx.arc(x2, y, 1.5, 0, Math.PI * 2)
          ctx.fill()

          // Connect the helix strands occasionally
          if (i % 8 === 0) {
            ctx.strokeStyle = isDark ? "rgba(156, 163, 175, 0.15)" : "rgba(156, 163, 175, 0.1)"
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(x1, y)
            ctx.lineTo(x2, y)
            ctx.stroke()
          }
        }
      }

      // Update and draw particles (representing cells/molecules)
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // Draw particle
        const alpha = particle.opacity * (isDark ? 0.6 : 0.4)
        ctx.fillStyle = particle.color === "teal" ? `rgba(20, 184, 166, ${alpha})` : `rgba(59, 130, 246, ${alpha})`

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Add subtle glow effect
        if (Math.random() > 0.95) {
          ctx.shadowColor = particle.color === "teal" ? "#14b8a6" : "#3b82f6"
          ctx.shadowBlur = 8
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 0.3, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        }
      })

      // Draw circuit-like connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const alpha = 0.1 * (1 - distance / 120)
            ctx.strokeStyle = isDark ? `rgba(34, 197, 94, ${alpha})` : `rgba(34, 197, 94, ${alpha * 0.7})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initializeAnimation()
    animate()

    window.addEventListener("resize", () => {
      resizeCanvas()
      initializeAnimation()
    })

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />
}
