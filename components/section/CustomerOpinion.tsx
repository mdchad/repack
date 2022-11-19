import Section from '../ui/Sections/Section'
import Card from '../ui/Card/Card'

const testimonials = [
    {
        name: 'Nick Johnson',
        title: 'Web Design',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        icon: 'nick'
    },
    {
        name: 'Nick Johnson',
        title: 'Designer',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        icon: 'nick'
    },
    {
        name: 'Nick Johnson',
        title: 'Web Design',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        icon: 'nick'
    },
];

function CustomerOpinion() {
    return (
        <Section id="testimonial">
            <div className="mx-auto max-w-6xl px-6 flex flex-start flex-col">
                <p className='text-[#F1887A] uppercase tracking-[.25em]'>Testimonial</p>
                <h1 className='text-left pb-[25px] md:text-[39px] text-[25px] dark:text-[#EBD9A1] text-[#293C4A]'>Hear from our customers</h1>

                <div className="grid gap-7 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {testimonials.map((testi, index) => (
                        <Card key={index}>
                            <div className="flex flex-col gap-3">
                                <div className='flex flex-row gap-3 items-center'>
                                    <img src={`/testimonials/${testi.icon}.png`} alt={testi.name} className='w-[50px] h-[50px]' />
                                    <div>
                                        <h3 className="text-[#F1887A] text-lg">{testi.name}</h3>
                                        <p className='text-[10px] text-[#293C4A] uppercase tracking-[.25em]'>{testi.title}</p>
                                    </div>
                                </div>
                                <p className='text-sm'>{testi.description}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </Section >
    )
}

export default CustomerOpinion;
