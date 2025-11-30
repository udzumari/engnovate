'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle2, XCircle } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { translations } from '@/lib/translations'

interface Question {
    id: string
    type: string
    text: string
    options?: string[]
    correctAnswer: string
    explanation: string
    explanationUz?: string // Uzbek explanation
    answerLocation?: string // Text snippet from passage where answer is found
}

interface Section {
    id: string
    title: string
    text: string
    questions: Question[]
}

interface ReadingTestProps {
    testData: {
        id: string
        title: string
        sections: Section[]
    }
    onSubmit?: () => void // Callback to stop timer
}

interface UserAnswers {
    [questionId: string]: string
}

interface ValidationResult {
    [questionId: string]: {
        isCorrect: boolean
        userAnswer: string
        correctAnswer: string
        explanation: string
        explanationUz?: string
        answerLocation?: string
    }
}

export function ReadingTest({ testData, onSubmit }: ReadingTestProps) {
    const { language } = useLanguage()
    const t = translations[language].dashboard.reading
    const [currentSection, setCurrentSection] = useState(0)
    const [userAnswers, setUserAnswers] = useState<UserAnswers>({})
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [validationResults, setValidationResults] = useState<ValidationResult>({})
    const [highlightedText, setHighlightedText] = useState<string | null>(null)

    const handleAnswerChange = (questionId: string, answer: string) => {
        if (isSubmitted) return // Prevent changes after submission

        setUserAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }))
    }

    const handleSubmit = () => {
        // Validate all answers
        const results: ValidationResult = {}
        let totalQuestions = 0
        let correctAnswers = 0

        testData.sections.forEach(section => {
            section.questions.forEach(question => {
                totalQuestions++
                const userAnswer = userAnswers[question.id] || ''
                const isCorrect = userAnswer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase()

                if (isCorrect) correctAnswers++

                results[question.id] = {
                    isCorrect,
                    userAnswer,
                    correctAnswer: question.correctAnswer,
                    explanation: question.explanation,
                    explanationUz: question.explanationUz,
                    answerLocation: question.answerLocation
                }
            })
        })

        setValidationResults(results)
        setIsSubmitted(true)

        // Stop the timer
        if (onSubmit) {
            onSubmit()
        }

        // Scroll to top to see results
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const getAnsweredCount = () => {
        let total = 0
        testData.sections.forEach(section => {
            total += section.questions.length
        })
        return Object.keys(userAnswers).length + '/' + total
    }

    const getScore = () => {
        let correct = 0
        let total = 0

        Object.values(validationResults).forEach(result => {
            total++
            if (result.isCorrect) correct++
        })

        return { correct, total, percentage: total > 0 ? Math.round((correct / total) * 100) : 0 }
    }

    // Highlight answer location in the reading text
    const getHighlightedText = (text: string, highlight: string | null) => {
        if (!highlight || !isSubmitted) {
            return <div dangerouslySetInnerHTML={{ __html: text }} />
        }

        // Create a version with highlighted text
        const highlightedHtml = text.replace(
            new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'),
            '<mark style="background-color: #ff6b6b; color: white; padding: 2px 4px; border-radius: 2px; font-weight: bold;">$1</mark>'
        )

        return <div dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
    }

    return (
        <div className="flex-1 flex overflow-hidden h-full">
            {/* Reading Text Panel */}
            <div className="w-1/2 p-8 overflow-y-auto border-r bg-muted/10">
                <div className="max-w-prose mx-auto">
                    {isSubmitted && (
                        <Alert className="mb-6 bg-primary/10 border-primary">
                            <AlertDescription className="text-lg font-semibold">
                                {t.score} {getScore().correct}/{getScore().total} ({getScore().percentage}%)
                            </AlertDescription>
                        </Alert>
                    )}

                    <h2 className="text-xl font-bold mb-4">
                        {testData.sections[currentSection].title}
                    </h2>
                    <div className="prose dark:prose-invert max-w-none">
                        {getHighlightedText(testData.sections[currentSection].text, highlightedText)}
                    </div>
                </div>
            </div>

            {/* Questions Panel */}
            <div className="w-1/2 p-8 overflow-y-auto bg-background">
                <div className="max-w-xl mx-auto space-y-6">
                    {/* Progress indicator */}
                    {!isSubmitted && (
                        <div className="sticky top-0 bg-background pb-4 z-10 border-b mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">
                                    {t.answered} {getAnsweredCount()}
                                </span>
                                <Button onClick={handleSubmit} size="lg">
                                    {t.submitAnswers}
                                </Button>
                            </div>
                        </div>
                    )}

                    {testData.sections[currentSection].questions.map((q, idx) => {
                        const validation = validationResults[q.id]
                        const isCorrect = validation?.isCorrect
                        const showValidation = isSubmitted && validation

                        return (
                            <Card
                                key={q.id}
                                className={
                                    showValidation
                                        ? isCorrect
                                            ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                                            : 'border-red-500 bg-red-50 dark:bg-red-950/20'
                                        : ''
                                }
                                onMouseEnter={() => {
                                    if (showValidation && !isCorrect && validation.answerLocation) {
                                        setHighlightedText(validation.answerLocation)
                                    }
                                }}
                                onMouseLeave={() => {
                                    setHighlightedText(null)
                                }}
                            >
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center justify-between">
                                        <span>{t.question} {idx + 1}</span>
                                        {showValidation && (
                                            isCorrect ? (
                                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                            ) : (
                                                <XCircle className="h-5 w-5 text-red-600" />
                                            )
                                        )}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="font-medium">{q.text}</p>

                                    {/* Options */}
                                    <div className="space-y-2">
                                        {q.options?.map((option) => {
                                            const isSelected = userAnswers[q.id] === option
                                            const isCorrectOption = option === q.correctAnswer

                                            return (
                                                <div
                                                    key={option}
                                                    className={`flex items-center gap-2 p-2 rounded ${showValidation && isCorrectOption
                                                        ? 'bg-green-100 dark:bg-green-900/30 font-semibold'
                                                        : showValidation && isSelected && !isCorrect
                                                            ? 'bg-red-100 dark:bg-red-900/30'
                                                            : ''
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name={q.id}
                                                        id={`${q.id}-${option}`}
                                                        className="w-4 h-4"
                                                        value={option}
                                                        checked={isSelected}
                                                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                                        disabled={isSubmitted}
                                                    />
                                                    <label
                                                        htmlFor={`${q.id}-${option}`}
                                                        className="flex-1 cursor-pointer"
                                                    >
                                                        {option}
                                                        {showValidation && isCorrectOption && (
                                                            <span className="ml-2 text-green-600 text-sm">✓ {t.correct}</span>
                                                        )}
                                                    </label>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {/* Bilingual Explanation */}
                                    {showValidation && !isCorrect && (
                                        <Alert className="bg-red-50 dark:bg-red-950/20 border-red-200">
                                            <AlertDescription className="space-y-3">
                                                <p className="font-semibold text-red-700 dark:text-red-400">
                                                    ✗ {t.incorrect}
                                                </p>

                                                {/* English Explanation */}
                                                <div className="space-y-1">
                                                    <p className="text-xs font-semibold text-muted-foreground uppercase">
                                                        {t.why} (English)
                                                    </p>
                                                    <p className="text-sm">{validation.explanation}</p>
                                                </div>

                                                {/* Uzbek Explanation */}
                                                {validation.explanationUz && (
                                                    <div className="space-y-1">
                                                        <p className="text-xs font-semibold text-muted-foreground uppercase">
                                                            {t.why} (O'zbekcha)
                                                        </p>
                                                        <p className="text-sm">{validation.explanationUz}</p>
                                                    </div>
                                                )}

                                                {/* Answer Location */}
                                                {validation.answerLocation && (
                                                    <div className="space-y-1 pt-2 border-t border-red-200">
                                                        <p className="text-xs font-semibold text-muted-foreground uppercase">
                                                            {t.answerLocation}
                                                        </p>
                                                        <p className="text-sm italic bg-red-100 dark:bg-red-900/20 p-2 rounded">
                                                            "{validation.answerLocation}"
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            💡 Hover over this card to see the highlighted text in the passage
                                                        </p>
                                                    </div>
                                                )}
                                            </AlertDescription>
                                        </Alert>
                                    )}

                                    {/* Correct answer explanation */}
                                    {showValidation && isCorrect && (
                                        <Alert className="bg-green-50 dark:bg-green-950/20">
                                            <AlertDescription>
                                                <p className="font-semibold mb-2">
                                                    ✓ {t.correct}!
                                                </p>
                                                <p className="text-sm">{validation.explanation}</p>
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                </CardContent>
                            </Card>
                        )
                    })}

                    {testData.sections[currentSection].questions.length === 0 && (
                        <div className="text-center text-muted-foreground py-10">
                            {t.noQuestions}
                        </div>
                    )}

                    {/* Submit button at bottom */}
                    {!isSubmitted && testData.sections[currentSection].questions.length > 0 && (
                        <div className="flex justify-center pt-6">
                            <Button onClick={handleSubmit} size="lg" className="w-full">
                                {t.submitAll}
                            </Button>
                        </div>
                    )}

                    {/* Results summary */}
                    {isSubmitted && (
                        <Card className="bg-primary/5 border-primary">
                            <CardHeader>
                                <CardTitle>{t.testResults}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <p className="text-2xl font-bold">
                                        {getScore().correct} / {getScore().total}
                                    </p>
                                    <p className="text-lg text-muted-foreground">
                                        {t.score} {getScore().percentage}%
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-4">
                                        {t.reviewAnswers}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
