'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Sparkles, Zap, Crown } from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { useLanguage } from '@/lib/LanguageContext'

export default function PricingPage() {
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
    const { t } = useLanguage()

    const plans = [
        {
            name: t('home.pricing.free.title'),
            price: '$0',
            period: 'forever',
            description: t('home.pricing.free.desc'),
            icon: Zap,
            features: [
                '3 tests per day',
                'Basic AI scoring',
                'Reading & Listening tests',
                'Community support',
                'Progress tracking',
            ],
            limitations: [
                'Limited AI feedback',
                'No speaking tests',
                'No writing tests',
            ],
            cta: t('home.pricing.free.cta'),
            href: '/register',
            popular: false,
        },
        {
            name: t('home.pricing.pro.title'),
            price: '$19',
            period: t('home.pricing.period.month'),
            description: t('home.pricing.pro.desc'),
            icon: Sparkles,
            features: [
                'Unlimited tests',
                'Advanced AI scoring',
                'All test types (Reading, Writing, Speaking, Listening)',
                'Detailed feedback & suggestions',
                'Progress analytics',
                'Priority support',
                'Downloadable reports',
                'Study recommendations',
            ],
            limitations: [],
            cta: t('home.pricing.pro.cta'),
            href: '/register?plan=pro',
            popular: true,
        },
        {
            name: t('home.pricing.lifetime.title'),
            price: '$49',
            period: t('home.pricing.period.month'),
            description: t('home.pricing.lifetime.desc'),
            icon: Crown,
            features: [
                'Everything in Pro',
                'Personal IELTS coach',
                '1-on-1 speaking sessions',
                'Custom test creation',
                'Batch test imports',
                'Admin dashboard access',
                'API access',
                'White-label option',
                'Dedicated support',
            ],
            limitations: [],
            cta: t('home.pricing.lifetime.cta'),
            href: '/contact',
            popular: false,
        },
    ]

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-1 py-20">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <Badge className="mb-4" variant="outline">{t('nav.pricing')}</Badge>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            {t('home.pricing.title')}
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            {t('home.pricing.subtitle')}
                        </p>
                    </div>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <span className={billingPeriod === 'monthly' ? 'font-semibold' : 'text-muted-foreground'}>
                            Monthly
                        </span>
                        <button
                            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
                            className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary"
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                        <span className={billingPeriod === 'yearly' ? 'font-semibold' : 'text-muted-foreground'}>
                            Yearly
                            <Badge className="ml-2" variant="secondary">Save 20%</Badge>
                        </span>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan) => {
                            const Icon = plan.icon
                            const yearlyPrice = plan.price === '$0' ? '$0' : `$${Math.round(parseInt(plan.price.slice(1)) * 0.8)}`
                            const displayPrice = billingPeriod === 'yearly' ? yearlyPrice : plan.price

                            return (
                                <Card
                                    key={plan.name}
                                    className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-lg scale-105' : ''
                                        }`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                            <Badge className="bg-primary text-primary-foreground">{t('home.pricing.pro.badge')}</Badge>
                                        </div>
                                    )}

                                    <CardHeader>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className={`p-2 rounded-lg ${plan.popular ? 'bg-primary/10' : 'bg-muted'}`}>
                                                <Icon className={`h-5 w-5 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                                            </div>
                                            <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                        </div>
                                        <CardDescription>{plan.description}</CardDescription>
                                        <div className="mt-4">
                                            <span className="text-4xl font-bold">{displayPrice}</span>
                                            {plan.price !== '$0' && (
                                                <span className="text-muted-foreground ml-2">
                                                    / {billingPeriod === 'yearly' ? 'year' : 'month'}
                                                </span>
                                            )}
                                        </div>
                                    </CardHeader>

                                    <CardContent className="flex-1">
                                        <ul className="space-y-3">
                                            {plan.features.map((feature) => (
                                                <li key={feature} className="flex items-start gap-2">
                                                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                                    <span className="text-sm">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>

                                    <CardFooter>
                                        <Button
                                            className="w-full"
                                            variant={plan.popular ? 'default' : 'outline'}
                                            asChild
                                        >
                                            <Link href={plan.href}>{plan.cta}</Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            )
                        })}
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-20 max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Can I switch plans anytime?</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">How accurate is the AI scoring?</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Our AI is trained on thousands of IELTS essays and speaking samples. It provides band scores within ±0.5 of human examiners.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Is there a free trial for Pro?</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Yes! All new users get a 7-day free trial of Pro features. No credit card required.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="py-8 border-t bg-muted/20">
                <div className="container px-4 mx-auto text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} EngNovate. {t('footer.rights')}</p>
                </div>
            </footer>
        </div>
    )
}
