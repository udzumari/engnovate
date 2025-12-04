'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, BookOpen, PenTool, Mic, Headphones, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'
import { getAllReadingTests } from '@/data/reading-tests'

const typeIcons = {
    Reading: BookOpen,
    Writing: PenTool,
    Speaking: Mic,
    Listening: Headphones,
}

const typeColors = {
    Reading: 'text-blue-500 bg-blue-500/10',
    Writing: 'text-yellow-500 bg-yellow-500/10',
    Speaking: 'text-red-500 bg-red-500/10',
    Listening: 'text-green-500 bg-green-500/10',
}

export default function TestsPage() {
    const { t } = useLanguage()

    // Get all reading tests dynamically
    const readingTests = getAllReadingTests()

    // Convert reading tests to the format expected by the UI
    const readingTestsFormatted = readingTests.map((test, index) => ({
        id: test.id,
        title: `Reading Test ${index + 1}`,
        type: 'Reading' as const,
        duration: '60 mins',
        questions: test.sections.reduce((total, section) => total + section.questions.length, 0) || 40,
        difficulty: 'Medium' as const,
        description: test.sections[0]?.title || 'IELTS Academic Reading Practice Test',
    }))

    // Other test types
    const otherTests = [
        {
            id: '2',
            title: 'IELTS Writing Task (AI Scoring)',
            type: 'Writing' as const,
            duration: '40 mins',
            questions: 1,
            difficulty: 'Hard' as const,
            description: 'Write an essay and get instant AI-powered feedback',
        },
        {
            id: '3',
            title: 'IELTS Speaking Test (AI Scoring)',
            type: 'Speaking' as const,
            duration: '4 mins',
            questions: 1,
            difficulty: 'Medium' as const,
            description: 'Record your speaking response and receive detailed scoring',
        },
        {
            id: '4',
            title: 'IELTS Listening Practice',
            type: 'Listening' as const,
            duration: '30 mins',
            questions: 40,
            difficulty: 'Medium' as const,
            description: 'Improve your listening skills with practice tests',
        },
    ]

    // Combine all tests
    const tests = [...readingTestsFormatted, ...otherTests]

    return (
        <div className="p-4 md:p-8 space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t('dashboard.tests.title')}</h1>
                    <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">
                        {t('dashboard.tests.subtitle')}
                    </p>
                </div>
            </div>

            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {tests.map((test) => {
                    const Icon = typeIcons[test.type as keyof typeof typeIcons]
                    const colorClass = typeColors[test.type as keyof typeof typeColors]

                    return (
                        <Card key={test.id} className="flex flex-col hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    <Badge variant="outline" className={`${colorClass} border-0`}>
                                        <Icon className="mr-1 h-3 w-3" />
                                        {t(`dashboard.tests.types.${test.type}`)}
                                    </Badge>
                                    <Badge variant="secondary">
                                        {t(`dashboard.tests.difficulty.${test.difficulty}`)}
                                    </Badge>
                                </div>
                                <CardTitle className="line-clamp-1">{test.title}</CardTitle>
                                <CardDescription className="flex items-center gap-4 mt-2">
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> {test.duration}
                                    </span>
                                    <span>•</span>
                                    <span>{test.questions} {t('dashboard.tests.questions')}</span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="text-sm text-muted-foreground">
                                    {test.description}
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" asChild>
                                    <Link href={`/tests/${test.id}`}>
                                        {t('dashboard.tests.start')} <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
