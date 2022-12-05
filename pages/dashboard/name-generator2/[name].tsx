import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { useRouter } from 'next/router';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';

const urls = [
    {
        title: '.com',
    },
    {
        title: '.io',
    },
    {
        title: '.co',
    },
    {
        title: '.app',
    },
    {
        title: '.tech',
    },
]

const social_urls = [
    {
        title: 'Twitter',
        icon: 'https://img.icons8.com/color/48/000000/twitter--v1.png',
        url: 'https://twitter.com/',
    },
    {
        title: 'Instagram',
        icon: 'https://img.icons8.com/color/48/000000/instagram-new--v1.png',
        url: 'https://www.instagram.com/',
    },
    {
        title: 'Facebook',
        icon: 'https://img.icons8.com/color/48/000000/facebook-new--v1.png',
        url: 'https://www.facebook.com/',
    },
    {
        title: 'LinkedIn',
        icon: 'https://img.icons8.com/color/48/000000/linkedin--v1.png',
        url: 'https://www.linkedin.com/',
    },
];

function Name() {
    const router = useRouter();
    const { name } = router.query;
    const [save, setSave] = useState(false);
    const supabase = useSupabaseClient();
    const user = useUser();

    async function saveName() {
        setSave(true);
        const duration = 2000;

        const newSave = {
            created_at: new Date().toISOString(),
            type: 'branding',
            value: name,
            user_id: user?.id
        };

        let { error } = await supabase.from('favourites').insert(newSave);

        if (error) {
            console.log(error)
            toast.error('Fail to save', {
                position: 'top-right',
                autoClose: duration,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: 'light'
            });
        } else {
            toast.success('Added to saved', {
                position: 'top-right',
                autoClose: duration,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: 'light'
            });
        }

    }

    return (
        <section className="h-[calc(100vh-50px)] md:h-screen overflow-y-scroll">
            <div className="p-5 flex flex-col gap-3 flex-wrap">

                <div className="bg-white overflow-hidden rounded-lg w-full">
                    <div className="p-5">
                        <div className="border-b border-gray-200 pb-5 flex items-center justify-between">
                            <p className="text-lg font-medium leading-6 text-gray-900">{name}</p>
                            <div className="flex sm:mt-0 sm:ml-4">
                                <button
                                    type="button"
                                    onClick={() => saveName()}
                                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    {save ? (
                                        <HeartSolidIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                                    ) : (
                                        <HeartIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                                    )}
                                    Save
                                </button>
                            </div>
                        </div>

                        <div className="py-5">
                            <p className="text-sm text-gray-500 pb-5">Default TLDs</p>
                            <ul className="list-none grid grid-cols-2 md:grid-cols-5 gap-3">
                                {urls.map((url, index) => (
                                    <li key={index} className="p-3 grid place-content-center uppercase">
                                        <Link href={`https://www.namecheap.com/domains/whois/result?domain=${name}${url.title}`}>
                                            <a className='flex flex-col text-center hover:text-[#F38A7A]'>
                                                {url.title}
                                                <span className="text-sm text-gray-400">WHOIS</span>
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="columns-1 lg:columns-2">
                    <div className="bg-white overflow-hidden rounded-lg p-5 mb-3">
                        <p className="text-sm text-gray-500 pb-5">Social Networks</p>
                        {social_urls.map((social, index) => (
                            <div key={index} className="flex items-center py-3">
                                <img src={social.icon} className="h-6 w-6 mr-3" />
                                <Link href="#">
                                    <a>
                                        {social.url}{name}
                                    </a>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white overflow-hidden rounded-lg p-5 mb-3">
                        <p className="text-sm text-gray-500 pb-5">Social Networks</p>
                        {social_urls.map((social, index) => (
                            <div key={index} className="flex items-center py-3">
                                <img src={social.icon} className="h-6 w-6 mr-3" />
                                <Link href="#">
                                    <a>
                                        {social.url}{name}
                                    </a>
                                </Link>
                            </div>
                        ))}
                        {social_urls.map((social, index) => (
                            <div key={index} className="flex items-center py-3">
                                <img src={social.icon} className="h-6 w-6 mr-3" />
                                <Link href="#">
                                    <a>
                                        {social.url}{name}
                                    </a>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white overflow-hidden rounded-lg p-5 mb-3">
                        <p className="text-sm text-gray-500 pb-5">Social Networks</p>
                        {social_urls.map((social, index) => (
                            <div key={index} className="flex items-center py-3">
                                <img src={social.icon} className="h-6 w-6 mr-3" />
                                <Link href="#">
                                    <a>
                                        {social.url}{name}
                                    </a>
                                </Link>
                            </div>
                        ))}
                        {social_urls.map((social, index) => (
                            <div key={index} className="flex items-center py-3">
                                <img src={social.icon} className="h-6 w-6 mr-3" />
                                <Link href="#">
                                    <a>
                                        {social.url}{name}
                                    </a>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Name;

Name.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
