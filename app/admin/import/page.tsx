'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, FileText, FileAudio, FileSpreadsheet, CheckCircle2 } from 'lucide-react'

export default function ImportPage() {
    const [uploadStatus, setUploadStatus] = useState<string | null>(null)

    const handleFileUpload = (type: string) => {
        setUploadStatus(`${type} file uploaded successfully!`)
        setTimeout(() => setUploadStatus(null), 3000)
    }

    return (
        <div className="p-8 space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Bulk Import</h1>
                <p className="text-muted-foreground mt-2">
                    Upload test content in bulk using various file formats
                </p>
            </div>

            {uploadStatus && (
                <Card className="bg-green-50 border-green-200">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2 text-green-700">
                            <CheckCircle2 className="h-5 w-5" />
                            <span className="font-medium">{uploadStatus}</span>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-blue-500" />
                            <CardTitle>Import from DOCX</CardTitle>
                        </div>
                        <CardDescription>
                            Upload Word documents containing test passages and questions
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground mb-2">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">
                                DOCX files up to 10MB
                            </p>
                            <input
                                type="file"
                                accept=".docx"
                                className="hidden"
                                onChange={() => handleFileUpload('DOCX')}
                            />
                        </div>
                        <Button className="w-full" onClick={() => handleFileUpload('DOCX')}>
                            Upload DOCX File
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <FileSpreadsheet className="h-5 w-5 text-green-500" />
                            <CardTitle>Import from CSV</CardTitle>
                        </div>
                        <CardDescription>
                            Upload CSV files with questions and answers
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground mb-2">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">
                                CSV files up to 5MB
                            </p>
                        </div>
                        <Button className="w-full" onClick={() => handleFileUpload('CSV')}>
                            Upload CSV File
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <FileAudio className="h-5 w-5 text-purple-500" />
                            <CardTitle>Import Audio Files</CardTitle>
                        </div>
                        <CardDescription>
                            Upload audio files for listening tests
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground mb-2">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">
                                MP3, WAV files up to 50MB
                            </p>
                        </div>
                        <Button className="w-full" onClick={() => handleFileUpload('Audio')}>
                            Upload Audio Files
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-orange-500" />
                            <CardTitle>Import Test Package</CardTitle>
                        </div>
                        <CardDescription>
                            Upload complete test packages (ZIP)
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground mb-2">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">
                                ZIP files up to 100MB
                            </p>
                        </div>
                        <Button className="w-full" onClick={() => handleFileUpload('Package')}>
                            Upload Test Package
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Import History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div className="flex items-center gap-3">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">reading_test_batch_1.docx</p>
                                    <p className="text-xs text-muted-foreground">Imported 25 questions • 2 hours ago</p>
                                </div>
                            </div>
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div className="flex items-center gap-3">
                                <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">vocabulary_questions.csv</p>
                                    <p className="text-xs text-muted-foreground">Imported 50 questions • Yesterday</p>
                                </div>
                            </div>
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
