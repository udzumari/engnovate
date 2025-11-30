'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Users, Target, Heart, Globe, Award, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useLanguage } from '@/lib/LanguageContext'

export default function AboutPage() {
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
                            {t('aboutPage.title')} <span className="text-primary">{t('aboutPage.titleHighlight')}</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                            {t('aboutPage.subtitle')}
                        </p>
                    </div>
                </section>

                {/* Mission, Vision, Values */}
                <section className="py-10">
                    <div className="container px-4 mx-auto">
                        <div className="grid md:grid-cols-3 gap-8">
                            <Card className="bg-card/50 border-border/50">
                                <CardContent className="p-8 text-center">
                                    <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-6">
                                        <Target className="h-6 w-6 text-blue-500" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{t('aboutPage.mission.title')}</h3>
                                    <p className="text-muted-foreground">
                                        {t('aboutPage.mission.desc')}
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardContent className="p-8 text-center">
                                    <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-6">
                                        <Globe className="h-6 w-6 text-purple-500" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{t('aboutPage.vision.title')}</h3>
                                    <p className="text-muted-foreground">
                                        {t('aboutPage.vision.desc')}
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardContent className="p-8 text-center">
                                    <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                                        <Heart className="h-6 w-6 text-red-500" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{t('aboutPage.values.title')}</h3>
                                    <p className="text-muted-foreground">
                                        {t('aboutPage.values.desc')}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-20">
                    <div className="container px-4 mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">{t('aboutPage.team')}</h2>

                        <div className="grid md:grid-cols-4 gap-8">
                            {[
                                { name: "Dr. Alex Mercer", role: "Founder & CEO", initial: "AM" },
                                { name: "Sarah Lin", role: "Head of Education", initial: "SL" },
                                { name: "James Bond", role: "Lead Developer", initial: "JB" },
                                { name: "Emily Blunt", role: "Product Designer", initial: "EB" }
                            ].map((member, i) => (
                                <div key={i} className="text-center group">
                                    <div className="relative mb-4 inline-block">
                                        <Avatar className="h-32 w-32 mx-auto border-4 border-background shadow-xl group-hover:scale-105 transition-transform duration-300">
                                            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                                                {member.initial}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <h3 className="text-lg font-bold">{member.name}</h3>
                                    <p className="text-sm text-muted-foreground">{member.role}</p>
                                </div>
                            ))}
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
