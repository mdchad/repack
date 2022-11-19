import Section from '../ui/Section/Section'
import Card from '../ui/Card/Card'
import Tags from '../ui/Tags/Tags'

const services = [
    {
        title: 'Social Media',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['Design', 'ui/ux'],
        icon: 'web-design'
    },
    {
        title: 'Brand Guide',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['UI/UX', 'Frontend', 'Backend'],
        icon: 'web-development'
    },
    {
        title: 'SEO',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['UI/UX', 'Frontend', 'Backend'],
        icon: 'mobile-app'
    },
    {
        title: 'Website Builder',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['Branding', 'UI/UX'],
        icon: 'branding'
    },
    {
        title: 'Advertising',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['Seo', 'Analytics', 'Marketing'],
        icon: 'seo'
    },
    {
        title: 'Marketing',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['Seo', 'Analytics', 'Marketing'],
        icon: 'seo'
    },
];

function Services() {
    return (
        <Section id="services">
            <div className="mx-auto max-w-6xl px-6 flex flex-start flex-col">
                <p className='text-[#F1887A] uppercase tracking-[.25em]'>Features</p>
                <h1 className='text-left pb-[25px] md:text-[39px] text-[25px] dark:text-[#EBD9A1] text-[#293C4A]'>Why repack?</h1>

                <div className="grid gap-7 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {services.map((service, index) => (
                        <Card key={index}>
                            <div className='text-center flex items-center flex-col'>
                                {/* <div className="bg-[#293C4A] dark:bg-[#fff] rounded mb-3">
                                    <img src={`/icons/${service.icon}.png`} alt={service.title} className='w-[50px] h-[50px] m-auto dark:invert' />
                                </div> */}
                                <img src={`/icons/${service.icon}.png`} alt={service.title} className='w-[50px] h-[50px] m-auto invert dark:invert-0' />
                                <h3 className="text-[#F1887A] text-lg pb-3">{service.title}</h3>
                                <p className='text-sm'>{service.description}</p>
                            </div>

                            <div className="flex flex-wrap gap-1">
                                {service.tags.map((tag, index) => (
                                    <Tags key={index}>
                                        {tag}
                                    </Tags>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </Section >
    )
}

export default Services