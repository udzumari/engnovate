// User progress tracking utilities
export interface TestResult {
    id: string
    testId: string
    testType: 'Reading' | 'Writing' | 'Speaking' | 'Listening'
    testTitle: string
    score: number
    bandScore: number
    completedAt: Date
    timeSpent: number // in seconds
    answers?: any[]
}

export interface UserStats {
    totalTests: number
    averageBandScore: number
    activeStreak: number
    lastActivityDate: string
    testResults: TestResult[]
}

// Initialize user stats
export function initializeUserStats(): UserStats {
    const saved = localStorage.getItem('userStats')
    if (saved) {
        const stats = JSON.parse(saved)
        // Convert date strings back to Date objects
        stats.testResults = stats.testResults.map((result: any) => ({
            ...result,
            completedAt: new Date(result.completedAt)
        }))
        return stats
    }

    return {
        totalTests: 0,
        averageBandScore: 0,
        activeStreak: 0,
        lastActivityDate: '',
        testResults: []
    }
}

// Save user stats
export function saveUserStats(stats: UserStats): void {
    localStorage.setItem('userStats', JSON.stringify(stats))
}

// Add a test result
export function addTestResult(result: Omit<TestResult, 'id'>): UserStats {
    const stats = initializeUserStats()

    const newResult: TestResult = {
        ...result,
        id: Date.now().toString(),
        completedAt: new Date()
    }

    stats.testResults.push(newResult)
    stats.totalTests = stats.testResults.length

    // Calculate average band score
    const totalBandScore = stats.testResults.reduce((sum, r) => sum + r.bandScore, 0)
    stats.averageBandScore = stats.testResults.length > 0
        ? Math.round((totalBandScore / stats.testResults.length) * 10) / 10
        : 0

    // Update streak
    stats.activeStreak = calculateStreak(stats)
    stats.lastActivityDate = new Date().toISOString()

    saveUserStats(stats)
    return stats
}

// Calculate active streak
export function calculateStreak(stats: UserStats): number {
    if (stats.testResults.length === 0) return 0

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Get unique activity dates (sorted descending)
    const activityDates = [...new Set(
        stats.testResults.map(r => {
            const date = new Date(r.completedAt)
            date.setHours(0, 0, 0, 0)
            return date.getTime()
        })
    )].sort((a, b) => b - a)

    if (activityDates.length === 0) return 0

    // Check if there's activity today or yesterday
    const mostRecentActivity = new Date(activityDates[0])
    const daysDiff = Math.floor((today.getTime() - mostRecentActivity.getTime()) / (1000 * 60 * 60 * 24))

    // If last activity was more than 1 day ago, streak is broken
    if (daysDiff > 1) return 0

    // Count consecutive days
    let streak = 1
    for (let i = 1; i < activityDates.length; i++) {
        const currentDate = new Date(activityDates[i])
        const previousDate = new Date(activityDates[i - 1])
        const diff = Math.floor((previousDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))

        if (diff === 1) {
            streak++
        } else {
            break
        }
    }

    return streak
}

// Get recent test results
export function getRecentTests(limit: number = 5): TestResult[] {
    const stats = initializeUserStats()
    return stats.testResults
        .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
        .slice(0, limit)
}

// Get stats by test type
export function getStatsByType(type: 'Reading' | 'Writing' | 'Speaking' | 'Listening') {
    const stats = initializeUserStats()
    const typeResults = stats.testResults.filter(r => r.testType === type)

    if (typeResults.length === 0) {
        return {
            count: 0,
            averageScore: 0,
            averageBandScore: 0,
            bestScore: 0
        }
    }

    const totalScore = typeResults.reduce((sum, r) => sum + r.score, 0)
    const totalBandScore = typeResults.reduce((sum, r) => sum + r.bandScore, 0)
    const bestScore = Math.max(...typeResults.map(r => r.score))

    return {
        count: typeResults.length,
        averageScore: Math.round(totalScore / typeResults.length),
        averageBandScore: Math.round((totalBandScore / typeResults.length) * 10) / 10,
        bestScore
    }
}

// Convert score to IELTS band score (for Reading)
export function calculateReadingBandScore(correctAnswers: number, totalQuestions: number = 40): number {
    const percentage = (correctAnswers / totalQuestions) * 100

    // IELTS Reading band score conversion (Academic)
    if (percentage >= 97.5) return 9.0
    if (percentage >= 95) return 8.5
    if (percentage >= 90) return 8.0
    if (percentage >= 85) return 7.5
    if (percentage >= 75) return 7.0
    if (percentage >= 65) return 6.5
    if (percentage >= 55) return 6.0
    if (percentage >= 45) return 5.5
    if (percentage >= 35) return 5.0
    if (percentage >= 25) return 4.5
    if (percentage >= 15) return 4.0
    if (percentage >= 10) return 3.5
    if (percentage >= 5) return 3.0
    return 2.5
}

// Get study time (total time spent on tests)
export function getTotalStudyTime(): number {
    const stats = initializeUserStats()
    return stats.testResults.reduce((total, result) => total + result.timeSpent, 0)
}

// Format time in hours and minutes
export function formatStudyTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
        return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
}
