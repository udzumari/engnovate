// Reading Test Data - Cambridge IELTS 16 Tests

export interface ReadingQuestion {
    id: string
    type: 'multiple_choice' | 'true_false' | 'matching' | 'fill_blank' | 'short_answer'
    text: string
    options?: string[]
    correctAnswer: string
    explanation: string
    explanationUz?: string // Uzbek explanation
    answerLocation?: string // Text snippet from passage where answer is found
}

export interface ReadingSection {
    id: string
    title: string
    text: string
    questions: ReadingQuestion[]
}

export interface ReadingTest {
    id: string
    title: string
    type: 'Reading'
    duration: number
    sections: ReadingSection[]
}

export const readingTests: ReadingTest[] = [
    {
        id: 'reading-16',
        title: 'Cambridge 16 Academic Reading Test 01',
        type: 'Reading',
        duration: 60 * 60,
        sections: [
            {
                id: 's1',
                title: 'Passage 1: Why we need to protect polar bears',
                text: `
          <h2>Why we need to protect polar bears</h2>
          <p>Polar bears are being increasingly threatened by the effects of climate change, but their disappearance could have far-reaching consequences. They are uniquely adapted to the extreme conditions of the Arctic Circle, where temperatures can reach -40°C. One reason for this is that they have up to 11 centimetres of fat underneath their skin. Humans with comparative levels of adipose tissue would be considered obese and would be likely to suffer from diabetes and heart disease. Yet the polar bear experiences no such consequences.</p>
          
          <p>A 2014 study by Shi Ping Liu and colleagues sheds light on this mystery. They compared the genetic structure of polar bears with that of their closest relatives from a warmer climate, the brown bears. This allowed them to determine the genes that have allowed polar bears to survive in one of the toughest environments on Earth. Liu and his colleagues found the polar bears had a gene known as APoB, which reduces levels of low-density lipoproteins (LDLs) – a form of 'bad' cholesterol. In humans, mutations of this gene are associated with increased risk of heart disease. Polar bears may therefore be an important study model to understand heart disease in humans.</p>
          
          <p>The genome of the polar bear may also provide the solution for another condition, one that particularly affects our older generation: osteoporosis. This is a disease where bones show reduced density, usually caused by insufficient exercise, reduced calcium intake or food starvation. Bone tissue is constantly being remodelled, meaning that bone is added or removed, depending on nutrient availability and the stress that the bone is under. Female polar bears, however, undergo extreme conditions during every pregnancy. Once autumn comes around, these females will dig maternity dens in the snow and will remain there throughout the winter, both before and after the birth of their cubs. This process results in about six months of fasting, where the female bears have to keep themselves and their cubs alive, depleting their own calcium and calorie reserves. Despite this, their bones remain strong and dense.</p>
          
          <p>Physiologists Alanda Lennox and Allen Goodship found an explanation for this paradox in 2008. They discovered that pregnant bears were able to increase the density of their bones before they started to build their dens. In addition, six months later, when they finally emerged from the den with their cubs, there was no evidence of significant loss of bone density. Hibernating brown bears do not have this capacity and must therefore resort to major bone reformation in the following spring. If the mechanism of bone remodelling in polar bears can be understood, many bedridden humans, and even astronauts, could potentially benefit.</p>
        `,
                questions: [
                    {
                        id: 'q1',
                        type: 'true_false',
                        text: 'Polar bears suffer from various health problems due to the build-up of fat under their skin.',
                        options: ['True', 'False', 'Not Given'],
                        correctAnswer: 'False',
                        explanation: 'The passage states that polar bears have up to 11 centimetres of fat but "experience no such consequences" unlike humans who would suffer from diabetes and heart disease with similar fat levels.',
                        explanationUz: 'Matnda aytilishicha, qutb ayiqlarida 11 santimetrgacha yog\' bor, lekin ular "bunday oqibatlarga duchor bo\'lmaydi", insonlar esa shunga o\'xshash yog\' miqdorida diabet va yurak kasalliklaridan aziyat chekishadi.',
                        answerLocation: 'Yet the polar bear experiences no such consequences'
                    },
                    {
                        id: 'q2',
                        type: 'true_false',
                        text: 'The study done by Liu and his colleagues compared different groups of polar bears.',
                        options: ['True', 'False', 'Not Given'],
                        correctAnswer: 'False',
                        explanation: 'The study compared polar bears with brown bears, not different groups of polar bears. The passage states "They compared the genetic structure of polar bears with that of their closest relatives from a warmer climate, the brown bears."',
                        explanationUz: 'Tadqiqot qutb ayiqlarini jigarrang ayiqlar bilan solishtirgan, turli qutb ayiqlari guruhlarini emas. Matnda aytilishicha: "Ular qutb ayiqlarining genetik tuzilishini issiqroq iqlimdan kelgan eng yaqin qarindoshlari - jigarrang ayiqlarniki bilan solishtirishgan."',
                        answerLocation: 'They compared the genetic structure of polar bears with that of their closest relatives from a warmer climate, the brown bears'
                    },
                    {
                        id: 'q3',
                        type: 'true_false',
                        text: 'Liu and colleagues were the first researchers to compare polar bears and brown bears genetically.',
                        options: ['True', 'False', 'Not Given'],
                        correctAnswer: 'Not Given',
                        explanation: 'The passage does not mention whether Liu and colleagues were the first to do this type of genetic comparison. This information is not provided in the text.',
                        explanationUz: 'Matnda Liu va hamkasblar bunday genetik taqqoslashni birinchi bo\'lib amalga oshirganmi yoki yo\'qmi haqida ma\'lumot berilmagan. Bu ma\'lumot matnda yo\'q.'
                    },
                    {
                        id: 'q4',
                        type: 'true_false',
                        text: 'Polar bears are able to control their levels of bad cholesterol by genetic means.',
                        options: ['True', 'False', 'Not Given'],
                        correctAnswer: 'True',
                        explanation: 'The passage states that polar bears have the APoB gene "which reduces levels of low-density lipoproteins (LDLs) – a form of \'bad\' cholesterol." This is a genetic mechanism for controlling cholesterol.',
                        explanationUz: 'Matnda aytilishicha, qutb ayiqlarida APoB geni bor, bu gen "past zichlikdagi lipoproteinlar (LDL) darajasini kamaytiradi - bu \'yomon\' xolesterin turi." Bu xolesterinni nazorat qilishning genetik mexanizmidir.',
                        answerLocation: 'polar bears had a gene known as APoB, which reduces levels of low-density lipoproteins (LDLs)'
                    },
                    {
                        id: 'q5',
                        type: 'true_false',
                        text: 'Female polar bears are able to survive for about six months without food.',
                        options: ['True', 'False', 'Not Given'],
                        correctAnswer: 'True',
                        explanation: 'The passage clearly states "This process results in about six months of fasting, where the female bears have to keep themselves and their cubs alive."',
                        explanationUz: 'Matnda aniq aytilgan: "Bu jarayon taxminan olti oylik ro\'zaga olib keladi, bu vaqt ichida urg\'ochi ayiqlar o\'zlarini va bolalarini tirik saqlashlari kerak."',
                        answerLocation: 'This process results in about six months of fasting'
                    },
                    {
                        id: 'q6',
                        type: 'true_false',
                        text: 'It was found that the bones of female polar bears were very weak when they came out of their dens in spring.',
                        options: ['True', 'False', 'Not Given'],
                        correctAnswer: 'False',
                        explanation: 'The passage states the opposite: "when they finally emerged from the den with their cubs, there was no evidence of significant loss of bone density." Their bones remained strong.',
                        explanationUz: 'Matnda buning aksi aytilgan: "ular nihoyat bolalari bilan uyadan chiqqanlarida, suyak zichligining sezilarli darajada kamayishi haqida hech qanday dalil topilmadi." Ularning suyaklari kuchli bo\'lib qolgan.',
                        answerLocation: 'there was no evidence of significant loss of bone density'
                    },
                    {
                        id: 'q7',
                        type: 'true_false',
                        text: "The polar bear's mechanism for increasing bone density could also be used by people one day.",
                        options: ['True', 'False', 'Not Given'],
                        correctAnswer: 'True',
                        explanation: 'The passage concludes that "If the mechanism of bone remodelling in polar bears can be understood, many bedridden humans, and even astronauts, could potentially benefit."',
                        explanationUz: 'Matnning xulosasida aytilishicha: "Agar qutb ayiqlaridagi suyak qayta tiklanish mexanizmi tushunilsa, ko\'plab yotoqqa bog\'langan odamlar va hatto astronavtlar bundan foyda ko\'rishlari mumkin."',
                        answerLocation: 'many bedridden humans, and even astronauts, could potentially benefit'
                    }
                ]
            }
        ]
    }
]

export function getReadingTestById(id: string): ReadingTest | undefined {
    return readingTests.find(test => test.id === id)
}

export function getAllReadingTests(): ReadingTest[] {
    return readingTests
}
