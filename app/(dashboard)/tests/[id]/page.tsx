'use client'

import { useState, useEffect, use } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Timer, Save, ArrowLeft } from 'lucide-react'
import { ReadingTest } from '@/components/test/ReadingTest'
import { WritingTest } from '@/components/test/WritingTest'
import { SpeakingTest } from '@/components/test/SpeakingTest'
import Link from 'next/link'
import { getReadingTestById } from '@/data/reading-tests'

// Mock data
const mockTests: Record<string, any> = {
    '1': {
        id: '1',
        type: 'Reading',
        title: 'IELTS Academic Reading Test 1',
        sections: [
            {
                id: 's1',
                title: 'Passage 1: The History of Tea',
                text: `
          <h2>The History of Tea</h2>
          <p>Tea is one of the most popular beverages in the world, second only to water. Its history spans thousands of years and multiple cultures. The drink has evolved from a medicinal herb to a daily staple enjoyed by billions.</p>
          
          <p>The origins of tea are shrouded in myth and legend. One popular story suggests that Shen Nung, the Chinese emperor and herbalist, discovered tea in 2737 BC when a few leaves from a nearby wild tree blew into his pot of boiling water. Intrigued by the pleasant aroma, he tasted the infusion and found it refreshing.</p>
          
          <p>Tea drinking became popular in China during the Tang dynasty (618-907 AD). Buddhist monks played a crucial role in spreading tea culture to Japan, where it evolved into the elaborate tea ceremony known as Chanoyu. By the 16th century, Portuguese traders and missionaries had introduced tea to Europe, where it quickly became fashionable among the aristocracy.</p>
          
          <p>The British East India Company established tea plantations in India and Ceylon (now Sri Lanka) in the 19th century, breaking China's monopoly on tea production. This led to tea becoming more affordable and accessible to the general population. Today, tea is grown in over 60 countries, with China, India, Kenya, and Sri Lanka being the largest producers.</p>
        `,
                questions: [
                    {
                        id: 'q1',
                        type: 'multiple_choice',
                        text: 'According to the passage, who is credited with discovering tea?',
                        options: ['Shen Nung', 'Buddhist Monks', 'Portuguese traders', 'British merchants'],
                        correctAnswer: 'Shen Nung',
                        explanation: 'The passage states that "Shen Nung, the Chinese emperor and herbalist, discovered tea in 2737 BC when a few leaves from a nearby wild tree blew into his pot of boiling water."'
                    },
                    {
                        id: 'q2',
                        type: 'true_false',
                        text: 'Tea is the most popular beverage in the world.',
                        options: ['True', 'False', 'Not Given'],
                        correctAnswer: 'False',
                        explanation: 'The passage clearly states that "Tea is one of the most popular beverages in the world, second only to water." This means water is the most popular, not tea.'
                    },
                    {
                        id: 'q3',
                        type: 'multiple_choice',
                        text: 'When did tea drinking become popular in China?',
                        options: ['2737 BC', 'Tang dynasty (618-907 AD)', '16th century', '19th century'],
                        correctAnswer: 'Tang dynasty (618-907 AD)',
                        explanation: 'The passage explicitly mentions "Tea drinking became popular in China during the Tang dynasty (618-907 AD)."'
                    },
                    {
                        id: 'q4',
                        type: 'true_false',
                        text: 'The British East India Company established tea plantations to break China\'s monopoly.',
                        options: ['True', 'False', 'Not Given'],
                        correctAnswer: 'True',
                        explanation: 'The passage states "The British East India Company established tea plantations in India and Ceylon (now Sri Lanka) in the 19th century, breaking China\'s monopoly on tea production."'
                    },
                ]
            }
        ]
    },
    '2': {
        id: '2',
        type: 'Writing',
        title: 'IELTS Writing Task 2',
        taskPrompt: `Some people believe that technology has made our lives more complicated, while others think it has made life easier.

Discuss both views and give your own opinion.

Give reasons for your answer and include any relevant examples from your own knowledge or experience.

Write at least 250 words.`,
        minWords: 250
    },
    '3': {
        id: '3',
        type: 'Speaking',
        title: 'IELTS Speaking Part 2',
        parts: [
            {
                id: 'p2',
                title: 'Part 2: Individual Long Turn',
                questions: [
                    "Describe a time when you helped someone. You should say: who you helped, how you helped them, why you helped them, and explain how you felt about helping this person."
                ]
            }
        ]
    },
    '4': {
        id: '4',
        type: 'Listening',
        title: 'IELTS Listening Practice',
        message: 'Listening tests coming soon! This feature is under development.'
    }
}

export default function TestAttemptPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const [timeLeft, setTimeLeft] = useState(60 * 60)
    const [mounted, setMounted] = useState(false)
    const [isTimerRunning, setIsTimerRunning] = useState(true)

    // Try to get reading test first, then fall back to mock tests
    const readingTest = getReadingTestById(id)
    const testData = readingTest || mockTests[id]

    useEffect(() => {
        setMounted(true)
        const timer = setInterval(() => {
            if (isTimerRunning) {
                setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
            }
        }, 1000)
        return () => clearInterval(timer)
    }, [isTimerRunning])

    const handleTestSubmit = () => {
        setIsTimerRunning(false)
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }


    if (!mounted) return null

    if (!testData) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Test not found</h1>
                <Button asChild>
                    <Link href="/tests">Back to Tests</Link>
                </Button>
            </div>
        )
    }

    if (testData.message) {
        return (
            <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-3xl font-bold mb-4">{testData.title}</h1>
                <p className="text-muted-foreground mb-8">{testData.message}</p>
                <Button asChild>
                    <Link href="/tests">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Tests
                    </Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="h-screen flex flex-col">
            {/* Test Header */}
            <header className="h-16 border-b bg-background flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/tests">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Link>
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                    <h1 className="font-semibold text-lg">{testData.title}</h1>
                    <Separator orientation="vertical" className="h-6" />
                    <span className="text-muted-foreground">{testData.type}</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-md font-mono font-medium">
                        <Timer className="h-4 w-4" />
                        {formatTime(timeLeft)}
                    </div>
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/tests">
                            <Save className="mr-2 h-4 w-4" />
                            Save & Exit
                        </Link>
                    </Button>
                </div>
            </header>

            {/* Test Content */}
            <div className="flex-1 overflow-hidden">
                {testData.type === 'Reading' && <ReadingTest testData={testData} onSubmit={handleTestSubmit} />}
                {testData.type === 'Writing' && <WritingTest testData={testData} />}
                {testData.type === 'Speaking' && <SpeakingTest testData={testData} />}
            </div>
        </div>
    )
}
