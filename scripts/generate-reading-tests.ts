// Enhanced script to parse all reading test JSON files and generate TypeScript test data
import fs from 'fs';
import path from 'path';

interface PandocInline {
    t: string;
    c: any;
}

interface PandocBlock {
    t: string;
    c: any;
}

// Helper function to extract text from Pandoc inline elements
function extractText(inlines: any[]): string {
    if (!Array.isArray(inlines)) return '';

    return inlines.map((inline: any) => {
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
                if (Array.isArray(inline.c)) {
                    // For Link, the content is in c[1]
                    const content = inline.t === 'Link' ? inline.c[1] : inline.c;
                    return extractText(content);
                }
                return '';
            default:
                return '';
        }
    }).join('');
}

// Helper function to extract text from a paragraph block
function extractParagraphText(block: PandocBlock): string {
    if (block.t === 'Para' && Array.isArray(block.c)) {
        return extractText(block.c);
    }
    if (block.t === 'Header' && Array.isArray(block.c) && block.c.length > 2) {
        return extractText(block.c[2]);
    }
    return '';
}

// Parse a single JSON file and extract structured data
function parseReadingTest(filePath: string, testNumber: number) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Parsing Test ${testNumber}: ${path.basename(filePath)}`);
    console.log('='.repeat(60));

    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);

    // Pandoc JSON format is [metadata, blocks]
    const blocks = Array.isArray(data) && data.length > 1 ? data[1] : [];

    let testTitle = '';
    let passages: Array<{ title: string, content: string }> = [];
    let currentPassageTitle = '';
    let currentPassageContent: string[] = [];
    let questions: Array<{ number: number, text: string }> = [];
    let answers: Array<{ number: number, answer: string }> = [];
    let inAnswerSection = false;
    let inPassage = false;
    let passageNumber = 0;

    // Process blocks
    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        const text = extractParagraphText(block).trim();

        if (!text) continue;

        // Detect test title
        if ((text.includes('Academic Reading Test') || text.includes('READING TEST')) && !testTitle) {
            testTitle = text;
            console.log(`✓ Title: ${testTitle}`);
            continue;
        }

        // Detect passage titles
        if (text.match(/READING PASSAGE \d+/i)) {
            // Save previous passage if exists
            if (currentPassageTitle && currentPassageContent.length > 0) {
                passages.push({
                    title: currentPassageTitle,
                    content: currentPassageContent.join('\n\n')
                });
            }

            passageNumber++;
            currentPassageTitle = text;
            currentPassageContent = [];
            inPassage = true;
            inAnswerSection = false;
            console.log(`✓ Found: ${text}`);
            continue;
        }

        // Detect answer section
        if (text.match(/^(Answers?|ANSWERS?)$/i)) {
            // Save last passage
            if (currentPassageTitle && currentPassageContent.length > 0) {
                passages.push({
                    title: currentPassageTitle,
                    content: currentPassageContent.join('\n\n')
                });
                currentPassageContent = [];
            }

            inAnswerSection = true;
            inPassage = false;
            console.log('✓ Found answers section');
            continue;
        }

        // Extract answers
        if (inAnswerSection) {
            const answerMatch = text.match(/^(\d+)\.\s*(.+)$/);
            if (answerMatch) {
                const [, num, answer] = answerMatch;
                answers.push({
                    number: parseInt(num),
                    answer: answer.trim()
                });
            }
            continue;
        }

        // Detect questions (Questions X-Y format)
        if (text.match(/^Questions?\s+\d+/i)) {
            console.log(`✓ Question section: ${text}`);
            continue;
        }

        // Detect individual questions
        const questionMatch = text.match(/^(\d+)\s+(.+)/);
        if (questionMatch && !inAnswerSection) {
            const [, num, questionText] = questionMatch;
            questions.push({
                number: parseInt(num),
                text: questionText.trim()
            });
            continue;
        }

        // Collect passage content
        if (inPassage && !text.match(/^(Questions?|Choose|Complete|Match|Do the following)/i)) {
            currentPassageContent.push(text);
        }
    }

    // Save last passage if exists
    if (currentPassageTitle && currentPassageContent.length > 0) {
        passages.push({
            title: currentPassageTitle,
            content: currentPassageContent.join('\n\n')
        });
    }

    console.log(`\n📊 Summary:`);
    console.log(`   - Passages: ${passages.length}`);
    console.log(`   - Questions detected: ${questions.length}`);
    console.log(`   - Answers: ${answers.length}`);

    if (passages.length > 0) {
        console.log(`\n📝 Passages:`);
        passages.forEach((p, idx) => {
            console.log(`   ${idx + 1}. ${p.title} (${p.content.length} chars)`);
        });
    }

    if (answers.length > 0) {
        console.log(`\n✅ Sample answers: ${answers.slice(0, 5).map(a => `${a.number}.${a.answer}`).join(', ')}`);
    }

    return {
        testNumber,
        testTitle: testTitle || `Reading Test ${testNumber}`,
        passages,
        questions,
        answers
    };
}

// Generate TypeScript code for reading tests
function generateTypeScriptCode(allTests: any[]) {
    let tsCode = `// Auto-generated Reading Test Data
// Generated on: ${new Date().toISOString()}
// Total tests: ${allTests.length}

export interface ReadingQuestion {
    id: string;
    type: 'multiple_choice' | 'true_false' | 'matching' | 'fill_blank' | 'short_answer';
    text: string;
    options?: string[];
    correctAnswer: string;
    explanation?: string;
}

export interface ReadingSection {
    id: string;
    title: string;
    text: string;
    questions: ReadingQuestion[];
}

export interface ReadingTest {
    id: string;
    title: string;
    type: 'Reading';
    duration: number;
    sections: ReadingSection[];
}

export const readingTests: ReadingTest[] = [\n`;

    allTests.forEach((test, idx) => {
        const testId = `reading-${String(test.testNumber).padStart(2, '0')}`;

        tsCode += `    {\n`;
        tsCode += `        id: '${testId}',\n`;
        tsCode += `        title: '${test.testTitle.replace(/'/g, "\\'")}',\n`;
        tsCode += `        type: 'Reading',\n`;
        tsCode += `        duration: 60 * 60, // 60 minutes\n`;
        tsCode += `        sections: [\n`;

        // Add passages as sections
        test.passages.forEach((passage: any, pIdx: number) => {
            const sectionId = `s${pIdx + 1}`;
            const passageContent = passage.content
                .replace(/\\/g, '\\\\')
                .replace(/`/g, '\\`')
                .replace(/\$/g, '\\$');

            tsCode += `            {\n`;
            tsCode += `                id: '${sectionId}',\n`;
            tsCode += `                title: '${passage.title.replace(/'/g, "\\'")}',\n`;
            tsCode += `                text: \`${passageContent}\`,\n`;
            tsCode += `                questions: [\n`;
            tsCode += `                    // TODO: Add questions for this passage\n`;
            tsCode += `                    // Answers available: ${test.answers.slice(pIdx * 13, (pIdx + 1) * 13).map((a: any) => a.answer).join(', ')}\n`;
            tsCode += `                ]\n`;
            tsCode += `            }${pIdx < test.passages.length - 1 ? ',' : ''}\n`;
        });

        tsCode += `        ]\n`;
        tsCode += `    }${idx < allTests.length - 1 ? ',' : ''}\n`;
    });

    tsCode += `];\n\n`;
    tsCode += `export function getReadingTestById(id: string): ReadingTest | undefined {\n`;
    tsCode += `    return readingTests.find(test => test.id === id);\n`;
    tsCode += `}\n\n`;
    tsCode += `export function getAllReadingTests(): ReadingTest[] {\n`;
    tsCode += `    return readingTests;\n`;
    tsCode += `}\n`;

    return tsCode;
}

// Main execution
const readingDir = path.join(__dirname, '..', 'reading');
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

console.log('\n' + '='.repeat(60));
console.log('📚 READING TEST JSON PARSER & GENERATOR');
console.log('='.repeat(60));

const allTests: any[] = [];

jsonFiles.forEach((file, index) => {
    const filePath = path.join(readingDir, file);
    if (fs.existsSync(filePath)) {
        const testData = parseReadingTest(filePath, index + 1);
        allTests.push(testData);
    } else {
        console.log(`❌ File not found: ${file}`);
    }
});

// Generate TypeScript code
console.log('\n' + '='.repeat(60));
console.log('📝 Generating TypeScript code...');
console.log('='.repeat(60));

const tsCode = generateTypeScriptCode(allTests);
const outputPath = path.join(__dirname, '..', 'data', 'reading-tests-generated.ts');

fs.writeFileSync(outputPath, tsCode, 'utf-8');

console.log(`\n✅ Generated file: ${outputPath}`);
console.log(`📊 Total tests: ${allTests.length}`);
console.log(`📄 File size: ${(tsCode.length / 1024).toFixed(2)} KB`);

console.log('\n' + '='.repeat(60));
console.log('✨ Generation complete!');
console.log('='.repeat(60));
console.log('\n💡 Next steps:');
console.log('   1. Review the generated file: data/reading-tests-generated.ts');
console.log('   2. Add questions manually or create a question parser');
console.log('   3. Replace data/reading-tests.ts with the generated content');
console.log('\n');
