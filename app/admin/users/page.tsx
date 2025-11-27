'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Search, UserPlus, Edit, Trash2, MoreVertical } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface User {
    id: string
    name: string
    email: string
    subscription: 'free' | 'pro' | 'premium'
    testsCompleted: number
    joinedDate: string
}

const initialUsers: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', subscription: 'pro', testsCompleted: 45, joinedDate: '2024-01-15' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', subscription: 'free', testsCompleted: 12, joinedDate: '2024-02-20' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', subscription: 'premium', testsCompleted: 89, joinedDate: '2023-12-01' },
    { id: '4', name: 'Alice Williams', email: 'alice@example.com', subscription: 'pro', testsCompleted: 34, joinedDate: '2024-03-10' },
    { id: '5', name: 'Charlie Brown', email: 'charlie@example.com', subscription: 'free', testsCompleted: 8, joinedDate: '2024-04-05' },
]

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>(initialUsers)
    const [searchTerm, setSearchTerm] = useState('')
    const [editingUser, setEditingUser] = useState<User | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(u => u.id !== id))
        }
    }

    const handleEdit = (user: User) => {
        setEditingUser(user)
        setIsDialogOpen(true)
    }

    const handleSave = () => {
        if (editingUser) {
            setUsers(users.map(u => u.id === editingUser.id ? editingUser : u))
            setIsDialogOpen(false)
            setEditingUser(null)
        }
    }

    const handleAdd = () => {
        const newUser: User = {
            id: Date.now().toString(),
            name: 'New User',
            email: 'newuser@example.com',
            subscription: 'free',
            testsCompleted: 0,
            joinedDate: new Date().toISOString().split('T')[0]
        }
        setEditingUser(newUser)
        setIsDialogOpen(true)
    }

    const handleAddSave = () => {
        if (editingUser && !users.find(u => u.id === editingUser.id)) {
            setUsers([...users, editingUser])
        } else if (editingUser) {
            setUsers(users.map(u => u.id === editingUser.id ? editingUser : u))
        }
        setIsDialogOpen(false)
        setEditingUser(null)
    }

    return (
        <div className="p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage user accounts and subscriptions
                    </p>
                </div>
                <Button onClick={handleAdd}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add User
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search users by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Subscription</TableHead>
                                <TableHead>Tests Completed</TableHead>
                                <TableHead>Joined Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            user.subscription === 'premium' ? 'default' :
                                                user.subscription === 'pro' ? 'secondary' : 'outline'
                                        }>
                                            {user.subscription}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{user.testsCompleted}</TableCell>
                                    <TableCell>{user.joinedDate}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleEdit(user)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(user.id)}
                                                    className="text-red-600"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingUser && users.find(u => u.id === editingUser.id) ? 'Edit User' : 'Add User'}</DialogTitle>
                        <DialogDescription>
                            Update user information and subscription status
                        </DialogDescription>
                    </DialogHeader>
                    {editingUser && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={editingUser.name}
                                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={editingUser.email}
                                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subscription">Subscription</Label>
                                <select
                                    id="subscription"
                                    value={editingUser.subscription}
                                    onChange={(e) => setEditingUser({ ...editingUser, subscription: e.target.value as any })}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="free">Free</option>
                                    <option value="pro">Pro</option>
                                    <option value="premium">Premium</option>
                                </select>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddSave}>
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
