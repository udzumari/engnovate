'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Search, Plus, Edit, Trash2, MoreVertical, Eye } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Test {
    id: string
    title: string
    type: 'Reading' | 'Writing' | 'Speaking' | 'Listening'
    difficulty: 'Easy' | 'Medium' | 'Hard'
    duration: number
    questions: number
    status: 'active' | 'draft'
    createdDate: string
}

const initialTests: Test[] = [
    { id: '1', title: 'IELTS Academic Reading Test 1', type: 'Reading', difficulty: 'Medium', duration: 60, questions: 40, status: 'active', createdDate: '2024-01-10' },
    { id: '2', title: 'IELTS Writing Task 2', type: 'Writing', difficulty: 'Hard', duration: 40, questions: 1, status: 'active', createdDate: '2024-01-15' },
    { id: '3', title: 'IELTS Speaking Part 2', type: 'Speaking', difficulty: 'Medium', duration: 4, questions: 1, status: 'active', createdDate: '2024-01-20' },
    { id: '4', title: 'IELTS Listening Practice', type: 'Listening', difficulty: 'Medium', duration: 30, questions: 40, status: 'draft', createdDate: '2024-02-01' },
    { id: '5', title: 'Advanced Reading Comprehension', type: 'Reading', difficulty: 'Hard', duration: 60, questions: 40, status: 'active', createdDate: '2024-02-10' },
]

export default function TestsPage() {
    const [tests, setTests] = useState<Test[]>(initialTests)
    const [searchTerm, setSearchTerm] = useState('')
    const [editingTest, setEditingTest] = useState<Test | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const filteredTests = tests.filter(test =>
        test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.type.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this test?')) {
            setTests(tests.filter(t => t.id !== id))
        }
    }

    const handleEdit = (test: Test) => {
        setEditingTest(test)
        setIsDialogOpen(true)
    }

    const handleAdd = () => {
        const newTest: Test = {
            id: Date.now().toString(),
            title: 'New Test',
            type: 'Reading',
            difficulty: 'Medium',
            duration: 60,
            questions: 40,
            status: 'draft',
            createdDate: new Date().toISOString().split('T')[0]
        }
        setEditingTest(newTest)
        setIsDialogOpen(true)
    }

    const handleSave = () => {
        if (editingTest) {
            if (tests.find(t => t.id === editingTest.id)) {
                setTests(tests.map(t => t.id === editingTest.id ? editingTest : t))
            } else {
                setTests([...tests, editingTest])
            }
            setIsDialogOpen(false)
            setEditingTest(null)
        }
    }

    const typeColors = {
        Reading: 'bg-blue-500/10 text-blue-500',
        Writing: 'bg-yellow-500/10 text-yellow-500',
        Speaking: 'bg-red-500/10 text-red-500',
        Listening: 'bg-green-500/10 text-green-500',
    }

    return (
        <div className="p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Tests</h1>
                    <p className="text-muted-foreground mt-2">
                        Create and manage IELTS practice tests
                    </p>
                </div>
                <Button onClick={handleAdd}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Test
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search tests by title or type..."
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
                                <TableHead>Title</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Difficulty</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Questions</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredTests.map((test) => (
                                <TableRow key={test.id}>
                                    <TableCell className="font-medium">{test.title}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={typeColors[test.type]}>
                                            {test.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{test.difficulty}</TableCell>
                                    <TableCell>{test.duration} min</TableCell>
                                    <TableCell>{test.questions}</TableCell>
                                    <TableCell>
                                        <Badge variant={test.status === 'active' ? 'default' : 'secondary'}>
                                            {test.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleEdit(test)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(test.id)}
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
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{editingTest && tests.find(t => t.id === editingTest.id) ? 'Edit Test' : 'Create Test'}</DialogTitle>
                        <DialogDescription>
                            Configure test settings and content
                        </DialogDescription>
                    </DialogHeader>
                    {editingTest && (
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                            <div className="space-y-2">
                                <Label htmlFor="title">Test Title</Label>
                                <Input
                                    id="title"
                                    value={editingTest.title}
                                    onChange={(e) => setEditingTest({ ...editingTest, title: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="type">Type</Label>
                                    <select
                                        id="type"
                                        value={editingTest.type}
                                        onChange={(e) => setEditingTest({ ...editingTest, type: e.target.value as any })}
                                        className="w-full p-2 border rounded-md"
                                    >
                                        <option value="Reading">Reading</option>
                                        <option value="Writing">Writing</option>
                                        <option value="Speaking">Speaking</option>
                                        <option value="Listening">Listening</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="difficulty">Difficulty</Label>
                                    <select
                                        id="difficulty"
                                        value={editingTest.difficulty}
                                        onChange={(e) => setEditingTest({ ...editingTest, difficulty: e.target.value as any })}
                                        className="w-full p-2 border rounded-md"
                                    >
                                        <option value="Easy">Easy</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Hard">Hard</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="duration">Duration (minutes)</Label>
                                    <Input
                                        id="duration"
                                        type="number"
                                        value={editingTest.duration}
                                        onChange={(e) => setEditingTest({ ...editingTest, duration: parseInt(e.target.value) })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="questions">Number of Questions</Label>
                                    <Input
                                        id="questions"
                                        type="number"
                                        value={editingTest.questions}
                                        onChange={(e) => setEditingTest({ ...editingTest, questions: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <select
                                    id="status"
                                    value={editingTest.status}
                                    onChange={(e) => setEditingTest({ ...editingTest, status: e.target.value as any })}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="active">Active</option>
                                </select>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>
                            Save Test
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
