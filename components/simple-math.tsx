"use client"

interface SimpleMathProps {
  children: string
  className?: string
}

export default function SimpleMath({ children, className = "" }: SimpleMathProps) {
  // Simple symbol replacement
  const renderMath = (formula: string) => {
    return formula
      .replace(/\\nabla/g, "∇")
      .replace(/\\cdot/g, "·")
      .replace(/\\times/g, "×")
      .replace(/\\pi/g, "π")
      .replace(/\\alpha/g, "α")
      .replace(/\\beta/g, "β")
      .replace(/\\gamma/g, "γ")
      .replace(/\\delta/g, "δ")
      .replace(/\\epsilon/g, "ε")
      .replace(/\\theta/g, "θ")
      .replace(/\\lambda/g, "λ")
      .replace(/\\mu/g, "μ")
      .replace(/\\sigma/g, "σ")
      .replace(/\\phi/g, "φ")
      .replace(/\\omega/g, "ω")
      .replace(/\\sum/g, "∑")
      .replace(/\\int/g, "∫")
      .replace(/\\partial/g, "∂")
      .replace(/\\infty/g, "∞")
      .replace(/\\leq/g, "≤")
      .replace(/\\geq/g, "≥")
      .replace(/\\neq/g, "≠")
      .replace(/\\approx/g, "≈")
      .replace(/\\pm/g, "±")
      .replace(/\\sqrt{([^}]+)}/g, "√($1)")
      .replace(/\\frac{([^}]+)}{([^}]+)}/g, "($1)/($2)")
      .replace(/\\_/g, "_")
      .replace(/\\\\/g, "")
      .replace(/[{}]/g, "")
  }

  return (
    <span
      className={`inline-block font-serif italic ${className}`}
      style={{
        fontFamily: "'Times New Roman', 'STIX Two Math', serif",
        fontSize: "1.1em",
      }}
    >
      {renderMath(children)}
    </span>
  )
}
