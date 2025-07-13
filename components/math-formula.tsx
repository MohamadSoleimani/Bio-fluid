"use client"

import { useEffect, useRef, useState } from "react"

interface MathFormulaProps {
  formula: string
  className?: string
  displayMode?: boolean
}

export default function MathFormula({ formula, className = "", displayMode = true }: MathFormulaProps) {
  const mathRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !mathRef.current) return

    const renderMath = () => {
      if (!mathRef.current) return

      try {
        // Try to load KaTeX from CDN if not available
        if (typeof window !== 'undefined' && !(window as any).katex) {
          // Load KaTeX from CDN
          const script = document.createElement('script')
          script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js'
          script.onload = () => {
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css'
            document.head.appendChild(link)
            
            setTimeout(() => renderWithKatex(), 100)
          }
          document.head.appendChild(script)
        } else if ((window as any).katex) {
          renderWithKatex()
        } else {
          // Fallback to simple text rendering
          renderFallback()
        }
      } catch (error) {
        console.error('Math rendering error:', error)
        renderFallback()
      }
    }

    const renderWithKatex = () => {
      if (!mathRef.current) return
      
      try {
        const katex = (window as any).katex
        if (katex) {
          mathRef.current.innerHTML = ''
          katex.render(formula, mathRef.current, {
            displayMode: displayMode,
            throwOnError: false,
            errorColor: '#dc2626',
            strict: false,
          })
        } else {
          renderFallback()
        }
      } catch (error) {
        console.error('KaTeX render error:', error)
        renderFallback()
      }
    }

    const renderFallback = () => {
      if (!mathRef.current) return
      
      // Simple text replacement for common symbols
      let displayFormula = formula
        .replace(/\\nabla/g, '∇')
        .replace(/\\cdot/g, '·')
        .replace(/\\times/g, '×')
        .replace(/\\pi/g, 'π')
        .replace(/\\alpha/g, 'α')
        .replace(/\\beta/g, 'β')
        .replace(/\\gamma/g, 'γ')
        .replace(/\\delta/g, 'δ')
        .replace(/\\epsilon/g, 'ε')
        .replace(/\\theta/g, 'θ')
        .replace(/\\lambda/g, 'λ')
        .replace(/\\mu/g, 'μ')
        .replace(/\\sigma/g, 'σ')
        .replace(/\\phi/g, 'φ')
        .replace(/\\omega/g, 'ω')
        .replace(/\\sum/g, '∑')
        .replace(/\\int/g, '∫')
        .replace(/\\partial/g, '∂')
        .replace(/\\infty/g, '∞')
        .replace(/\\leq/g, '≤')
        .replace(/\\geq/g, '≥')
        .replace(/\\neq/g, '≠')
        .replace(/\\approx/g, '≈')
        .replace(/\\pm/g, '±')
        .replace(/\\sqrt{([^}]+)}/g, '√($1)')
        .replace(/\\frac{([^}]+)}{([^}]+)}/g, '($1)/($2)')
        .replace(/\\_/g, '_')
        .replace(/\\\\/g, '')
        .replace(/[{}]/g, '')

      mathRef.current.innerHTML = `
        <span style="
          font-family: 'Times New Roman', 'STIX Two Math', serif;
          font-style: italic;
          font-size: ${displayMode ? '1.2em' : '1em'};
          color: inherit;
        ">
          ${displayFormula}
        </span>
      `
    }

    renderMath()
  }, [formula, displayMode, isClient])

  if (!isClient) {
    return (
      <div className={`flex justify-center my-4 ${className}`}>
        <div className="animate-pulse bg-muted rounded h-6 w-24"></div>
      </div>
    )
  }

  return (
    <div
      ref={mathRef}
      className={`flex justify-center my-4 ${className}`}
      style={{
        minHeight: displayMode ? "40px" : "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  )
}