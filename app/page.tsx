import { Navbar } from '@/components/layout/Navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Globe2, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background z-0" />
          <div className="container relative z-10 px-4 mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              New: AI-Powered Speaking Analysis
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Master IELTS with <br className="hidden md:block" />
              <span className="text-primary">AI Precision</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Get instant, accurate scoring for Writing and Speaking. Practice with real exam simulations and boost your band score effectively.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-12 px-8 text-base rounded-full" asChild>
                <Link href="/register">
                  Start Free Practice <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full" asChild>
                <Link href="/tests">
                  View Sample Tests
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-all">
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Instant AI Scoring</h3>
                <p className="text-muted-foreground">
                  Get detailed feedback on your Writing and Speaking tasks in seconds, powered by Gemini AI.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-all">
                <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                  <Globe2 className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real Exam Format</h3>
                <p className="text-muted-foreground">
                  Practice with tests that exactly match the real IELTS computer-delivered interface.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-all">
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor your improvement over time with detailed analytics and band score predictions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t bg-muted/20">
        <div className="container px-4 mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} EngNovate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
