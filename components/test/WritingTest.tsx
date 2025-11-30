'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { translations } from '@/lib/translations'

interface WritingTestProps {
    testData: {
        id: string
        title: string
        taskPrompt: string
        minWords: number
    }
}

// Mock AI scoring function (simulates Gemini API)
async function mockScoreWriting(text: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    const wordCount = text.trim().split(/\s+/).length
    const baseScore = Math.min(9, 4 + (wordCount / 50))

    return {
        bandScore: Number(baseScore.toFixed(1)),
        breakdown: {
            taskAchievement: Number((baseScore - 0.5 + Math.random()).toFixed(1)),
            coherenceCohesion: Number((baseScore - 0.3 + Math.random() * 0.6).toFixed(1)),
            lexicalResource: Number((baseScore + Math.random() * 0.4).toFixed(1)),
            grammaticalRangeAccuracy: Number((baseScore - 0.2 + Math.random() * 0.4).toFixed(1)),
        },
        feedback: {
            en: "Your essay demonstrates good understanding of the topic. The arguments are well-structured and supported with relevant examples. Consider using more varied vocabulary and complex sentence structures to achieve a higher band score.",
            uz: "Inshoingiz mavzuni yaxshi tushunganingizni ko'rsatadi. Dalillar yaxshi tuzilgan va tegishli misollar bilan qo'llab-quvvatlangan. Yuqori ball olish uchun ko'proq turli xil lug'at va murakkab gap tuzilmalaridan foydalanishni ko'rib chiqing.",
            ru: "Ваше эссе демонстрирует хорошее понимание темы. Аргументы хорошо структурированы и подкреплены соответствующими примерами. Рассмотрите возможность использования более разнообразной лексики и сложных структур предложений для достижения более высокого балла."
        },
        suggestions: {
            en: [
                "Use more topic-specific vocabulary and academic phrases",
                "Include more complex grammatical structures (conditionals, passive voice)",
                "Ensure each paragraph has a clear topic sentence and supporting details"
            ],
            uz: [
                "Ko'proq mavzuga oid lug'at va akademik iboralardan foydalaning",
                "Ko'proq murakkab grammatik tuzilmalarni qo'shing (shartli gaplar, majhul nisbat)",
                "Har bir paragrafda aniq mavzu gapi va qo'llab-quvvatlovchi tafsilotlar bo'lishini ta'minlang"
            ],
            ru: [
                "Используйте больше тематической лексики и академических фраз",
                "Включите более сложные грамматические структуры (условные предложения, пассивный залог)",
                "Убедитесь, что каждый абзац имеет четкое тематическое предложение и подтверждающие детали"
            ]
        }
    }
}

export function WritingTest({ testData }: WritingTestProps) {
    const { language } = useLanguage()
    const t = translations[language].dashboard.writing
    const [content, setContent] = useState('')
    const [wordCount, setWordCount] = useState(0)
    const [isPending, startTransition] = useTransition()
    const [result, setResult] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value
        setContent(text)
        const words = text.trim().split(/\s+/).filter(word => word.length > 0)
        setWordCount(words.length)
    }

    const handleSubmit = () => {
        if (wordCount < 50) {
            setError(t.minWordsError)
            return
        }
        setError(null)

        startTransition(async () => {
            try {
                const score = await mockScoreWriting(content)
                setResult(score)
            } catch (err) {
                setError('Failed to get score. Please try again.')
            }
        })
    }

    return (
        <div className="flex-1 flex overflow-hidden h-full">
            {/* Task Prompt Panel */}
            <div className="w-1/3 p-8 overflow-y-auto border-r bg-muted/10">
                <div className="max-w-prose mx-auto space-y-6">
                    <div>
                        <h2 className="text-xl font-bold mb-4">{t.taskInstructions}</h2>
                        <div className="prose dark:prose-invert">
                            <p className="whitespace-pre-wrap text-sm leading-relaxed">{testData.taskPrompt}</p>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">{t.requirements}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <span>{t.writeAtLeast.replace('{count}', testData.minWords.toString())}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <span>{t.payAttention}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <span>{t.organizeIdeas}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {result && (
                        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-primary" />
                                    {t.aiAssessment}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                                    <span className="font-medium">{t.overallBandScore}</span>
                                    <span className="text-3xl font-bold text-primary">{result.bandScore}</span>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between p-2 hover:bg-background/30 rounded">
                                        <span>{t.taskAchievement}</span>
                                        <span className="font-bold">{result.breakdown.taskAchievement}</span>
                                    </div>
                                    <div className="flex justify-between p-2 hover:bg-background/30 rounded">
                                        <span>{t.coherenceCohesion}</span>
                                        <span className="font-bold">{result.breakdown.coherenceCohesion}</span>
                                    </div>
                                    <div className="flex justify-between p-2 hover:bg-background/30 rounded">
                                        <span>{t.lexicalResource}</span>
                                        <span className="font-bold">{result.breakdown.lexicalResource}</span>
                                    </div>
                                    <div className="flex justify-between p-2 hover:bg-background/30 rounded">
                                        <span>{t.grammar}</span>
                                        <span className="font-bold">{result.breakdown.grammaticalRangeAccuracy}</span>
                                    </div>
                                </div>
                                <div className="pt-2 border-t border-primary/10">
                                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4" />
                                        {t.feedback}
                                    </p>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {result.feedback[language]}
                                    </p>
                                </div>
                                <div className="pt-2">
                                    <p className="text-sm font-medium mb-2">{t.suggestions}</p>
                                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                                        {result.suggestions[language].map((s: string, i: number) => (
                                            <li key={i} className="flex gap-2">
                                                <span className="text-primary">•</span>
                                                <span>{s}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            {/* Editor Panel */}
            <div className="w-2/3 p-8 flex flex-col bg-background">
                <div className="flex-1 flex flex-col">
                    <Textarea
                        className="flex-1 resize-none text-base p-6 leading-relaxed border-muted-foreground/20 focus-visible:ring-1 focus-visible:ring-primary"
                        placeholder={t.startTyping}
                        value={content}
                        onChange={handleContentChange}
                        disabled={isPending}
                    />
                    <div className="h-20 flex items-center justify-between border-t mt-4 pt-4">
                        <div className="flex flex-col gap-1">
                            <div className="text-sm text-muted-foreground">
                                {t.wordCount} <span className={`font-bold text-base ${wordCount < testData.minWords ? 'text-yellow-500' : 'text-green-500'}`}>{wordCount}</span> / {testData.minWords}
                            </div>
                            {error && (
                                <span className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" /> {error}
                                </span>
                            )}
                        </div>

                        <Button
                            onClick={handleSubmit}
                            disabled={isPending || wordCount === 0}
                            size="lg"
                            className="min-w-[200px]"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {t.analyzingWithAi}
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    {t.getAiScore}
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
