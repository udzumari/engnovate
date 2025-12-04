'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Star, Quote } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useLanguage } from '@/lib/LanguageContext'

export default function ReviewsPage() {
    const { t } = useLanguage()

    const reviews = [
        {
            name: "Sarah Johnson",
            role: "Band 8.0",
            text: "The AI feedback was spot on. It helped me correct my writing mistakes quickly. I went from Band 6.5 to 8.0 in just 3 weeks.",
            initial: "S"
        },
        {
            name: "Michael Chen",
            role: "Band 7.5",
            text: "Practicing with the real interface made the actual exam feel much less stressful. Highly recommended for anyone taking the computer-delivered test.",
            initial: "M"
        },
        {
            name: "Priya Patel",
            role: "Band 8.5",
            text: "I loved the detailed explanations for the reading tests. The strategies provided were incredibly helpful.",
            initial: "P"
        },
        {
            name: "David Kim",
            role: "Band 7.0",
            text: "Speaking was my weakest area, but the AI analysis helped me improve my pronunciation and fluency significantly.",
            initial: "D"
        },
        {
            name: "Elena Rodriguez",
            role: "Band 8.0",
            text: "The best investment I made for my IELTS preparation. The mock tests are very realistic.",
            initial: "E"
        },
        {
            name: "Ahmed Hassan",
            role: "Band 7.5",
            text: "Great community and support. Whenever I had a question, I got a quick and helpful response.",
            initial: "A"
        }
    ]

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background z-0" />
                    <div className="container relative z-10 px-4 mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            {t('reviewsPage.title')}
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                            {t('reviewsPage.subtitle')}
                        </p>
                    </div>
                </section>

                {/* Reviews Grid */}
                <section className="py-10 pb-20">
                    <div className="container px-4 mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {reviews.map((review, i) => (
                                <div key={i} className="p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all flex flex-col">
                                    <div className="flex items-center gap-1 mb-6 text-yellow-500">
                                        {[...Array(5)].map((_, j) => (
                                            <Star key={j} className="h-4 w-4 fill-current" />
                                        ))}
                                    </div>

                                    <div className="mb-6 flex-1 relative">
                                        <Quote className="h-8 w-8 text-primary/10 absolute -top-2 -left-2" />
                                        <p className="text-muted-foreground relative z-10 pl-4 italic">
                                            "{review.text}"
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                                        <Avatar className="h-10 w-10">
                                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                                {review.initial}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-sm">{review.name}</p>
                                            <p className="text-xs text-primary font-medium">{review.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-20">
                            <div className="bg-primary text-primary-foreground rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10"></div>
                                <div className="relative z-10">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('reviewsPage.ctaTitle')}</h2>
                                    <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10">
                                        {t('reviewsPage.ctaSubtitle')}
                                    </p>
                                    <Button size="lg" variant="secondary" className="h-12 px-8 text-base rounded-full" asChild>
                                        <Link href="/register">
                                            {t('reviewsPage.ctaButton')}
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-8 border-t bg-muted/20">
                <div className="container px-4 mx-auto text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} DomlaAI. {t('footer.rights')}</p>
                </div>
            </footer>
        </div>
    )
}
