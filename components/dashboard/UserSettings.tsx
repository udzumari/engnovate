'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Camera, Mail, Phone, User, Globe } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { translations, Language } from '@/lib/translations'

interface UserProfile {
    name: string
    email: string
    phone: string
    avatar?: string
}

interface UserSettingsProps {
    profile: UserProfile
    onUpdateProfile: (profile: UserProfile) => void
}

export function UserSettings({ profile, onUpdateProfile }: UserSettingsProps) {
    const { language, setLanguage } = useLanguage()
    const t = translations[language].dashboard.settings
    const [formData, setFormData] = useState(profile)
    const [isEditing, setIsEditing] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onUpdateProfile(formData)
        setIsEditing(false)
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData({ ...formData, avatar: reader.result as string })
            }
            reader.readAsDataURL(file)
        }
    }

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">{t.title}</h2>

            {/* Profile Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>{t.profileSettings}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Avatar */}
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={formData.avatar} />
                                    <AvatarFallback className="text-2xl">
                                        {getInitials(formData.name)}
                                    </AvatarFallback>
                                </Avatar>
                                {isEditing && (
                                    <label
                                        htmlFor="avatar-upload"
                                        className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition"
                                    >
                                        <Camera className="h-4 w-4" />
                                        <input
                                            id="avatar-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleAvatarChange}
                                        />
                                    </label>
                                )}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">{formData.name}</h3>
                                <p className="text-sm text-muted-foreground">{formData.email}</p>
                            </div>
                        </div>

                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                {t.fullName}
                            </Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                disabled={!isEditing}
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                {t.email}
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                disabled={!isEditing}
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                {t.phone}
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            {!isEditing ? (
                                <Button type="button" onClick={() => setIsEditing(true)}>
                                    {t.editProfile}
                                </Button>
                            ) : (
                                <>
                                    <Button type="submit">{t.saveChanges}</Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setFormData(profile)
                                            setIsEditing(false)
                                        }}
                                    >
                                        {t.cancel}
                                    </Button>
                                </>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Language Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        {t.languageSettings}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Label>{t.selectLanguage}</Label>
                        <div className="grid grid-cols-3 gap-3">
                            <Button
                                variant={language === 'uz' ? 'default' : 'outline'}
                                onClick={() => setLanguage('uz')}
                                className="w-full"
                            >
                                🇺🇿 O'zbekcha
                            </Button>
                            <Button
                                variant={language === 'ru' ? 'default' : 'outline'}
                                onClick={() => setLanguage('ru')}
                                className="w-full"
                            >
                                🇷🇺 Русский
                            </Button>
                            <Button
                                variant={language === 'en' ? 'default' : 'outline'}
                                onClick={() => setLanguage('en')}
                                className="w-full"
                            >
                                🇬🇧 English
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
