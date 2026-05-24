'use client'

import { CheckCircle2, TrendingUp, AlertCircle, Users, Pencil, Code, Database, TestTube2 } from 'lucide-react'

export default function WorkspacePreview() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background via-background to-background">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(0, 217, 255, 0.2) 0%, transparent 70%)',
            animation: 'pulse-glow 8s ease-in-out infinite',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Autonomous{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">
              Workspace Preview
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the fully automated operational environment that HireFlow AI creates for your project
          </p>
        </div>

        {/* Dashboard preview */}
        <div
          className="rounded-lg border border-accent/30 bg-card/50 backdrop-blur overflow-hidden"
          style={{
            boxShadow: '0 0 40px rgba(0, 217, 255, 0.1), inset 0 0 20px rgba(0, 217, 255, 0.02)',
          }}
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-muted/20 bg-muted/10">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-secondary/80" />
              </div>
              <span className="text-sm text-muted-foreground ml-4 font-mono">Project Dashboard</span>
            </div>
            <span className="text-xs text-secondary bg-secondary/10 px-3 py-1 rounded-full">LIVE</span>
          </div>

          {/* Dashboard content */}
          <div className="p-8 grid lg:grid-cols-3 gap-6">
            {/* Left column - Key metrics */}
            <div className="space-y-6">
              {/* Project status */}
              <div className="p-4 rounded-lg border border-muted/20 bg-muted/5">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-sm font-semibold text-foreground">Project Status</h3>
                  <span className="text-xs text-secondary bg-secondary/10 px-2 py-1 rounded">Active</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-sm font-semibold text-accent">34%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-muted/30 overflow-hidden">
                      <div className="w-1/3 h-full bg-gradient-to-r from-accent to-secondary rounded-full" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Started</span>
                      <div className="font-mono text-foreground">May 1</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Due</span>
                      <div className="font-mono text-foreground">Aug 15</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confidence score */}
              <div className="p-4 rounded-lg border border-secondary/20 bg-secondary/5">
                <div className="text-xs text-muted-foreground mb-2">Delivery Confidence</div>
                <div className="text-4xl font-bold text-secondary mb-2">94.2%</div>
                <div className="flex items-center gap-2 text-xs text-secondary">
                  <TrendingUp className="w-3 h-3" />
                  <span>↑ 3.1% from last update</span>
                </div>
              </div>

              {/* Risk indicators */}
              <div className="p-4 rounded-lg border border-muted/20 bg-muted/5">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-4 h-4 text-destructive" />
                  <h3 className="text-sm font-semibold text-foreground">Active Risks</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-muted/20">
                    <span className="text-xs text-foreground">Backend Load</span>
                    <span className="text-xs text-destructive font-semibold">Medium</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/20">
                    <span className="text-xs text-foreground">Timeline Pressure</span>
                    <span className="text-xs text-yellow-500 font-semibold">Low</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle column - Timeline */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground mb-4">Milestone Timeline</h3>

              {[
                { name: 'Design Phase', progress: 100, status: 'completed' },
                { name: 'Frontend Dev', progress: 75, status: 'active' },
                { name: 'Backend Dev', progress: 40, status: 'active' },
                { name: 'Testing', progress: 10, status: 'pending' },
              ].map((milestone, index) => (
                <div key={index} className="p-3 rounded-lg border border-muted/20 bg-muted/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-foreground">{milestone.name}</span>
                    <span
                      className={`text-xs font-semibold ${
                        milestone.status === 'completed'
                          ? 'text-secondary'
                          : milestone.status === 'active'
                            ? 'text-accent'
                            : 'text-muted-foreground'
                      }`}
                    >
                      {milestone.progress}%
                    </span>
                  </div>
                  <div className="w-full h-1 rounded-full bg-muted/30 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        milestone.status === 'completed'
                          ? 'bg-secondary'
                          : milestone.status === 'active'
                            ? 'bg-accent'
                            : 'bg-muted/50'
                      }`}
                      style={{ width: `${milestone.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Right column - Team */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground mb-4">Assigned Freelancers</h3>

              {[
                { icon: Pencil, name: 'Sarah Chen', role: 'Lead Designer' },
                { icon: Code, name: 'Alex Rodriguez', role: 'Frontend Lead' },
                { icon: Database, name: 'Sam Patel', role: 'Backend Lead' },
                { icon: TestTube2, name: 'Jordan Lee', role: 'QA Engineer' },
              ].map((member, index) => (
                <div key={index} className="p-3 rounded-lg border border-muted/20 bg-muted/5 hover:border-accent/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <member.icon className="w-4 h-4 text-accent icon-glow" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-foreground truncate">{member.name}</div>
                      <div className="text-xs text-muted-foreground">{member.role}</div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                  </div>
                </div>
              ))}

              {/* Add more button */}
              <button className="w-full p-3 rounded-lg border border-dashed border-muted/30 text-xs text-muted-foreground hover:border-accent/50 hover:text-accent transition-colors">
                + Add Freelancer
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 border-t border-muted/20 bg-muted/5 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>Real-time monitoring active</span>
            </div>
            <span className="font-mono">Last updated 2 mins ago</span>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {[
            {
              icon: Users,
              title: 'Intelligent Team Assembly',
              description: 'AI automatically matches and assigns the perfect freelancers for each role and task',
            },
            {
              icon: TrendingUp,
              title: 'Real-time Performance Tracking',
              description: 'Monitor progress, metrics, and KPIs across all project phases with live dashboards',
            },
            {
              icon: AlertCircle,
              title: 'Proactive Issue Detection',
              description: 'AI identifies risks and bottlenecks before they impact your project timeline',
            },
            {
              icon: CheckCircle2,
              title: 'Automated Quality Assurance',
              description: 'Continuous verification and testing with AI-powered quality gates at every milestone',
            },
          ].map((feature, index) => {
            const Icon = feature.icon

            return (
              <div
                key={index}
                className="p-6 rounded-lg border border-muted/20 bg-card/50 hover:border-accent/50 hover:bg-card/80 transition-all duration-300 group"
              >
                <Icon className="w-6 h-6 text-accent mb-4 icon-glow group-hover:animate-pulse" strokeWidth={1.5} />
                <h4 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
