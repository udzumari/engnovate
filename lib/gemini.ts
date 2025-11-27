import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GEMINI_API_KEY

if (!apiKey) {
    console.warn('GEMINI_API_KEY is not set in environment variables.')
}

const genAI = new GoogleGenerativeAI(apiKey || 'mock-key')

export const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp', // Using the latest fast model
})

export const visionModel = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
})
