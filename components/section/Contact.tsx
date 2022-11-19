import Section from '@/components/ui/section/Section'
import Card from '@/components/ui/Card/Card'

function Contact() {
    return (
        <Section id="contact">
            <Card>
                <div className='h-96 w-full flex flex-col items-start justify-center'>
                    <h1 className="text-3xl font-bold text-gray-900">Contact</h1>
                </div>
            </Card>
        </Section>
    )
}

export default Contact