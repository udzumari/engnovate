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
    const doc: PandocDoc = JSON.parse(content);

    let testTitle = '';
    let currentPassage = '';
    let passages: any[] = [];
    let questions: any[] = [];
    let answers: string[] = [];
    let inAnswerSection = false;
    let questionCounter = 0;

    // Process blocks
    for (let i = 0; i < doc.blocks.length; i++) {
        const block = doc.blocks[i];
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
const readingDir = 'c:\\Users\\admin\\Desktop\\projects\\engnovate\\reading';
const jsonFiles = [
    'READING_16_20251128_081737_b158c8ff.json',
    'READING_17_20251128_081736_5889708e.json',
    'READING_18_20251128_081736_8aac5bef.json',
    'READING_19_20251128_081736_3116e8fe.json',
    'READING_20_20251128_081736_daae2c99.json'
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
