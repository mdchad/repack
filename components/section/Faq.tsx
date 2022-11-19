import Section from '../ui/Sections/Section'
import Card from '../ui/Card/Card'

const questions = [
    {
        question: 'What makes you different?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
        question: 'What makes you different?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
        question: 'What makes you different?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
        question: 'What makes you different?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
        question: 'What makes you different?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
        question: 'What makes you different?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
];

function Faq() {
    return (
        <Section id="questions">
            <div className="mx-auto max-w-6xl px-6 flex flex-start flex-col">
                <p className='text-[#F1887A] uppercase tracking-[.25em]'>FAQ</p>
                <h1 className='text-left pb-[25px] md:text-[39px] text-[25px] dark:text-[#EBD9A1] text-[#293C4A]'>fret not!</h1>

                <div className="grid gap-7 grid-cols-1 md:grid-cols-2">
                    {questions.map((question, index) => (
                        <Card key={index}>
                            <div className='text-center flex items-center flex-col'>
                                <h3 className="text-[#F1887A] text-lg pb-3">{question.question}</h3>
                                <p className='text-sm'>{question.answer}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </Section >
    )
}

export default Faq;
