'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, GraduationCap } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Navbar() {
    const pathname = usePathname()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { t } = useLanguage()

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
        setIsLoggedIn(loggedIn)
    }, [])

    const routes = [
        { href: '/tests', label: t('nav.tests') },
        { href: '/features', label: t('nav.features') },
        { href: '/pricing', label: t('nav.pricing') },
        { href: '/reviews', label: t('nav.reviews') },
        { href: '/about', label: t('nav.about') },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    <div className="p-1.5 bg-primary rounded-lg">
                        <GraduationCap className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span>EngNovate</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === route.href ? 'text-primary' : 'text-muted-foreground'
                                }`}
                        >
                            {route.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <LanguageSwitcher />
                    {isLoggedIn ? (
                        <Button variant="ghost" asChild>
                            <Link href="/dashboard">{t('nav.dashboard')}</Link>
                        </Button>
                    ) : (
                        <>
                            <Button variant="ghost" asChild>
                                <Link href="/login">{t('nav.login')}</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/register">{t('nav.getStarted')}</Link>
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile Nav */}
                <div className="flex items-center gap-2 md:hidden">
                    <LanguageSwitcher />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <div className="flex flex-col gap-4 mt-8">
                                {routes.map((route) => (
                                    <Link
                                        key={route.href}
                                        href={route.href}
                                        className="text-lg font-medium"
                                    >
                                        {route.label}
                                    </Link>
                                ))}
                                <div className="h-px bg-border my-2" />
                                {isLoggedIn ? (
                                    <Button asChild>
                                        <Link href="/dashboard">{t('nav.dashboard')}</Link>
                                    </Button>
                                ) : (
                                    <>
                                        <Button variant="ghost" asChild className="justify-start">
                                            <Link href="/login">{t('nav.login')}</Link>
                                        </Button>
                                        <Button asChild className="justify-start">
                                            <Link href="/register">{t('nav.getStarted')}</Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
