'use client'

import { ArrowRight } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Grid animation */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(0, 217, 255, 0.05) 25%, rgba(0, 217, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.05) 75%, rgba(0, 217, 255, 0.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(0, 217, 255, 0.05) 25%, rgba(0, 217, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.05) 75%, rgba(0, 217, 255, 0.05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '100px 100px',
            animation: 'grid-animate 30s linear infinite',
          }}
        />

        {/* Glowing orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0, 217, 255, 0.15) 0%, transparent 70%)',
            animation: 'float-up 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
            animation: 'float-up 25s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        {/* Main heading */}
        <h2 className="text-5xl lg:text-7xl font-bold mb-8 text-balance leading-tight">
          Initialize Your AI{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-secondary to-accent">
            Hiring Organization
          </span>
        </h2>

        {/* Subheading */}
        <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          Join forward-thinking companies that are reimagining hiring automation. Experience the future of autonomous
          team coordination, today.
        </p>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-3xl mx-auto">
          {[
            { number: '2,400+', label: 'Active Projects' },
            { number: '94%', label: 'Success Rate' },
            { number: '$18M+', label: 'Total Deployed' },
          ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-lg border border-muted/20 bg-card/50 backdrop-blur">
              <div className="text-3xl font-bold text-accent mb-2">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <button className="group relative px-10 py-5 rounded-lg bg-accent text-accent-foreground font-semibold text-lg overflow-hidden hover:shadow-xl hover:shadow-accent/30 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative flex items-center justify-center gap-3">
              Launch a Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button className="px-10 py-5 rounded-lg border border-muted-foreground/30 text-foreground font-semibold text-lg hover:border-accent/50 hover:bg-accent/5 transition-all duration-300">
            Schedule a Demo
          </button>
        </div>

        {/* Social proof */}
        <div className="mb-12">
          <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">Trusted by leading companies</p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {['TechCore', 'StartupHub', 'InnovateLabs', 'FutureVentures', 'Digital Minds'].map((company) => (
              <div
                key={company}
                className="px-6 py-3 rounded-lg border border-muted/20 bg-muted/5 text-sm font-medium text-muted-foreground hover:border-accent/30 hover:text-accent transition-all"
              >
                {company}
              </div>
            ))}
          </div>
        </div>

        {/* Legal disclaimer */}
        <div className="max-w-2xl mx-auto p-6 rounded-lg border border-muted/20 bg-muted/5 backdrop-blur">
          <p className="text-xs text-muted-foreground leading-relaxed">
            By launching a project, you agree to our Terms of Service and Privacy Policy. HireFlow AI operates with full
            transparency. Your data is encrypted and protected. Cancel anytime with one click.
          </p>
        </div>
      </div>
    </section>
  )
}
