// Script to parse Pandoc JSON files and extract reading test data
// This will help convert the DOCX-derived JSON into our test format

import fs from 'fs';
import path from 'path';

interface PandocBlock {
    t: string;
    c: any;
}

interface PandocDoc {
    blocks: PandocBlock[];
}

// Helper function to extract text from Pandoc inline elements
function extractText(inlines: any[]): string {
    if (!Array.isArray(inlines)) return '';

    return inlines.map(inline => {
        if (typeof inline === 'string') return inline;
        if (!inline || !inline.t) return '';

        switch (inline.t) {
            case 'Str':
                return inline.c;
            case 'Space':
                return ' ';
            case 'LineBreak':
            case 'SoftBreak':
                return '\n';
            case 'Strong':
            case 'Emph':
            case 'Link':
                return extractText(inline.c);
            default:
                return '';
        }
    }).join('');
}

// Helper function to extract text from a paragraph block
function extractParagraphText(block: PandocBlock): string {
    if (block.t === 'Para') {
        return extractText(block.c);
    }
    return '';
}

// Parse a single JSON file
function parseReadingTest(filePath: string) {
    console.log(`\nParsing: ${path.basename(filePath)}`);

    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);

    // Pandoc JSON format is [metadata, blocks]
    const blocks = Array.isArray(data) && data.length > 1 ? data[1] : [];

    let testTitle = '';
    let currentPassage = '';
    let passages: any[] = [];
    let questions: any[] = [];
    let answers: string[] = [];
    let inAnswerSection = false;
    let questionCounter = 0;

    // Process blocks
    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        const text = extractParagraphText(block);

        // Detect test title
        if (text.includes('Academic Reading Test') && !testTitle) {
            testTitle = text.trim();
            console.log(`Found title: ${testTitle}`);
        }

        // Detect passage titles
        if (text.includes('READING PASSAGE')) {
            console.log(`Found passage: ${text}`);
        }

        // Detect answer section
        if (text.includes('Answers') || text.includes('ANSWERS')) {
            inAnswerSection = true;
            console.log('Found answers section');
            continue;
        }

        // Extract answers
        if (inAnswerSection && text.trim()) {
            // Parse answer lines like "1. False" or "8. Violent"
            const answerMatch = text.match(/^(\d+)\.\s*(.+)$/);
            if (answerMatch) {
                const [, num, answer] = answerMatch;
                answers.push(answer.trim());
            }
        }

        // Detect questions
        const questionMatch = text.match(/^(\d+)\s+(.+)/);
        if (questionMatch && !inAnswerSection) {
            questionCounter++;
            console.log(`Found question ${questionCounter}: ${text.substring(0, 50)}...`);
        }
    }

    console.log(`\nSummary:`);
    console.log(`- Title: ${testTitle}`);
    console.log(`- Questions found: ${questionCounter}`);
    console.log(`- Answers found: ${answers.length}`);
    console.log(`- Sample answers:`, answers.slice(0, 5));

    return {
        testTitle,
        questionCount: questionCounter,
        answers
    };
}

// Main execution
const readingDir = 'c:\\Users\\admin\\Desktop\\engnovate\\reading';
const jsonFiles = [
    'READING 01.json',
    'READING 02.json',
    'READING 03.json',
    'READING 04.json',
    'READING 05.json',
    'READING 06.json',
    'READING 07.json',
    'READING 08.json',
    'READING 09.json',
    'READING 10.json',
    'READING 11.json',
    'READING 12.json',
    'READING 13.json',
    'READING 14.json',
    'READING 15.json',
    'READING 16.json',
    'READING 17.json',
    'READING 18.json',
    'READING 19.json',
    'RREADING 20.json'
];

console.log('='.repeat(60));
console.log('READING TEST JSON PARSER');
console.log('='.repeat(60));

jsonFiles.forEach(file => {
    const filePath = path.join(readingDir, file);
    if (fs.existsSync(filePath)) {
        parseReadingTest(filePath);
    } else {
        console.log(`File not found: ${file}`);
    }
});

console.log('\n' + '='.repeat(60));
console.log('Parsing complete!');
console.log('='.repeat(60));
