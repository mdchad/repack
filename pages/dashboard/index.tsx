import DashboardLayout from '@/components/Layout/DashboardLayout';
import Card from '@/components/ui/Dashboard/Card';
import { ArrowUpRightIcon, CloudIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Tabs } from '@/utils/enums';

const features = [
    {
        tab: 'branding',
        title: 'Startup name generator',
        description: 'Generate cool, creative, and catchy names for your startup in seconds.',
        href: '/name-generator'
    },
    {
        tab: 'branding',
        title: 'Startup name generator v2',
        description: 'Generate your own startup brand guide.',
        href: '/name-generator2'
    },
    {
        tab: 'website',
        title: 'Landing page copy',
        description: 'Turn a title and an outline into a fully SEO-optimized and long article with this AI editor.'
    },
    {
        tab: 'branding',
        title: 'Article Generator',
        description: 'Turn a title and an outline into a fully SEO-optimized and long article with this AI editor.'
    },
    {
        tab: 'blog',
        title: 'Article Generator',
        description: 'Turn a title and an outline into a fully SEO-optimized and long article with this AI editor.'
    }
];

const tabs = [
    {
        name: Tabs.Branding,
        title: 'Branding',
        color: 'bg-white',
        description: 'Generate your own startup brand guide.',
    },
    {
        name: Tabs.Website,
        title: 'Website',
        color: 'bg-white',
        description: 'Turn a title and an outline into a fully SEO-optimized and long article with this AI editor.'
    },
    {
        name: Tabs.Blog,
        title: 'Blog',
        color: 'bg-white',
        description: 'Turn a title and an outline into a fully SEO-optimized and long article with this AI editor.'
    },
];

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('branding');

    return (
        <div className="flex flex-col gap-5 p-5 h-full">
            <Card>
                <section className="flex flex-row flex-wrap">
                    {/* <span className="text-2xl font-bold">Popular</span> */}
                    {tabs.map((tab) => (
                        <button onClick={() => setActiveTab(tab.name)} className={`block p-1 w-1/4 lg:w-1/6`}>
                            <span className={`p-3 rounded-lg hover:bg-gray-100 w-full ${tab.color}-500 flex flex-col items-center justify-center text-center gap-1 border h-6/6`}>
                                <CloudIcon className="w-8 h-8" />
                                <p className="text-sm">{tab.title}</p>
                            </span>
                        </button>
                    ))}
                </section>
            </Card>

            <Card className="h-full grow">
                <section className="flex flex-col gap-3">
                    <span className="text-2xl font-bold">Popular</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-x gap-4 m-1">
                        {features.map((feature) => {
                            if (feature.tab === activeTab) {
                                return (
                                    <a
                                        href={`/dashboard/${feature.href}`}
                                        className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 overflow-hidden ring-inset"
                                    >
                                        <span className="mb-3 text-md font-bold tracking-tight text-gray-900 dark:text-white flex flex-grow justify-between items-center">
                                            {feature.title}
                                            <ArrowUpRightIcon className="w-4 h-4" />
                                        </span>
                                        <p className="font-normal text-gray-700 dark:text-gray-400">
                                            {feature.description}
                                        </p>
                                    </a>
                                );
                            }
                        })}
                    </div>
                </section>
            </Card>

            {/* <Card>
                <section className="flex flex-col gap-2 mb-8">
                    <span className="text-2xl font-bold">Try something new today?</span>
                    <p className="text-sm">
                        Get started by selecting the content type from the options below
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-x gap-4 m-1">
                        <a
                            href="#"
                            className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 overflow-hidden ring-inset"
                        >
                            <span className="mb-3 text-md font-bold tracking-tight text-gray-900 dark:text-white flex flex-grow justify-between items-center">
                                Article Generator
                                <ArrowUpRightIcon className="w-4 h-4" />
                            </span>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Turn a title and an outline into a fully SEO-optimized and long
                                article with this AI editor.
                            </p>
                        </a>

                        <a
                            href="#"
                            className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 overflow-hidden ring-inset"
                        >
                            <span className="mb-3 text-md font-bold tracking-tight text-gray-900 dark:text-white flex flex-grow justify-between items-center">
                                Article Generator
                                <ArrowUpRightIcon className="w-4 h-4" />
                            </span>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Turn a title and an outline into a fully SEO-optimized and long
                                article with this AI editor.
                            </p>
                        </a>

                        <a
                            href="#"
                            className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 overflow-hidden ring-inset"
                        >
                            <span className="mb-3 text-md font-bold tracking-tight text-gray-900 dark:text-white flex flex-grow justify-between items-center">
                                Article Generator
                                <ArrowUpRightIcon className="w-4 h-4" />
                            </span>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Turn a title and an outline into a fully SEO-optimized and long
                                article with this AI editor.
                            </p>
                        </a>

                        <a
                            href="#"
                            className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 overflow-hidden ring-inset"
                        >
                            <span className="mb-3 text-md font-bold tracking-tight text-gray-900 dark:text-white flex flex-grow justify-between items-center">
                                Article Generator
                                <ArrowUpRightIcon className="w-4 h-4" />
                            </span>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Turn a title and an outline into a fully SEO-optimized and long
                                article with this AI editor.
                            </p>
                        </a>
                    </div>
                </section>
            </Card> */}
        </div>
    );
}

Dashboard.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
