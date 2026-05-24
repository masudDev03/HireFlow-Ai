'use client'

import { useEffect, useState } from 'react'
import { Terminal, Search, BarChart3, DollarSign, Clock, AlertTriangle, Bot } from 'lucide-react'

interface LogEntry {
  id: string
  agent: string
  message: string
  timestamp: number
  type: 'info' | 'success' | 'warning' | 'processing'
}

export default function AIAgentFeed() {
  const [logs, setLogs] = useState<LogEntry[]>([])

  const agents = [
    { name: 'Scout AI', color: '#10b981', icon: Search },
    { name: 'Analyst AI', color: '#00d9ff', icon: BarChart3 },
    { name: 'Finance AI', color: '#fbbf24', icon: DollarSign },
    { name: 'Timeline AI', color: '#8b5cf6', icon: Clock },
    { name: 'Risk AI', color: '#ff6b35', icon: AlertTriangle },
    { name: 'Coordinator AI', color: '#10b981', icon: Bot },
  ]

  const messages = [
    { agent: 'Scout AI', message: 'Evaluating 247 senior frontend specialists...', type: 'processing' },
    { agent: 'Analyst AI', message: 'Project complexity rated at 8.2/10 across domains', type: 'info' },
    { agent: 'Finance AI', message: 'Budget allocation optimized: 40% dev, 30% design, 20% testing, 10% ops', type: 'success' },
    { agent: 'Timeline AI', message: 'Milestone breakdown complete: 12 weeks → 3 sprints', type: 'info' },
    { agent: 'Risk AI', message: 'Identified backend bottleneck risk - reallocating resources', type: 'warning' },
    { agent: 'Coordinator AI', message: 'Workspace initialized with 23 freelancer assignments', type: 'success' },
    { agent: 'Scout AI', message: 'Top candidates identified: 94% match confidence', type: 'success' },
    { agent: 'Finance AI', message: 'Contingency buffer activated: $15,000 reserved', type: 'info' },
  ]

  useEffect(() => {
    let messageIndex = 0

    const addLog = () => {
      if (messageIndex < messages.length) {
        const msg = messages[messageIndex]
        const newLog: LogEntry = {
          id: `${Date.now()}-${messageIndex}`,
          agent: msg.agent,
          message: msg.message,
          timestamp: Date.now(),
          type: msg.type as LogEntry['type'],
        }

        setLogs((prev) => {
          const updated = [...prev, newLog]
          return updated.length > 8 ? updated.slice(-8) : updated
        })

        messageIndex++
      }
    }

    const interval = setInterval(addLog, 1000)
    addLog() // Add first message immediately

    return () => clearInterval(interval)
  }, [])

  const getColorForAgent = (agentName: string) => {
    const agent = agents.find((a) => a.name === agentName)
    return agent?.color || '#00d9ff'
  }

  const getIconForAgent = (agentName: string) => {
    const agent = agents.find((a) => a.name === agentName)
    return agent?.icon
  }

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background/50 via-background to-background/50">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(0, 217, 255, 0.2) 0%, transparent 70%)',
            animation: 'pulse-glow 8s ease-in-out infinite',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="w-6 h-6 text-accent" />
            <h2 className="text-4xl lg:text-5xl font-bold text-balance">
              Live{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">
                AI Coordination
              </span>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Watch as multiple AI agents coordinate autonomously to manage your project
          </p>
        </div>

        {/* Terminal */}
        <div
          className="rounded-lg border border-accent/30 bg-card/30 backdrop-blur overflow-hidden"
          style={{
            boxShadow: '0 0 40px rgba(0, 217, 255, 0.1), inset 0 0 20px rgba(0, 217, 255, 0.02)',
          }}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-6 py-4 border-b border-muted/20 bg-muted/10">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-sm text-muted-foreground ml-4 font-mono">hireflow-ai@mission-control ~ %</span>
          </div>

          {/* Terminal content */}
          <div className="p-6 font-mono text-sm min-h-80 max-h-80 overflow-y-auto space-y-2 relative">
            {/* Scan line effect */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 1px,
                  rgba(0, 217, 255, 0.03) 1px,
                  rgba(0, 217, 255, 0.03) 2px
                )`,
                animation: 'scan-lines 8s linear infinite',
              }}
            />

            {logs.length === 0 ? (
              <div className="text-muted-foreground text-center py-16">
                <div className="inline-block p-3 rounded-lg bg-accent/10 mb-4">
                  <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                </div>
                <p>Initializing AI coordination system...</p>
              </div>
            ) : (
              logs.map((log) => {
                const IconComponent = getIconForAgent(log.agent)
                return (
                  <div
                    key={log.id}
                    className="flex gap-3 text-foreground animate-fadeIn"
                    style={{
                      animation: 'fadeIn 0.5s ease-out',
                    }}
                  >
                    <span style={{ color: getColorForAgent(log.agent) }} className="flex-shrink-0">
                      [{log.agent}]
                    </span>
                    {IconComponent && (
                      <IconComponent 
                        className="w-4 h-4 flex-shrink-0 icon-glow" 
                        strokeWidth={2}
                        style={{ color: getColorForAgent(log.agent) }}
                      />
                    )}
                    <span
                      className={`flex-1 ${
                        log.type === 'success'
                          ? 'text-secondary'
                          : log.type === 'warning'
                            ? 'text-destructive'
                            : log.type === 'processing'
                              ? 'text-accent animate-pulse'
                              : 'text-foreground'
                      }`}
                    >
                      {log.message}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                )
              })
            )}
          </div>

          {/* Terminal footer */}
          <div className="px-6 py-3 border-t border-muted/20 bg-muted/10 flex items-center gap-2">
            <span className="text-accent animate-pulse">▌</span>
            <span className="text-xs text-muted-foreground font-mono">System monitoring active - 12 agents coordinated</span>
          </div>
        </div>

        {/* Agent status grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
          {agents.map((agent) => {
            const IconComponent = agent.icon
            return (
              <div
                key={agent.name}
                className="p-4 rounded-lg border border-muted/30 bg-card/50 hover:border-accent/50 hover:bg-card/80 transition-all duration-300 cursor-pointer group"
              >
                <IconComponent 
                  className="w-6 h-6 mb-2 icon-glow" 
                  strokeWidth={1.5}
                  style={{ color: agent.color }}
                />
                <div className="text-sm font-medium text-foreground mb-1">{agent.name}</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
