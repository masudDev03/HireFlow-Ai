'use client'

import { Zap, Users, AlertTriangle, TrendingUp, Cpu, Workflow, Layers, Radio } from 'lucide-react'

export default function FeatureModules() {
  const modules = [
    {
      title: 'Autonomous Milestone Generator',
      description: 'AI-powered breakdown of projects into intelligent, executable milestones',
      icon: Cpu,
      metrics: [
        { label: 'Accuracy', value: '99.2%' },
        { label: 'Time Saved', value: '85%' },
      ],
      color: 'from-accent/20 to-accent/5',
      borderColor: 'border-accent/30',
    },
    {
      title: 'Freelancer Intelligence Matching',
      description: 'Smart algorithm connects tasks with perfect freelancer candidates',
      icon: Users,
      metrics: [
        { label: 'Match Score', value: '94.7%' },
        { label: 'Candidates', value: '2.4K+' },
      ],
      color: 'from-secondary/20 to-secondary/5',
      borderColor: 'border-secondary/30',
    },
    {
      title: 'Risk Intelligence Engine',
      description: 'Proactive detection and mitigation of project risks in real-time',
      icon: AlertTriangle,
      metrics: [
        { label: 'Risk Coverage', value: '98.5%' },
        { label: 'Prevention Rate', value: '92%' },
      ],
      color: 'from-destructive/20 to-destructive/5',
      borderColor: 'border-destructive/30',
    },
    {
      title: 'Budget Allocation System',
      description: 'Intelligent distribution of resources across project phases',
      icon: TrendingUp,
      metrics: [
        { label: 'Optimization', value: '89%' },
        { label: 'Accuracy', value: '96.3%' },
      ],
      color: 'from-yellow-500/20 to-yellow-500/5',
      borderColor: 'border-yellow-500/30',
    },
    {
      title: 'AI Workspace Initialization',
      description: 'Instantly deploy a fully configured operational environment',
      icon: Zap,
      metrics: [
        { label: 'Setup Time', value: '<2min' },
        { label: 'Ready Rate', value: '100%' },
      ],
      color: 'from-purple-500/20 to-purple-500/5',
      borderColor: 'border-purple-500/30',
    },
  ]

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background via-background to-background">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute -top-1/2 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(0, 217, 255, 0.2) 0%, transparent 70%)',
            animation: 'pulse-glow 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -bottom-1/2 left-0 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
            animation: 'pulse-glow 10s ease-in-out infinite reverse',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Tactical{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">
              System Modules
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Specialized AI systems that coordinate to deliver intelligent hiring operations
          </p>
        </div>

        {/* Module grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {modules.map((module, index) => {
            const Icon = module.icon

            return (
              <div
                key={module.title}
                className={`group relative p-6 rounded-lg border overflow-hidden transition-all duration-500 hover:shadow-lg cursor-pointer ${module.borderColor}`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-muted/50 group-hover:bg-accent/20 flex items-center justify-center transition-colors duration-300">
                    <Icon className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                    {module.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground">{module.description}</p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-muted/20">
                    {module.metrics.map((metric) => (
                      <div key={metric.label}>
                        <div className="text-sm font-bold text-accent">{metric.value}</div>
                        <div className="text-xs text-muted-foreground">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Border animation */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            )
          })}
        </div>

        {/* Integration info */}
        <div className="relative p-8 rounded-lg border border-accent/20 bg-accent/5 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(45deg, transparent 30%, rgba(0, 217, 255, 0.1) 50%, transparent 70%)`,
                backgroundSize: '200px 200px',
                animation: 'grid-animate 20s linear infinite',
              }}
            />
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Seamless Integration</h3>
            <p className="text-muted-foreground max-w-2xl mb-6">
              All modules communicate in real-time, sharing intelligence and coordinating decisions. The system learns from each project and continuously improves its accuracy and efficiency across all operations.
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Workflow, label: 'Real-time Sync' },
                { icon: Layers, label: 'Continuous Learning' },
                { icon: Radio, label: 'Auto-Optimization' },
                { icon: AlertTriangle, label: 'Error Recovery' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-muted/30 bg-background/50 group hover:border-accent/50 transition-colors duration-300">
                  <Icon className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors duration-300 icon-glow" strokeWidth={1.5} />
                  <span className="text-sm text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
