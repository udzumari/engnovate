'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Clock, Trophy, TrendingUp, Calendar as CalendarIcon, Settings, FileText } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { Calendar } from '@/components/dashboard/Calendar'
import { StudyPlans, StudyPlan } from '@/components/dashboard/StudyPlans'
import { UserSettings, UserProfile } from '@/components/dashboard/UserSettings'
import { initializeUserStats, getRecentTests, getTotalStudyTime, formatStudyTime, UserStats } from '@/lib/userProgress'
import Link from 'next/link'

export default function DashboardPage() {
    const [userName, setUserName] = useState('User')
    const [activeView, setActiveView] = useState<'overview' | 'plans' | 'settings'>('overview')
    const { t, language, setLanguage } = useLanguage()

    // User stats state
    const [userStats, setUserStats] = useState<UserStats>({
        totalTests: 0,
        averageBandScore: 0,
        activeStreak: 0,
        lastActivityDate: '',
        testResults: []
    })

    // User profile state
    const [userProfile, setUserProfile] = useState<UserProfile>({
        name: 'Student User',
        email: 'student@engnovate.com',
        phone: '+998 90 123 45 67'
    })

    // Study plans state
    const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([])

    // Calendar events
    const [calendarEvents, setCalendarEvents] = useState<any[]>([])

    useEffect(() => {
        const name = localStorage.getItem('userName') || 'User'
        setUserName(name)

        // Load user stats
        const stats = initializeUserStats()
        setUserStats(stats)

        // Load saved data from localStorage
        const savedProfile = localStorage.getItem('userProfile')
        if (savedProfile) {
            setUserProfile(JSON.parse(savedProfile))
        }

        const savedPlans = localStorage.getItem('studyPlans')
        if (savedPlans) {
            const plans = JSON.parse(savedPlans)
            // Convert date strings back to Date objects
            setStudyPlans(plans.map((p: any) => ({
                ...p,
                targetDate: new Date(p.targetDate),
                createdAt: new Date(p.createdAt)
            })))
        } else {
            // Add some sample plans
            const samplePlans: StudyPlan[] = [
                {
                    id: '1',
                    title: 'IELTS Academic Exam',
                    description: 'Take the official IELTS exam',
                    targetDate: new Date(2025, 11, 15),
                    targetScore: 7.5,
                    type: 'exam',
                    status: 'upcoming',
                    createdAt: new Date()
                },
                {
                    id: '2',
                    title: 'Complete Reading Practice',
                    description: 'Finish all 20 reading tests',
                    targetDate: new Date(2025, 11, 1),
                    type: 'practice',
                    status: 'upcoming',
                    createdAt: new Date()
                }
            ]
            setStudyPlans(samplePlans)
        }
    }, [])

    // Save to localStorage whenever plans change
    useEffect(() => {
        if (studyPlans.length > 0) {
            localStorage.setItem('studyPlans', JSON.stringify(studyPlans))

            // Update calendar events
            const events = studyPlans.map(plan => ({
                id: plan.id,
                date: plan.targetDate,
                type: plan.type,
                title: plan.title,
                status: plan.status
            }))
            setCalendarEvents(events)
        }
    }, [studyPlans])

    const handleAddPlan = (plan: Omit<StudyPlan, 'id' | 'createdAt'>) => {
        const newPlan: StudyPlan = {
            ...plan,
            id: Date.now().toString(),
            createdAt: new Date()
        }
        setStudyPlans([...studyPlans, newPlan])
    }

    const handleDeletePlan = (id: string) => {
        setStudyPlans(studyPlans.filter(p => p.id !== id))
    }

    const handleUpdatePlan = (id: string, updates: Partial<StudyPlan>) => {
        setStudyPlans(studyPlans.map(p => p.id === id ? { ...p, ...updates } : p))
    }

    const handleUpdateProfile = (profile: UserProfile) => {
        setUserProfile(profile)
        localStorage.setItem('userProfile', JSON.stringify(profile))
    }

    const upcomingPlans = studyPlans
        .filter(p => p.status === 'upcoming')
        .sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime())
        .slice(0, 3)

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
            <div className="flex flex-col lg:flex-row">
                {/* Main Content */}
                <div className="flex-1 p-4 md:p-6 lg:p-8">
                    {/* Header with Language Switcher */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                                {t('dashboard.overview.welcome').replace('{name}', userProfile.name)}
                            </h1>
                            <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">
                                {t('dashboard.overview.subtitle')}
                            </p>
                        </div>

                        {/* Language Switcher */}
                        <div className="flex gap-2">
                            <Button
                                variant={language === 'uz' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setLanguage('uz')}
                            >
                                🇺🇿 UZ
                            </Button>
                            <Button
                                variant={language === 'ru' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setLanguage('ru')}
                            >
                                🇷🇺 RU
                            </Button>
                            <Button
                                variant={language === 'en' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setLanguage('en')}
                            >
                                🇬🇧 EN
                            </Button>
                        </div>
                    </div>

                    {/* View Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <Button
                            variant={activeView === 'overview' ? 'default' : 'outline'}
                            onClick={() => setActiveView('overview')}
                            size="sm"
                        >
                            <BookOpen className="h-4 w-4 mr-2" />
                            {t('dashboard.sidebar.overview')}
                        </Button>
                        <Button
                            variant={activeView === 'plans' ? 'default' : 'outline'}
                            onClick={() => setActiveView('plans')}
                            size="sm"
                        >
                            <FileText className="h-4 w-4 mr-2" />
                            {t('dashboard.studyPlans.title')}
                        </Button>
                        <Button
                            variant={activeView === 'settings' ? 'default' : 'outline'}
                            onClick={() => setActiveView('settings')}
                            size="sm"
                        >
                            <Settings className="h-4 w-4 mr-2" />
                            {t('dashboard.settings.title')}
                        </Button>
                    </div>

                    {/* Overview View */}
                    {activeView === 'overview' && (
                        <div className="space-y-6">
                            {/* Status Cards */}
                            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border-orange-200">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {t('dashboard.overview.stats.totalTests')}
                                        </CardTitle>
                                        <BookOpen className="h-4 w-4 text-orange-600" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold text-orange-700">{userStats.totalTests}</div>
                                        <p className="text-xs text-orange-600 mt-1">
                                            {userStats.totalTests === 0
                                                ? t('dashboard.overview.stats.startFirst')
                                                : `+${userStats.testResults.filter(r => {
                                                    const weekAgo = new Date()
                                                    weekAgo.setDate(weekAgo.getDate() - 7)
                                                    return new Date(r.completedAt) > weekAgo
                                                }).length} this week`
                                            }
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/20 dark:to-pink-900/20 border-pink-200">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Study Time
                                        </CardTitle>
                                        <Clock className="h-4 w-4 text-pink-600" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold text-pink-700">
                                            {formatStudyTime(getTotalStudyTime())}
                                        </div>
                                        <p className="text-xs text-pink-600 mt-1">
                                            Total practice time
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {t('dashboard.overview.stats.avgScore')}
                                        </CardTitle>
                                        <Trophy className="h-4 w-4 text-green-600" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold text-green-700">
                                            {userStats.averageBandScore > 0 ? userStats.averageBandScore : '-'}
                                        </div>
                                        <p className="text-xs text-green-600 mt-1">
                                            {userStats.averageBandScore > 0
                                                ? 'IELTS Band Score'
                                                : t('dashboard.overview.stats.noTests')
                                            }
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {t('dashboard.overview.stats.streak')}
                                        </CardTitle>
                                        <TrendingUp className="h-4 w-4 text-purple-600" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold text-purple-700">
                                            {userStats.activeStreak} {userStats.activeStreak === 1 ? 'Day' : 'Days'}
                                        </div>
                                        <p className="text-xs text-purple-600 mt-1">
                                            {userStats.activeStreak > 0
                                                ? t('dashboard.overview.stats.keepItUp')
                                                : 'Start your streak!'
                                            }
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Quick Start */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('dashboard.overview.quickStart.title')}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <Link href="/dashboard/reading">
                                            <Card className="cursor-pointer hover:bg-muted/50 transition">
                                                <CardContent className="pt-6">
                                                    <h3 className="font-semibold mb-2">📖 Reading</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {t('dashboard.overview.quickStart.reading').split(' - ')[1]}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                        <Link href="/dashboard/writing">
                                            <Card className="cursor-pointer hover:bg-muted/50 transition">
                                                <CardContent className="pt-6">
                                                    <h3 className="font-semibold mb-2">✍️ Writing</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {t('dashboard.overview.quickStart.writing').split(' - ')[1]}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                        <Link href="/dashboard/speaking">
                                            <Card className="cursor-pointer hover:bg-muted/50 transition">
                                                <CardContent className="pt-6">
                                                    <h3 className="font-semibold mb-2">🎤 Speaking</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {t('dashboard.overview.quickStart.speaking').split(' - ')[1]}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                        <Card className="cursor-not-allowed opacity-50">
                                            <CardContent className="pt-6">
                                                <h3 className="font-semibold mb-2">🎧 Listening</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {t('dashboard.overview.quickStart.listening').split(' - ')[1]}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Study Plans View */}
                    {
                        activeView === 'plans' && (
                            <StudyPlans
                                plans={studyPlans}
                                onAddPlan={handleAddPlan}
                                onDeletePlan={handleDeletePlan}
                                onUpdatePlan={handleUpdatePlan}
                            />
                        )
                    }

                    {/* Settings View */}
                    {
                        activeView === 'settings' && (
                            <UserSettings
                                profile={userProfile}
                                onUpdateProfile={handleUpdateProfile}
                            />
                        )
                    }
                </div>

                {/* Right Sidebar */}
                <div className="w-full lg:w-80 p-4 md:p-6 border-t lg:border-t-0 lg:border-l bg-muted/10 space-y-6">
                    {/* Calendar */}
                    <Calendar events={calendarEvents} />

                    {/* Upcoming Events */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">{t('dashboard.studyPlans.upcoming')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {upcomingPlans.length > 0 ? (
                                upcomingPlans.map(plan => (
                                    <div key={plan.id} className="p-3 rounded-lg bg-muted/50 border">
                                        <div className="flex items-start justify-between mb-1">
                                            <span className="text-sm font-medium">{plan.title}</span>
                                            <span className="text-xs text-muted-foreground">
                                                {plan.targetDate.toLocaleDateString(language, { month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">{plan.description}</p>
                                        {plan.targetScore && (
                                            <div className="mt-2 text-xs font-medium text-primary">
                                                {t('dashboard.studyPlans.targetScore')}: {plan.targetScore}
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    {t('dashboard.studyPlans.noPlans')}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
