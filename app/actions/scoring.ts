'use server'

import { model } from '@/lib/gemini'

export interface WritingScore {
    bandScore: number
    breakdown: {
        taskAchievement: number
        coherenceCohesion: number
        lexicalResource: number
        grammaticalRangeAccuracy: number
    }
    feedback: string
    suggestions: string[]
}

export async function scoreWriting(taskPrompt: string, userResponse: string): Promise<WritingScore> {
    try {
        const prompt = `
      Act as an expert IELTS examiner. Evaluate the following writing task response.
      
      Task Prompt: "${taskPrompt}"
      
      User Response: "${userResponse}"
      
      Provide a strict evaluation based on the 4 IELTS Writing criteria:
      1. Task Achievement/Response
      2. Coherence and Cohesion
      3. Lexical Resource
      4. Grammatical Range and Accuracy
      
      Return the result ONLY as a valid JSON object with this structure:
      {
        "bandScore": number (overall score, 0-9, in 0.5 increments),
        "breakdown": {
          "taskAchievement": number (0-9),
          "coherenceCohesion": number (0-9),
          "lexicalResource": number (0-9),
          "grammaticalRangeAccuracy": number (0-9)
        },
        "feedback": "string (concise overall feedback)",
        "suggestions": ["string", "string", "string"] (3 specific improvements)
      }
    `

        const result = await model.generateContent(prompt)
        const response = result.response
        const text = response.text()

        // Clean up markdown code blocks if present
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim()

        return JSON.parse(cleanText)
    } catch (error) {
        console.error('Error scoring writing:', error)
        throw new Error('Failed to score writing task')
    }
}

export interface SpeakingScore {
    bandScore: number
    fluencyCoherence: number
    lexicalResource: number
    grammaticalRangeAccuracy: number
    pronunciation: number
    feedback: string
}

export async function scoreSpeaking(question: string, audioBase64: string): Promise<SpeakingScore> {
    try {
        // Gemini supports audio input directly
        const prompt = `
      Act as an expert IELTS examiner. Evaluate the following speaking response.
      
      Question: "${question}"
      
      Listen to the audio response and provide a strict evaluation based on the 4 IELTS Speaking criteria:
      1. Fluency and Coherence
      2. Lexical Resource
      3. Grammatical Range and Accuracy
      4. Pronunciation
      
      Return the result ONLY as a valid JSON object with this structure:
      {
        "bandScore": number (overall score, 0-9, in 0.5 increments),
        "fluencyCoherence": number (0-9),
        "lexicalResource": number (0-9),
        "grammaticalRangeAccuracy": number (0-9),
        "pronunciation": number (0-9),
        "feedback": "string (concise overall feedback)"
      }
    `

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    mimeType: 'audio/webm',
                    data: audioBase64
                }
            }
        ])

        const response = result.response
        const text = response.text()

        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim()
        return JSON.parse(cleanText)
    } catch (error) {
        console.error('Error scoring speaking:', error)
        throw new Error('Failed to score speaking task')
    }
}
