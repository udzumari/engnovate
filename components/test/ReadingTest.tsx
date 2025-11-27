'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Question {
    id: string
    type: string
    text: string
    options: string[]
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
}

export function ReadingTest({ testData }: ReadingTestProps) {
    const [currentSection, setCurrentSection] = useState(0)

    return (
        <div className="flex-1 flex overflow-hidden h-full">
            {/* Reading Text Panel */}
            <div className="w-1/2 p-8 overflow-y-auto border-r bg-muted/10">
                <div className="max-w-prose mx-auto">
                    <h2 className="text-xl font-bold mb-4">
                        {testData.sections[currentSection].title}
                    </h2>
                    <div
                        className="prose dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: testData.sections[currentSection].text }}
                    />
                </div>
            </div>

            {/* Questions Panel */}
            <div className="w-1/2 p-8 overflow-y-auto bg-background">
                <div className="max-w-xl mx-auto space-y-8">
                    {testData.sections[currentSection].questions.map((q, idx) => (
                        <Card key={q.id}>
                            <CardHeader>
                                <CardTitle className="text-base">Question {idx + 1}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p>{q.text}</p>
                                <div className="space-y-2">
                                    {q.options.map((option) => (
                                        <div key={option} className="flex items-center gap-2">
                                            <input type="radio" name={q.id} id={`${q.id}-${option}`} className="w-4 h-4" />
                                            <label htmlFor={`${q.id}-${option}`}>{option}</label>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {testData.sections[currentSection].questions.length === 0 && (
                        <div className="text-center text-muted-foreground py-10">
                            No questions for this section in mock data.
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Overlay or Footer Control (handled by parent usually, but here for section switching) */}
            <div className="absolute bottom-4 right-8 flex gap-2">
                {/* This is a bit hacky, ideally the footer is in the parent layout, 
             but we need to control section state here or lift it up. 
             For now, let's assume the parent handles the main footer, 
             but we might need to lift state up if we want the footer to control sections.
             
             Actually, let's lift the state up in the next refactor. 
             For now, I'll put a local navigation here just for sections if needed, 
             but the previous design had it in the footer.
             
             Let's keep it simple: The parent component (page.tsx) handles the footer and passes 
             currentSection and setCurrentSection down? 
             
             Or better, this component handles the *content* area only.
          */}
            </div>
        </div>
    )
}
