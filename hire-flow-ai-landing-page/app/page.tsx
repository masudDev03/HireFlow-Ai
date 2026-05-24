import HeroSection from '@/components/hero-section'
import HowItWorks from '@/components/how-it-works'
import AIAgentFeed from '@/components/ai-agent-feed'
import FeatureModules from '@/components/feature-modules'
import WorkspacePreview from '@/components/workspace-preview'
import FinalCTA from '@/components/final-cta'

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <HeroSection />
      <HowItWorks />
      <AIAgentFeed />
      <FeatureModules />
      <WorkspacePreview />
      <FinalCTA />
    </main>
  )
}
