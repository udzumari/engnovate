'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'
import { getAllReadingTests } from '@/data/reading-tests'

export default function ReadingPage() {
    const { t } = useLanguage()

    // Get all reading tests dynamically
    const readingTests = getAllReadingTests()

    // Convert reading tests to the format expected by the UI
    const tests = readingTests.map((test, index) => ({
        id: test.id,
        title: `Reading Test ${index + 1}`,
        duration: '60 mins',
        questions: test.sections.reduce((total, section) => total + section.questions.length, 0) || 40,
        difficulty: 'Medium' as const,
        description: test.sections[0]?.title || 'IELTS Academic Reading Practice Test',
    }))

    return (
        <div className="p-4 md:p-8 space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Reading Tests</h1>
                    <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">
                        Practice with all 20 IELTS Academic Reading tests
                    </p>
                </div>
            </div>

            <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {tests.map((test) => (
                    <Card key={test.id} className="flex flex-col hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                                <Badge variant="outline" className="text-blue-500 bg-blue-500/10 border-0">
                                    <BookOpen className="mr-1 h-3 w-3" />
                                    Reading
                                </Badge>
                                <Badge variant="secondary">
                                    {test.difficulty}
                                </Badge>
                            </div>
                            <CardTitle className="line-clamp-1">{test.title}</CardTitle>
                            <CardDescription className="flex items-center gap-4 mt-2">
                                <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" /> {test.duration}
                                </span>
                                <span>•</span>
                                <span>{test.questions} Questions</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {test.description}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" asChild>
                                <Link href={`/tests/${test.id}`}>
                                    Start Test <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
