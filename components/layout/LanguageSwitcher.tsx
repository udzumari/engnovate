'use client'

import { useLanguage } from '@/lib/LanguageContext'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage()

    const languages = {
        uz: 'O\'zbek',
        ru: 'Русский',
        en: 'English'
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-9 px-0">
                    <Globe className="h-4 w-4" />
                    <span className="sr-only">Toggle language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('uz')} className={language === 'uz' ? 'bg-accent' : ''}>
                    O'zbek
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('ru')} className={language === 'ru' ? 'bg-accent' : ''}>
                    Русский
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-accent' : ''}>
                    English
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
