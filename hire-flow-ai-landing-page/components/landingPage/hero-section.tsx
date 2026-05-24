'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Play, Network, Zap, Shield } from 'lucide-react'

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [systemState, setSystemState] = useState<string>('SCANNING TALENT')
  const [mounted, setMounted] = useState(false)

  // Only update dynamic content after mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
    
    const interval = setInterval(() => {
      const states = ['SCANNING TALENT', 'MATCHING SPECIALISTS', 'ANALYZING RISK', 'ALLOCATING BUDGET', 'INITIALIZING WORKSPACE', 'DEPLOYMENT READY']
      const index = Math.floor((Date.now() * 0.0005) % states.length)
      setSystemState(states[index])
    }, 500)
    
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let animationFrameId: number
    let time = 0

    // Operational states that cycle
    const operationalStates = [
      { label: 'SCANNING TALENT', color: '#00d9ff' },
      { label: 'MATCHING SPECIALISTS', color: '#10b981' },
      { label: 'ANALYZING RISK', color: '#ff6b35' },
      { label: 'ALLOCATING BUDGET', color: '#fbbf24' },
      { label: 'INITIALIZING WORKSPACE', color: '#8b5cf6' },
      { label: 'DEPLOYMENT READY', color: '#10b981' },
    ]

    // Operational metrics that cycle
    const operationalMetrics = [
      { label: 'MATCH SCORE', value: '94%', color: '#10b981' },
      { label: 'RISK LEVEL', value: 'LOW', color: '#10b981' },
      { label: 'DELIVERY STATUS', value: 'STABLE', color: '#10b981' },
      { label: 'TEAM SYNCHRONIZED', value: 'YES', color: '#00d9ff' },
    ]

    interface Node {
      x: number
      y: number
      type: 'core' | 'ai' | 'specialist'
      label: string
      color: string
      baseDistance?: number
      baseAngle?: number
      activeTime?: number
      status?: string
    }

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Create nodes
    const nodes: Node[] = [
      {
        x: centerX,
        y: centerY,
        type: 'core',
        label: 'HIREFLOW CORE',
        color: '#00d9ff',
        status: 'ACTIVE',
      },
    ]

    // AI Agents (inner circle)
    const aiAgents = ['Scout AI', 'Risk AI', 'Timeline AI', 'Finance AI', 'Coordinator AI']
    const aiStatuses = ['SCANNING', 'ANALYZING', 'MONITORING', 'OPTIMIZING', 'COORDINATING']
    aiAgents.forEach((label, i) => {
      const angle = (i / aiAgents.length) * Math.PI * 2
      const distance = 100
      nodes.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        type: 'ai',
        label,
        color: ['#00d9ff', '#10b981', '#ff6b35', '#fbbf24', '#8b5cf6'][i],
        baseDistance: distance,
        baseAngle: angle,
        status: aiStatuses[i],
      })
    })

    // Specialists (outer circle)
    const specialists = ['Frontend Developer', 'AI Engineer', 'Product Designer', 'Backend Specialist']
    const specialistStatuses = ['AVAILABLE', 'ACTIVE', 'AVAILABLE', 'ACTIVE']
    specialists.forEach((label, i) => {
      const angle = (i / specialists.length) * Math.PI * 2 + Math.PI / 4
      const distance = 160
      nodes.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        type: 'specialist',
        label,
        color: '#00d9ff',
        baseDistance: distance,
        baseAngle: angle,
        status: specialistStatuses[i],
      })
    })

    // Communication signals for flowing lines
    interface Signal {
      fromIndex: number
      toIndex: number
      progress: number
      speed: number
    }

    const signals: Signal[] = []

    const addRandomSignal = () => {
      if (signals.length < 4 && Math.random() > 0.7) {
        const fromNode = nodes[Math.floor(Math.random() * (nodes.length - 1)) + 1]
        const toNode = nodes[0]
        signals.push({
          fromIndex: nodes.indexOf(fromNode),
          toIndex: nodes.indexOf(toNode),
          progress: 0,
          speed: 0.01 + Math.random() * 0.01,
        })
      }
    }

    const animate = () => {
      time += 1
      
      // Clear with fade
      ctx.fillStyle = 'rgba(10, 10, 10, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update node positions for orbital motion
      nodes.forEach((node, index) => {
        if (node.type === 'ai' || node.type === 'specialist') {
          const orbit = Math.sin(time * 0.002 + (index % 5)) * 5
          node.x = centerX + Math.cos(node.baseAngle!) * (node.baseDistance! + orbit)
          node.y = centerY + Math.sin(node.baseAngle!) * (node.baseDistance! + orbit)
        }
      })

      // Draw connection lines from core to all nodes
      nodes.slice(1).forEach((node) => {
        const gradient = ctx.createLinearGradient(centerX, centerY, node.x, node.y)
        gradient.addColorStop(0, `rgba(0, 217, 255, 0.3)`)
        gradient.addColorStop(0.5, `rgba(0, 217, 255, 0.1)`)
        gradient.addColorStop(1, `rgba(0, 217, 255, 0)`)
        
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.5
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(node.x, node.y)
        ctx.stroke()
        ctx.setLineDash([])
      })

      // Draw pulsing data flow dots along connection lines
      nodes.slice(1).forEach((node, nodeIndex) => {
        const distance = Math.sqrt(
          Math.pow(node.x - centerX, 2) + Math.pow(node.y - centerY, 2)
        )
        
        // Create multiple pulses traveling along the line
        for (let pulseIndex = 0; pulseIndex < 2; pulseIndex++) {
          const progress = ((time * 0.004 + (pulseIndex * 0.5)) % 1)
          const x = centerX + (node.x - centerX) * progress
          const y = centerY + (node.y - centerY) * progress
          
          const pulseSize = 3 * (1 - Math.abs(progress - 0.5) * 2)
          const pulseAlpha = Math.cos(progress * Math.PI) * 0.6 + 0.4
          
          ctx.fillStyle = `rgba(0, 217, 255, ${pulseAlpha})`
          ctx.beginPath()
          ctx.arc(x, y, pulseSize, 0, Math.PI * 2)
          ctx.fill()
          
          // Glow around pulse
          const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 8)
          glowGradient.addColorStop(0, `rgba(0, 217, 255, ${pulseAlpha * 0.4})`)
          glowGradient.addColorStop(1, `rgba(0, 217, 255, 0)`)
          ctx.fillStyle = glowGradient
          ctx.beginPath()
          ctx.arc(x, y, 8, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Update and draw signals
      signals.forEach((signal, index) => {
        signal.progress += signal.speed

        if (signal.progress >= 1) {
          signals.splice(index, 1)
          return
        }

        const fromNode = nodes[signal.fromIndex]
        const toNode = nodes[signal.toIndex]

        const x = fromNode.x + (toNode.x - fromNode.x) * signal.progress
        const y = fromNode.y + (toNode.y - fromNode.y) * signal.progress

        // Signal glow
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 8)
        glowGradient.addColorStop(0, `rgba(0, 217, 255, ${0.8 * (1 - signal.progress)})`)
        glowGradient.addColorStop(1, `rgba(0, 217, 255, 0)`)

        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(0, 217, 255, ${1 - signal.progress})`
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      })

      addRandomSignal()

      // Draw nodes
      nodes.forEach((node, index) => {
        const pulse = Math.sin(time * 0.01 + index) * 0.3 + 0.7

        if (node.type === 'core') {
          // Core node - bright and prominent
          const coreGlow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 30)
          coreGlow.addColorStop(0, `rgba(0, 217, 255, ${0.5 * pulse})`)
          coreGlow.addColorStop(0.5, `rgba(0, 217, 255, 0.2)`)
          coreGlow.addColorStop(1, `rgba(0, 217, 255, 0)`)

          ctx.fillStyle = coreGlow
          ctx.fillRect(node.x - 30, node.y - 30, 60, 60)

          // Inner glow
          const innerGlow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 18)
          innerGlow.addColorStop(0, `rgba(0, 217, 255, ${pulse})`)
          innerGlow.addColorStop(1, `rgba(0, 217, 255, 0.2)`)

          ctx.fillStyle = innerGlow
          ctx.beginPath()
          ctx.arc(node.x, node.y, 18, 0, Math.PI * 2)
          ctx.fill()

          // Core square
          ctx.fillStyle = '#00d9ff'
          ctx.fillRect(node.x - 12, node.y - 12, 24, 24)
        } else if (node.type === 'ai') {
          // AI nodes - medium glow
          const nodeGlow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 15)
          nodeGlow.addColorStop(0, `rgba(${hexToRgb(node.color).r}, ${hexToRgb(node.color).g}, ${hexToRgb(node.color).b}, ${0.4 * pulse})`)
          nodeGlow.addColorStop(1, `rgba(${hexToRgb(node.color).r}, ${hexToRgb(node.color).g}, ${hexToRgb(node.color).b}, 0)`)

          ctx.fillStyle = nodeGlow
          ctx.beginPath()
          ctx.arc(node.x, node.y, 15, 0, Math.PI * 2)
          ctx.fill()

          ctx.fillStyle = node.color
          ctx.beginPath()
          ctx.arc(node.x, node.y, 7, 0, Math.PI * 2)
          ctx.fill()

          // Status indicator
          ctx.fillStyle = '#10b981'
          ctx.beginPath()
          ctx.arc(node.x + 8, node.y - 8, 3, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // Specialist nodes - subtle
          const nodeGlow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 12)
          nodeGlow.addColorStop(0, `rgba(0, 217, 255, ${0.3 * pulse})`)
          nodeGlow.addColorStop(1, `rgba(0, 217, 255, 0)`)

          ctx.fillStyle = nodeGlow
          ctx.beginPath()
          ctx.arc(node.x, node.y, 12, 0, Math.PI * 2)
          ctx.fill()

          ctx.fillStyle = '#00d9ff'
          ctx.beginPath()
          ctx.arc(node.x, node.y, 5, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Draw node labels with pill backgrounds
      nodes.forEach((node) => {
        if (node.type === 'core') {
          // Core label centered above
          ctx.fillStyle = '#00d9ff'
          ctx.font = 'bold 11px monospace'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'bottom'
          ctx.fillText(node.label, node.x, node.y - 25)
          ctx.fillStyle = 'rgba(0, 217, 255, 0.6)'
          ctx.font = '9px monospace'
          ctx.fillText(`STATUS: ${node.status}`, node.x, node.y - 13)
        } else if (node.type === 'ai') {
          // AI node label with pill background
          const angle = node.baseAngle!
          const isLeftSide = angle > Math.PI / 2 && angle < (3 * Math.PI) / 2
          
          // Label positioning - directly offset from node, not separate label distance
          const labelOffsetX = Math.cos(angle) * 18
          const labelOffsetY = Math.sin(angle) * 18
          const labelX = node.x + labelOffsetX
          const labelY = node.y + labelOffsetY
          
          // Measure text for pill background
          ctx.font = '9px monospace'
          const metrics = ctx.measureText(node.label)
          const textWidth = metrics.width
          const pillPadding = 5
          const pillWidth = textWidth + pillPadding * 2
          const pillHeight = 16
          
          // Pill background positioning
          const pillX = isLeftSide ? labelX - pillWidth : labelX
          const pillY = labelY - pillHeight / 2
          
          // Draw semi-transparent dark pill background
          ctx.fillStyle = 'rgba(10, 10, 10, 0.7)'
          ctx.beginPath()
          ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 8)
          ctx.fill()
          
          // Draw pill border with node color
          ctx.strokeStyle = `rgba(${hexToRgb(node.color).r}, ${hexToRgb(node.color).g}, ${hexToRgb(node.color).b}, 0.5)`
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 8)
          ctx.stroke()
          
          // Draw label text
          ctx.fillStyle = node.color
          ctx.textAlign = isLeftSide ? 'right' : 'left'
          ctx.textBaseline = 'middle'
          ctx.fillText(node.label, isLeftSide ? labelX - pillPadding : labelX + pillPadding, labelY)
          
          // Status indicator dot
          ctx.fillStyle = '#10b981'
          ctx.beginPath()
          ctx.arc(isLeftSide ? pillX + 5 : pillX + pillWidth - 5, pillY + pillHeight / 2, 2.5, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // Specialist node label with pill background
          const angle = node.baseAngle!
          const isLeftSide = angle > Math.PI / 2 && angle < (3 * Math.PI) / 2
          
          // Label positioning
          const labelOffsetX = Math.cos(angle) * 16
          const labelOffsetY = Math.sin(angle) * 16
          const labelX = node.x + labelOffsetX
          const labelY = node.y + labelOffsetY
          
          // Measure text for pill background
          ctx.font = '9px monospace'
          const metrics = ctx.measureText(node.label)
          const textWidth = metrics.width
          const pillPadding = 5
          const pillWidth = textWidth + pillPadding * 2
          const pillHeight = 16
          
          // Pill background positioning
          const pillX = isLeftSide ? labelX - pillWidth : labelX
          const pillY = labelY - pillHeight / 2
          
          // Draw semi-transparent dark pill background
          ctx.fillStyle = 'rgba(10, 10, 10, 0.65)'
          ctx.beginPath()
          ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 8)
          ctx.fill()
          
          // Draw pill border with accent color
          ctx.strokeStyle = 'rgba(0, 217, 255, 0.4)'
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 8)
          ctx.stroke()
          
          // Draw label text
          ctx.fillStyle = '#00d9ff'
          ctx.textAlign = isLeftSide ? 'right' : 'left'
          ctx.textBaseline = 'middle'
          ctx.fillText(node.label, isLeftSide ? labelX - pillPadding : labelX + pillPadding, labelY)
          
          // Status indicator
          ctx.fillStyle = node.status === 'ACTIVE' ? '#10b981' : 'rgba(139, 92, 246, 0.6)'
          ctx.beginPath()
          ctx.arc(isLeftSide ? pillX + 5 : pillX + pillWidth - 5, pillY + pillHeight / 2, 2.5, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Draw operational state indicator
      const stateIndex = Math.floor((time * 0.0005) % operationalStates.length)
      const state = operationalStates[stateIndex]

      // Scanning pulse from core
      const scanRadius = 40 + (time * 0.5) % 50
      const scanAlpha = Math.max(0, 1 - (scanRadius - 40) / 50)
      ctx.strokeStyle = `rgba(${hexToRgb(state.color).r}, ${hexToRgb(state.color).g}, ${hexToRgb(state.color).b}, ${scanAlpha * 0.4})`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(centerX, centerY, scanRadius, 0, Math.PI * 2)
      ctx.stroke()

      animationFrameId = requestAnimationFrame(animate)
    }

    // Helper function to convert hex to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 0, g: 217, b: 255 }
    }

    // Polyfill for roundRect if not available
    if (!ctx.roundRect) {
      ctx.roundRect = function (x, y, w, h, r) {
        if (w < 2 * r) r = w / 2
        if (h < 2 * r) r = h / 2
        this.beginPath()
        this.moveTo(x + r, y)
        this.arcTo(x + w, y, x + w, y + h, r)
        this.arcTo(x + w, y + h, x, y + h, r)
        this.arcTo(x, y + h, x, y, r)
        this.arcTo(x, y, x + w, y, r)
        this.closePath()
        return this
      } as any
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-background via-background to-background/80">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(0, 217, 255, 0.1) 25%, rgba(0, 217, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.1) 75%, rgba(0, 217, 255, 0.1) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0, 217, 255, 0.1) 25%, rgba(0, 217, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.1) 75%, rgba(0, 217, 255, 0.1) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-20 lg:py-32 grid lg:grid-cols-2 gap-12 items-center min-h-screen">
        {/* Left column - Content */}
        <div className="flex flex-col justify-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-accent/30 bg-accent/5 w-fit">
            <div className="w-2 h-2 rounded-full bg-accent mr-2 pulse-glow" />
            <span className="text-sm font-medium text-accent">AI Mission Control</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-7xl font-bold text-balance leading-tight tracking-tight">
            Deploy an{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-secondary to-accent">
              Autonomous Hiring Team
            </span>{' '}
            in Seconds
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            HireFlow AI coordinates multiple AI agents to automatically manage freelance projects. Submit your vision, let
            intelligent systems handle the rest.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="group relative px-8 py-4 rounded-lg bg-accent text-accent-foreground font-semibold overflow-hidden hover:shadow-lg hover:shadow-accent/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <span className="relative flex items-center justify-center gap-2">
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>

            <button className="group px-8 py-4 rounded-lg border border-muted-foreground/30 hover:border-accent/50 text-foreground font-semibold transition-all duration-300 hover:bg-accent/5">
              <span className="flex items-center justify-center gap-2">
                <Play className="w-4 h-4" />
                Watch Demo
              </span>
            </button>
          </div>

          {/* Feature indicators */}
          <div className="flex flex-wrap gap-4 pt-8 border-t border-muted/20">
            {[
              { icon: Network, label: 'Multi-Agent Coordination' },
              { icon: Zap, label: 'Real-time Workspace' },
              { icon: Shield, label: 'AI Risk Detection' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors duration-300">
                <Icon className="w-4 h-4 icon-glow" strokeWidth={1.5} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Right column - Visualization */}
        <div className="relative h-full min-h-[400px] lg:min-h-[600px] flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full rounded-lg border border-accent/20"
            style={{
              boxShadow: '0 0 40px rgba(0, 217, 255, 0.1), inset 0 0 20px rgba(0, 217, 255, 0.05)',
            }}
          />
          
          {/* Operational State Display */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            <div className="text-xs font-mono text-accent tracking-wider opacity-75">
              &gt; SYSTEM STATE
            </div>
            {mounted && (
              <div className="text-xs font-mono text-accent font-semibold animate-pulse">
                {systemState}
              </div>
            )}
          </div>

          {/* Metrics Display */}
          <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-2 text-xs font-mono">
            <div className="text-muted-foreground">OPERATIONAL METRICS</div>
            <div className="space-y-1">
              <div className="text-accent">MATCH SCORE: <span className="text-secondary">94%</span></div>
              <div className="text-accent">RISK LEVEL: <span className="text-secondary">LOW</span></div>
              <div className="text-accent">TEAM SYNCHRONIZED: <span className="text-secondary">YES</span></div>
            </div>
          </div>

          {/* System Status */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3 py-2 rounded bg-background/80 backdrop-blur border border-muted/20">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs text-muted-foreground font-mono">LIVE COORDINATION</span>
          </div>

          {/* Network Nodes Legend */}
          <div className="absolute top-4 right-4 z-20 text-xs font-mono space-y-1">
            <div className="text-muted-foreground mb-2">NETWORK NODES</div>
            <div className="text-accent flex items-center gap-2">
              <div className="w-3 h-3 bg-accent" style={{ boxShadow: '0 0 10px #00d9ff' }} />
              <span>HIREFLOW CORE</span>
            </div>
            <div className="text-[#10b981] flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10b981]" style={{ boxShadow: '0 0 8px #10b981' }} />
              <span>AI AGENTS</span>
            </div>
            <div className="text-accent/60 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" style={{ boxShadow: '0 0 6px #00d9ff' }} />
              <span>SPECIALISTS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
