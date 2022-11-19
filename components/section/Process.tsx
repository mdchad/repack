import React from 'react'
import Section from '../ui/Section/Section'
import Card from '../ui/Card/Card'

const services = [
    {
        title: 'Web Design',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['Design', 'ui/ux'],
        icon: 'web-design'
    },
    {
        title: 'Web Development',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['UI/UX', 'Frontend', 'Backend'],
        icon: 'web-development'
    },
    {
        title: 'Mobile App',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['UI/UX', 'Frontend', 'Backend'],
        icon: 'mobile-app'
    },
    {
        title: 'Branding',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['Branding', 'UI/UX'],
        icon: 'branding'
    },
    {
        title: 'SEO',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['Seo', 'Analytics', 'Marketing'],
        icon: 'seo'
    },
];


function Process() {
    return (
        <Section>
            <div className="mx-auto max-w-6xl px-6 flex flex-start flex-col gap-8">
                {/* <p className='text-[#F1887A] uppercase tracking-[.25em]'>Features</p>
                <h1 className='text-left pb-[25px] md:text-[39px] text-[25px] dark:text-[#EBD9A1] text-[#293C4A]'>Why repack?</h1> */}

                <div className="flex flex-col flex-wrap gap-4">
                    <div className='flex gap-4'>
                        <div className='w-1/2'>
                            <Card>
                                1
                            </Card>
                        </div>
                        <div className='w-1/2'>
                            <Card>
                                2
                            </Card>
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <div className='w-2/5'>
                            <Card>
                                1
                            </Card>
                        </div>
                        <div className='w-3/5'>
                            <Card>
                                2
                            </Card>
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <div className='w-2/3'>
                            <Card>
                                1
                            </Card>
                        </div>
                        <div className='w-1/3'>
                            <Card>
                                2
                            </Card>
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <a href="#" className="bg-[#0E1714] text-white py-3 px-6 rounded-md font-bold">
                            Get Started
                        </a>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default Process