'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Globe2, Zap, Star, Shield, Users, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useLanguage } from '@/lib/LanguageContext'

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background z-0" />
          <div className="container relative z-10 px-4 mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {t('home.hero.badge')}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 animate-fade-in-up delay-100">
              {t('home.hero.title')} <br className="hidden md:block" />
              <span className="text-primary">{t('home.hero.titleHighlight')}</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
              {t('home.hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
              <Button size="lg" className="h-12 px-8 text-base rounded-full w-full sm:w-auto" asChild>
                <Link href="/register">
                  {t('home.hero.startFree')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full w-full sm:w-auto" asChild>
                <Link href="/tests">
                  {t('home.hero.viewSamples')}
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-border/50 pt-10">
              <div>
                <div className="text-3xl font-bold text-primary">10k+</div>
                <div className="text-sm text-muted-foreground">{t('home.stats.students')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50k+</div>
                <div className="text-sm text-muted-foreground">{t('home.stats.tests')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">{t('home.stats.success')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">4.9/5</div>
                <div className="text-sm text-muted-foreground">{t('home.stats.rating')}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.features.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('home.features.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-all group">
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <Zap className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('home.features.aiScoring.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('home.features.aiScoring.desc')}
                </p>
                <Link href="/features" className="text-primary text-sm font-medium hover:underline inline-flex items-center">
                  {t('home.features.learnMore')} <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>

              <div className="p-6 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-all group">
                <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                  <Globe2 className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('home.features.realExam.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('home.features.realExam.desc')}
                </p>
                <Link href="/features" className="text-primary text-sm font-medium hover:underline inline-flex items-center">
                  {t('home.features.learnMore')} <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>

              <div className="p-6 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-all group">
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                  <CheckCircle2 className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('home.features.tracking.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('home.features.tracking.desc')}
                </p>
                <Link href="/features" className="text-primary text-sm font-medium hover:underline inline-flex items-center">
                  {t('home.features.learnMore')} <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" asChild>
                <Link href="/features">{t('home.features.viewAll')}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.pricing.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('home.pricing.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free Plan */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>{t('home.pricing.free.title')}</CardTitle>
                  <CardDescription>{t('home.pricing.free.desc')}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground">{t('home.pricing.period.month')}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" /> 1 Full Mock Test
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" /> Basic Analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" /> Limited AI Feedback
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/register">{t('home.pricing.free.cta')}</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Pro Plan */}
              <Card className="flex flex-col border-primary shadow-lg relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground hover:bg-primary">{t('home.pricing.pro.badge')}</Badge>
                </div>
                <CardHeader>
                  <CardTitle>{t('home.pricing.pro.title')}</CardTitle>
                  <CardDescription>{t('home.pricing.pro.desc')}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$29</span>
                    <span className="text-muted-foreground">{t('home.pricing.period.month')}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" /> Unlimited Mock Tests
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" /> Advanced AI Scoring
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" /> Detailed Explanations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" /> Priority Support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/register">{t('home.pricing.pro.cta')}</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Lifetime Plan */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>{t('home.pricing.lifetime.title')}</CardTitle>
                  <CardDescription>{t('home.pricing.lifetime.desc')}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$99</span>
                    <span className="text-muted-foreground">{t('home.pricing.period.once')}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" /> All Pro Features
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" /> Lifetime Access
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" /> Future Updates Included
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/register">{t('home.pricing.lifetime.cta')}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <Link href="/pricing" className="text-primary hover:underline">
                {t('home.pricing.viewFull')}
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Preview */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.testimonials.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('home.testimonials.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Sarah J.", role: "Band 8.0", text: "The AI feedback was spot on. It helped me correct my writing mistakes quickly." },
                { name: "Michael C.", role: "Band 7.5", text: "Practicing with the real interface made the actual exam feel much less stressful." },
                { name: "Priya P.", role: "Band 8.5", text: "I loved the detailed explanations for the reading tests. Highly recommended!" }
              ].map((review, i) => (
                <div key={i} className="p-6 rounded-2xl bg-background border border-border/50 shadow-sm">
                  <div className="flex items-center gap-1 mb-4 text-yellow-500">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{review.text}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">{review.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" asChild>
                <Link href="/reviews">{t('home.testimonials.readMore')}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <div className="bg-primary text-primary-foreground rounded-3xl p-10 md:p-20 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">{t('home.cta.title')}</h2>
                <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                  {t('home.cta.subtitle')}
                </p>
                <Button size="lg" variant="secondary" className="h-14 px-10 text-lg rounded-full" asChild>
                  <Link href="/register">
                    {t('home.cta.button')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t bg-muted/20">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-1">
              <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-primary rounded-lg">
                  <Users className="h-5 w-5 text-primary-foreground" />
                </div>
                <span>EngNovate</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                {t('footer.desc')}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer.platform')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-foreground">{t('nav.features')}</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground">{t('nav.pricing')}</Link></li>
                <li><Link href="/tests" className="hover:text-foreground">{t('nav.tests')}</Link></li>
                <li><Link href="/reviews" className="hover:text-foreground">{t('nav.reviews')}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer.company')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">{t('nav.about')}</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">{t('footer.links.contact')}</Link></li>
                <li><Link href="/blog" className="hover:text-foreground">{t('footer.links.blog')}</Link></li>
                <li><Link href="/careers" className="hover:text-foreground">{t('footer.links.careers')}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer.legal')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground">{t('footer.links.privacy')}</Link></li>
                <li><Link href="/terms" className="hover:text-foreground">{t('footer.links.terms')}</Link></li>
                <li><Link href="/cookies" className="hover:text-foreground">{t('footer.links.cookies')}</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} EngNovate. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
