'use client'

import { useState } from 'react'
import { Upload, Zap, Rocket } from 'lucide-react'

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1)

  const steps = [
    {
      id: 1,
      title: 'Project Submission',
      description: 'Submit your startup idea with project requirements and budget',
      icon: Upload,
      details: ['Describe your vision', 'Set timeline & budget', 'Define team needs'],
    },
    {
      id: 2,
      title: 'AI Multi-Agent Coordination',
      description: 'Multiple AI agents analyze and activate simultaneously',
      icon: Zap,
      details: ['Scout AI evaluates candidates', 'Finance AI allocates budget', 'Timeline AI schedules phases'],
    },
    {
      id: 3,
      title: 'Workspace Deployment',
      description: 'Complete operational workspace generated automatically',
      icon: Rocket,
      details: ['Freelancers assigned', 'Milestones created', 'Systems initialized'],
    },
  ]

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background/50 via-background to-background/50">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(0, 217, 255, 0.1) 0%, transparent 50%)',
            animation: 'float-up 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
            animation: 'float-up 25s ease-in-out infinite reverse',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
            How It{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">
              Works
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From concept to operational workspace in three strategic activation phases
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = activeStep === step.id

            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className="relative group cursor-pointer"
              >
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-16 -right-4 w-8 h-1 bg-gradient-to-r from-accent/50 to-transparent"
                    style={{
                      animation: 'connection-flow 3s linear infinite',
                    }}
                  />
                )}

                {/* Card */}
                <div
                  className={`p-8 rounded-lg border transition-all duration-500 ${
                    isActive
                      ? 'border-accent bg-accent/10 shadow-lg shadow-accent/20'
                      : 'border-muted/30 bg-card/50 hover:border-accent/50'
                  }`}
                >
                  {/* Step number */}
                  <div
                    className={`w-12 h-12 rounded-lg mb-6 flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted text-muted-foreground group-hover:bg-accent/20 group-hover:text-accent'
                    }`}
                  >
                    {step.id}
                  </div>

                  {/* Icon */}
                  <Icon className={`w-8 h-8 mb-4 ${isActive ? 'text-accent' : 'text-muted-foreground group-hover:text-accent'} transition-colors duration-300`} />

                  {/* Title */}
                  <h3 className={`text-xl font-semibold mb-2 ${isActive ? 'text-accent' : 'text-foreground'}`}>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4">{step.description}</p>

                  {/* Details - Show when active */}
                  {isActive && (
                    <div className="mt-6 pt-6 border-t border-accent/20 space-y-2 animate-fadeIn">
                      {step.details.map((detail) => (
                        <div key={detail} className="flex items-center gap-2 text-sm text-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Timeline indicator */}
        <div className="flex justify-center gap-3">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeStep === step.id
                  ? 'w-8 bg-accent'
                  : 'w-2 bg-muted hover:bg-muted-foreground'
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  )
}
