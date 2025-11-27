'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
    LayoutDashboard,
    Users,
    FileText,
    Upload,
    Settings,
    LogOut,
    Shield
} from 'lucide-react'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Check if user is admin
        const isAdmin = localStorage.getItem('isAdmin') === 'true'
        if (!isAdmin) {
            router.push('/admin/login')
        }
    }, [pathname, router])

    const handleSignOut = () => {
        localStorage.removeItem('isAdmin')
        router.push('/')
    }

    const sidebarItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
        { icon: Users, label: 'Users', href: '/admin/users' },
        { icon: FileText, label: 'Tests', href: '/admin/tests' },
        { icon: Upload, label: 'Import', href: '/admin/import' },
        { icon: Settings, label: 'Settings', href: '/admin/settings' },
    ]

    if (!mounted) return null

    return (
        <div className="min-h-screen flex bg-muted/10">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-background border-r fixed inset-y-0 z-30">
                <div className="h-16 flex items-center px-6 border-b bg-primary/5">
                    <Shield className="h-6 w-6 text-primary mr-2" />
                    <span className="font-bold text-lg">Admin Panel</span>
                </div>

                <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
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
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64">
                {children}
            </main>
        </div>
    )
}
