'use client'

import { useState, useRef, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Mic, Square, Play, RotateCcw, Sparkles, Volume2 } from 'lucide-react'

interface SpeakingTestProps {
    testData: {
        id: string
        title: string
        parts: {
            id: string
            title: string
            questions: string[]
        }[]
    }
}

// Mock AI scoring
async function mockScoreSpeaking() {
    await new Promise(resolve => setTimeout(resolve, 2000))

    const baseScore = 6 + Math.random() * 2

    return {
        bandScore: Number(baseScore.toFixed(1)),
        fluencyCoherence: Number((baseScore - 0.3 + Math.random() * 0.6).toFixed(1)),
        lexicalResource: Number((baseScore + Math.random() * 0.4).toFixed(1)),
        grammaticalRangeAccuracy: Number((baseScore - 0.2 + Math.random() * 0.4).toFixed(1)),
        pronunciation: Number((baseScore + Math.random() * 0.3).toFixed(1)),
        feedback: "Good fluency and coherence. Your pronunciation is clear and easy to understand. Try to use more varied vocabulary and complex sentence structures to achieve a higher band score."
    }
}

export function SpeakingTest({ testData }: SpeakingTestProps) {
    const [currentPart] = useState(0)
    const [isRecording, setIsRecording] = useState(false)
    const [audioUrl, setAudioUrl] = useState<string | null>(null)
    const [recordingTime, setRecordingTime] = useState(0)
    const [result, setResult] = useState<any>(null)
    const [isPending, startTransition] = useTransition()
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const chunksRef = useRef<Blob[]>([])
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            mediaRecorderRef.current = new MediaRecorder(stream)
            chunksRef.current = []
            setRecordingTime(0)

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data)
                }
            }

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
                const url = URL.createObjectURL(blob)
                setAudioUrl(url)
                if (timerRef.current) clearInterval(timerRef.current)
            }

            mediaRecorderRef.current.start()
            setIsRecording(true)

            // Start timer
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1)
            }, 1000)
        } catch (err) {
            console.error('Error accessing microphone:', err)
            alert('Could not access microphone. Please check permissions.')
        }
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            setIsRecording(false)
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }

    const playAudio = () => {
        const player = document.getElementById('audio-player') as HTMLAudioElement
        player?.play()
    }

    const resetRecording = () => {
        setAudioUrl(null)
        setRecordingTime(0)
        setResult(null)
    }

    const handleSubmit = () => {
        startTransition(async () => {
            const score = await mockScoreSpeaking()
            setResult(score)
        })
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-muted/30 to-background">
            <div className="max-w-4xl w-full space-y-8">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold">{testData.parts[currentPart].title}</h2>
                    <p className="text-muted-foreground">Click the microphone to record your answer</p>
                </div>

                <Card className="border-2">
                    <CardContent className="p-12 flex flex-col items-center text-center min-h-[300px] justify-center space-y-6">
                        <div className="p-4 bg-primary/5 rounded-lg">
                            <Volume2 className="h-8 w-8 text-primary mb-4 mx-auto" />
                            <h3 className="text-2xl font-medium leading-relaxed max-w-2xl">
                                {testData.parts[currentPart].questions[0]}
                            </h3>
                        </div>

                        {isRecording && (
                            <div className="text-sm text-muted-foreground animate-pulse">
                                Recording: {formatTime(recordingTime)}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="flex flex-col items-center gap-8">
                    {!audioUrl ? (
                        <div className="flex flex-col items-center gap-4">
                            <Button
                                size="lg"
                                className={`h-24 w-24 rounded-full text-lg ${isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-primary'}`}
                                onClick={isRecording ? stopRecording : startRecording}
                            >
                                {isRecording ? <Square className="h-10 w-10" /> : <Mic className="h-10 w-10" />}
                            </Button>
                            <p className="text-sm font-medium text-muted-foreground">
                                {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-6 w-full">
                            <audio src={audioUrl} className="hidden" id="audio-player" />
                            <div className="flex items-center gap-4">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-16 w-16 rounded-full"
                                    onClick={playAudio}
                                >
                                    <Play className="h-6 w-6" />
                                </Button>
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    className="h-16 w-16 rounded-full"
                                    onClick={resetRecording}
                                    disabled={isPending}
                                >
                                    <RotateCcw className="h-6 w-6" />
                                </Button>
                                <Button
                                    size="lg"
                                    onClick={handleSubmit}
                                    disabled={isPending}
                                    className="h-16 px-8"
                                >
                                    {isPending ? (
                                        <>Analyzing...</>
                                    ) : (
                                        <>
                                            <Sparkles className="mr-2 h-5 w-5" />
                                            Get AI Score
                                        </>
                                    )}
                                </Button>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Recording duration: {formatTime(recordingTime)}
                            </p>
                        </div>
                    )}
                </div>

                {result && (
                    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                        <CardContent className="p-8 space-y-6">
                            <div className="flex items-center gap-2 text-lg font-semibold">
                                <Sparkles className="h-5 w-5 text-primary" />
                                AI Assessment
                            </div>

                            <div className="flex items-center justify-between p-6 bg-background/50 rounded-lg">
                                <span className="text-lg font-medium">Overall Band Score</span>
                                <span className="text-4xl font-bold text-primary">{result.bandScore}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-background/30 rounded-lg">
                                    <div className="text-sm text-muted-foreground mb-1">Fluency & Coherence</div>
                                    <div className="text-2xl font-bold">{result.fluencyCoherence}</div>
                                </div>
                                <div className="p-4 bg-background/30 rounded-lg">
                                    <div className="text-sm text-muted-foreground mb-1">Lexical Resource</div>
                                    <div className="text-2xl font-bold">{result.lexicalResource}</div>
                                </div>
                                <div className="p-4 bg-background/30 rounded-lg">
                                    <div className="text-sm text-muted-foreground mb-1">Grammar</div>
                                    <div className="text-2xl font-bold">{result.grammaticalRangeAccuracy}</div>
                                </div>
                                <div className="p-4 bg-background/30 rounded-lg">
                                    <div className="text-sm text-muted-foreground mb-1">Pronunciation</div>
                                    <div className="text-2xl font-bold">{result.pronunciation}</div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-primary/10">
                                <p className="text-sm font-medium mb-2">Detailed Feedback:</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">{result.feedback}</p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
