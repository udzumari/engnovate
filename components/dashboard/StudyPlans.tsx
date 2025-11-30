'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Trash2, CheckCircle2, XCircle, Calendar as CalendarIcon } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { translations } from '@/lib/translations'

export interface StudyPlan {
    id: string
    title: string
    description: string
    targetDate: Date
    targetScore?: number
    type: 'exam' | 'practice' | 'goal'
    status: 'upcoming' | 'completed' | 'failed'
    createdAt: Date
}

interface StudyPlansProps {
    plans: StudyPlan[]
    onAddPlan: (plan: Omit<StudyPlan, 'id' | 'createdAt'>) => void
    onDeletePlan: (id: string) => void
    onUpdatePlan: (id: string, updates: Partial<StudyPlan>) => void
}

export function StudyPlans({ plans, onAddPlan, onDeletePlan, onUpdatePlan }: StudyPlansProps) {
    const { language } = useLanguage()
    const t = translations[language].dashboard.studyPlans
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingPlan, setEditingPlan] = useState<StudyPlan | null>(null)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        targetDate: '',
        targetScore: '',
        type: 'practice' as 'exam' | 'practice' | 'goal',
        status: 'upcoming' as 'upcoming' | 'completed' | 'failed'
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const planData = {
            title: formData.title,
            description: formData.description,
            targetDate: new Date(formData.targetDate),
            targetScore: formData.targetScore ? Number(formData.targetScore) : undefined,
            type: formData.type,
            status: formData.status
        }

        if (editingPlan) {
            onUpdatePlan(editingPlan.id, planData)
        } else {
            onAddPlan(planData)
        }

        setIsDialogOpen(false)
        setEditingPlan(null)
        setFormData({
            title: '',
            description: '',
            targetDate: '',
            targetScore: '',
            type: 'practice',
            status: 'upcoming'
        })
    }

    const handleEdit = (plan: StudyPlan) => {
        setEditingPlan(plan)
        setFormData({
            title: plan.title,
            description: plan.description,
            targetDate: plan.targetDate.toISOString().split('T')[0],
            targetScore: plan.targetScore?.toString() || '',
            type: plan.type,
            status: plan.status
        })
        setIsDialogOpen(true)
    }

    const upcomingPlans = plans.filter(p => p.status === 'upcoming').sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime())
    const completedPlans = plans.filter(p => p.status === 'completed')
    const failedPlans = plans.filter(p => p.status === 'failed')

    const PlanCard = ({ plan }: { plan: StudyPlan }) => (
        <div className={`p-4 rounded-lg border-l-4 ${plan.status === 'completed' ? 'border-l-green-500 bg-green-50 dark:bg-green-950/20' :
                plan.status === 'failed' ? 'border-l-red-500 bg-red-50 dark:bg-red-950/20' :
                    'border-l-purple-500 bg-purple-50 dark:bg-purple-950/20'
            }`}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        {plan.status === 'completed' && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                        {plan.status === 'failed' && <XCircle className="h-4 w-4 text-red-600" />}
                        {plan.status === 'upcoming' && <CalendarIcon className="h-4 w-4 text-purple-600" />}
                        <h4 className="font-semibold">{plan.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{plan.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{plan.targetDate.toLocaleDateString(language)}</span>
                        {plan.targetScore && <span>{t.targetScore}: {plan.targetScore}</span>}
                        <span className="capitalize">{plan.type}</span>
                    </div>
                </div>
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(plan)}
                    >
                        {t.edit}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeletePlan(plan.id)}
                    >
                        <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                </div>
            </div>
        </div>
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{t.title}</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => { setEditingPlan(null); setFormData({ title: '', description: '', targetDate: '', targetScore: '', type: 'practice', status: 'upcoming' }) }}>
                            <Plus className="h-4 w-4 mr-2" />
                            {t.addPlan}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>{editingPlan ? t.editPlan : t.addPlan}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">{t.planTitle}</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="description">{t.description}</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                />
                            </div>
                            <div>
                                <Label htmlFor="targetDate">{t.targetDate}</Label>
                                <Input
                                    id="targetDate"
                                    type="date"
                                    value={formData.targetDate}
                                    onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="targetScore">{t.targetScore} ({t.optional})</Label>
                                <Input
                                    id="targetScore"
                                    type="number"
                                    min="0"
                                    max="9"
                                    step="0.5"
                                    value={formData.targetScore}
                                    onChange={(e) => setFormData({ ...formData, targetScore: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="type">{t.planType}</Label>
                                <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="exam">{t.exam}</SelectItem>
                                        <SelectItem value="practice">{t.practice}</SelectItem>
                                        <SelectItem value="goal">{t.goal}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="status">{t.status}</Label>
                                <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="upcoming">{t.upcoming}</SelectItem>
                                        <SelectItem value="completed">{t.completed}</SelectItem>
                                        <SelectItem value="failed">{t.failed}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" className="flex-1">{editingPlan ? t.update : t.create}</Button>
                                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>{t.cancel}</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Upcoming Plans */}
            {upcomingPlans.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">{t.upcoming} ({upcomingPlans.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {upcomingPlans.map(plan => <PlanCard key={plan.id} plan={plan} />)}
                    </CardContent>
                </Card>
            )}

            {/* Completed Plans */}
            {completedPlans.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg text-green-600">{t.completed} ({completedPlans.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {completedPlans.map(plan => <PlanCard key={plan.id} plan={plan} />)}
                    </CardContent>
                </Card>
            )}

            {/* Failed Plans */}
            {failedPlans.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg text-red-600">{t.failed} ({failedPlans.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {failedPlans.map(plan => <PlanCard key={plan.id} plan={plan} />)}
                    </CardContent>
                </Card>
            )}

            {plans.length === 0 && (
                <Card>
                    <CardContent className="py-12 text-center text-muted-foreground">
                        <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>{t.noPlans}</p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
