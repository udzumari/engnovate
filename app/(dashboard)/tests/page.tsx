'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, BookOpen, PenTool, Mic, Headphones, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'

// Mock data for tests
const tests = [
    {
        id: 'reading-16',
        title: 'Cambridge 16 Reading Test 01',
        type: 'Reading',
        duration: '60 mins',
        questions: 7,
        difficulty: 'Medium',
        description: 'Why we need to protect polar bears - Complete reading passage with validation',
    },
    {
        id: 'reading-17',
        title: 'Cambridge 16 Reading Test 02',
        type: 'Reading',
        duration: '60 mins',
        questions: 7,
        difficulty: 'Medium',
        description: 'The White Horse of Uffington - Ancient geoglyphs and their mysteries',
    },
    {
        id: 'reading-18',
        title: 'Cambridge 16 Reading Test 03',
        type: 'Reading',
        duration: '60 mins',
        questions: 7,
        difficulty: 'Medium',
        description: 'The Future of Work - AI and automation in the workplace',
    },
    {
        id: 'reading-19',
        title: 'Cambridge 16 Reading Test 04',
        type: 'Reading',
        duration: '60 mins',
        questions: 7,
        difficulty: 'Medium',
        description: 'Roman Shipbuilding and Navigation - Ancient maritime technology',
    },
    {
        id: 'reading-20',
        title: 'Cambridge 16 Reading Test 05',
        type: 'Reading',
        duration: '60 mins',
        questions: 7,
        difficulty: 'Medium',
        description: 'The History of Glass - From ancient times to modern applications',
    },
    {
        id: '2',
        title: 'IELTS Writing Task (AI Scoring)',
        type: 'Writing',
        duration: '40 mins',
        questions: 1,
        difficulty: 'Hard',
        description: 'Write an essay and get instant AI-powered feedback',
    },
    {
        id: '3',
        title: 'IELTS Speaking Test (AI Scoring)',
        type: 'Speaking',
        duration: '4 mins',
        questions: 1,
        difficulty: 'Medium',
        description: 'Record your speaking response and receive detailed scoring',
    },
    {
        id: '4',
        title: 'IELTS Listening Practice',
        type: 'Listening',
        duration: '30 mins',
        questions: 40,
        difficulty: 'Medium',
        description: 'Improve your listening skills with practice tests',
    },
]

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

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{t('dashboard.tests.title')}</h1>
                    <p className="text-muted-foreground mt-2">
                        {t('dashboard.tests.subtitle')}
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
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
