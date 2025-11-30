'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { translations } from '@/lib/translations'

interface CalendarEvent {
    id: string
    date: Date
    type: 'exam' | 'plan' | 'test'
    title: string
    status?: 'completed' | 'upcoming' | 'failed'
}

interface CalendarProps {
    events: CalendarEvent[]
    onDateClick?: (date: Date) => void
}

export function Calendar({ events, onDateClick }: CalendarProps) {
    const { language } = useLanguage()
    const t = translations[language].dashboard.calendar
    const [currentDate, setCurrentDate] = useState(new Date())

    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate()

    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay()

    const monthNames = {
        en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        uz: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'],
        ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    }

    const dayNames = {
        en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        uz: ['Ya', 'Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh'],
        ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    }

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
    }

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
    }

    const getEventsForDate = (day: number) => {
        return events.filter(event => {
            const eventDate = new Date(event.date)
            return eventDate.getDate() === day &&
                eventDate.getMonth() === currentDate.getMonth() &&
                eventDate.getFullYear() === currentDate.getFullYear()
        })
    }

    const renderCalendarDays = () => {
        const days = []
        const totalSlots = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7

        for (let i = 0; i < totalSlots; i++) {
            const day = i - firstDayOfMonth + 1
            const isCurrentMonth = day > 0 && day <= daysInMonth
            const isToday = isCurrentMonth &&
                day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear()

            const dayEvents = isCurrentMonth ? getEventsForDate(day) : []
            const hasEvent = dayEvents.length > 0

            days.push(
                <button
                    key={i}
                    onClick={() => isCurrentMonth && onDateClick?.(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                    className={`
                        aspect-square p-2 text-sm rounded-lg transition-all relative
                        ${!isCurrentMonth ? 'text-muted-foreground/30 cursor-default' : 'hover:bg-muted cursor-pointer'}
                        ${isToday ? 'bg-primary text-primary-foreground font-bold' : ''}
                        ${hasEvent && !isToday ? 'font-semibold' : ''}
                    `}
                    disabled={!isCurrentMonth}
                >
                    {isCurrentMonth && day}
                    {hasEvent && (
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                            {dayEvents.slice(0, 3).map((event, idx) => (
                                <div
                                    key={idx}
                                    className={`w-1 h-1 rounded-full ${event.type === 'exam' ? 'bg-red-500' :
                                            event.type === 'test' ? 'bg-blue-500' :
                                                event.status === 'completed' ? 'bg-green-500' :
                                                    event.status === 'failed' ? 'bg-orange-500' :
                                                        'bg-purple-500'
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </button>
            )
        }

        return days
    }

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                        {monthNames[language][currentDate.getMonth()]} {currentDate.getFullYear()}
                    </CardTitle>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={previousMonth} className="h-8 w-8">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={nextMonth} className="h-8 w-8">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames[language].map((day, idx) => (
                        <div key={idx} className="text-center text-xs font-medium text-muted-foreground py-2">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {renderCalendarDays()}
                </div>
            </CardContent>
        </Card>
    )
}
