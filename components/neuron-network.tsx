"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

interface Connection {
  from: number
  to: number
  strength: number
}

export default function NeuronNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const nodesRef = useRef<Node[]>([])
  const connectionsRef = useRef<Connection[]>([])
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

    const initializeNetwork = () => {
      const nodeCount = 50
      const nodes: Node[] = []
      const connections: Connection[] = []

      // Create nodes
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        })
      }

      // Create connections
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          if (Math.random() < 0.1) {
            connections.push({
              from: i,
              to: j,
              strength: Math.random(),
            })
          }
        }
      }

      nodesRef.current = nodes
      connectionsRef.current = connections
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const nodes = nodesRef.current
      const connections = connectionsRef.current

      // Update node positions
      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1

        // Keep nodes in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))
      })

      // Adapt colors based on theme
      const isDark = theme === "dark"
      const connectionColor = isDark ? "rgba(20, 184, 166, 0.15)" : "rgba(20, 184, 166, 0.1)"
      const nodeColor = isDark ? "rgba(20, 184, 166, 0.9)" : "rgba(20, 184, 166, 0.8)"

      // Draw connections
      ctx.strokeStyle = connectionColor
      ctx.lineWidth = 1
      connections.forEach((connection) => {
        const fromNode = nodes[connection.from]
        const toNode = nodes[connection.to]

        ctx.globalAlpha = connection.strength * (isDark ? 0.4 : 0.3)
        ctx.beginPath()
        ctx.moveTo(fromNode.x, fromNode.y)
        ctx.lineTo(toNode.x, toNode.y)
        ctx.stroke()
      })

      // Draw nodes
      ctx.globalAlpha = isDark ? 0.8 : 0.6
      ctx.fillStyle = nodeColor
      nodes.forEach((node) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initializeNetwork()
    animate()

    window.addEventListener("resize", () => {
      resizeCanvas()
      initializeNetwork()
    })

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />
}
