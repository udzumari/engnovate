'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
    LayoutDashboard,
    BookOpen,
    PenTool,
    Mic,
    Headphones,
    LogOut,
    GraduationCap,
    Menu,
    X
} from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()
    const [mounted, setMounted] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { t } = useLanguage()

    useEffect(() => {
        setMounted(true)
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
        if (!isLoggedIn && !pathname.includes('/tests/')) {
            router.push('/login')
        }
    }, [pathname, router])

    const handleSignOut = () => {
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('userEmail')
        localStorage.removeItem('userName')
        router.push('/')
    }

    const sidebarItems = [
        { icon: LayoutDashboard, label: t('dashboard.sidebar.overview'), href: '/dashboard' },
        { icon: BookOpen, label: t('dashboard.sidebar.allTests'), href: '/tests' },
        { icon: BookOpen, label: t('dashboard.sidebar.reading'), href: '/reading' },
        { icon: PenTool, label: t('dashboard.sidebar.writing'), href: '/tests/2' },
        { icon: Mic, label: t('dashboard.sidebar.speaking'), href: '/tests/3' },
        { icon: Headphones, label: t('dashboard.sidebar.listening'), href: '/tests/4' },
    ]

    if (!mounted) return null

    const SidebarContent = () => (
        <>
            <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
                {sidebarItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${pathname === item.href
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            }`}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                    </Link>
                ))}
            </div>

            <div className="p-4 border-t">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:text-red-500 hover:bg-red-50"
                    onClick={handleSignOut}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('dashboard.sidebar.signOut')}
                </Button>
            </div>
        </>
    )

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-muted/10">
            {/* Mobile Header */}
            <header className="md:hidden sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex h-16 items-center justify-between px-4">
                    <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                        <GraduationCap className="h-6 w-6 text-primary" />
                        <span>DomlaAI</span>
                    </Link>

                    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64 p-0">
                            <div className="flex flex-col h-full">
                                <div className="h-16 flex items-center px-6 border-b">
                                    <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                                        <GraduationCap className="h-6 w-6 text-primary" />
                                        <span>DomlaAI</span>
                                    </Link>
                                </div>
                                <SidebarContent />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-background border-r fixed inset-y-0 z-30">
                <div className="h-16 flex items-center px-6 border-b">
                    <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                        <GraduationCap className="h-6 w-6 text-primary" />
                        <span>DomlaAI</span>
                    </Link>
                </div>
                <SidebarContent />
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 w-full">
                {children}
            </main>
        </div>
    )
}
