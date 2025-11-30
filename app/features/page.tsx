'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Zap, Globe2, CheckCircle2, Brain, BarChart3, Clock, Shield, Users } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

export default function FeaturesPage() {
    const { t } = useLanguage()

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background z-0" />
                    <div className="container relative z-10 px-4 mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            {t('featuresPage.title')} <span className="text-primary">{t('featuresPage.titleHighlight')}</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                            {t('featuresPage.subtitle')}
                        </p>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-10 pb-20">
                    <div className="container px-4 mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all">
                                <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
                                    <Zap className="h-6 w-6 text-blue-500" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{t('featuresPage.items.ai.title')}</h3>
                                <p className="text-muted-foreground">
                                    {t('featuresPage.items.ai.desc')}
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all">
                                <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-6">
                                    <Globe2 className="h-6 w-6 text-green-500" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{t('featuresPage.items.interface.title')}</h3>
                                <p className="text-muted-foreground">
                                    {t('featuresPage.items.interface.desc')}
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all">
                                <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6">
                                    <Brain className="h-6 w-6 text-purple-500" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{t('featuresPage.items.analytics.title')}</h3>
                                <p className="text-muted-foreground">
                                    {t('featuresPage.items.analytics.desc')}
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all">
                                <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6">
                                    <Clock className="h-6 w-6 text-orange-500" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{t('featuresPage.items.time.title')}</h3>
                                <p className="text-muted-foreground">
                                    {t('featuresPage.items.time.desc')}
                                </p>
                            </div>

                            {/* Feature 5 */}
                            <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all">
                                <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-6">
                                    <Shield className="h-6 w-6 text-red-500" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{t('featuresPage.items.explanations.title')}</h3>
                                <p className="text-muted-foreground">
                                    {t('featuresPage.items.explanations.desc')}
                                </p>
                            </div>

                            {/* Feature 6 */}
                            <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all">
                                <div className="h-12 w-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-6">
                                    <Users className="h-6 w-6 text-teal-500" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{t('featuresPage.items.community.title')}</h3>
                                <p className="text-muted-foreground">
                                    {t('featuresPage.items.community.desc')}
                                </p>
                            </div>
                        </div>

                        <div className="mt-20 text-center">
                            <h2 className="text-3xl font-bold mb-6">{t('featuresPage.cta')}</h2>
                            <Button size="lg" className="h-12 px-8 text-base rounded-full" asChild>
                                <Link href="/register">
                                    {t('featuresPage.ctaButton')}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-8 border-t bg-muted/20">
                <div className="container px-4 mx-auto text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} EngNovate. {t('footer.rights')}</p>
                </div>
            </footer>
        </div>
    )
}
