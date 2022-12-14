import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { SUBTYPE, TYPE } from '@/utils/enums';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { ArrowUpRightIcon, CloudIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import { splitHashURL } from '@/utils/helpers';

const tabs = [
    { name: TYPE.Branding },
    { name: TYPE.Website },
    { name: TYPE.Blog }
];

function urlType(subtype: any, queryParams: any): any {
    if (subtype === SUBTYPE.Colour) {
        queryParams = splitHashURL(queryParams)
    }
    // @ts-ignore
    return {
        [SUBTYPE.Name]: `name-generator/${queryParams}`,
        [SUBTYPE.Colour]: `color-generator?colors=${queryParams}`,
        [SUBTYPE.Font]: 'font-generator'
    }[subtype]
}

function capitalizeFirstLetter(string: any) {
    return string[0].toUpperCase() + string.slice(1);
}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

function Saved() {
    const [currentTab, setCurrentTab] = useState('branding');
    const [saved, setSaved] = useState<any[] | null>(null);
    const supabase = useSupabaseClient();
    const user = useUser();

    useEffect(() => {
        getSaved();
    }, []);

    async function getSaved() {
        let { data: favourites, error } = await supabase
            .from('favourites')
            .select('*')
            .order('created_at', { ascending: false })
            .eq('user_id', user?.id);
        setSaved(favourites);
    }

    // console.log(saved)
    return (
        <div className="flex flex-col gap-5 p-5 h-full">
            <div className="hidden sm:block">
                <nav className="flex overflow-hidden rounded" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setCurrentTab(tab.name)}
                            className={classNames(
                                currentTab === tab.name
                                    ? 'bg-[#F38A7A]/10 text-[#F38A7A]'
                                    : 'text-gray-500 hover:text-gray-700',
                                'inline-block p-4 w-full bg-white border-r last:border-0 focus:outline-none dark:bg-gray-700 dark:text-white hover:bg-[#F38A7A]/10 hover:text-[#F38A7A]'
                            )}
                            aria-current={currentTab ? 'page' : undefined}
                        >
                            {capitalizeFirstLetter(tab.name)}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 capitalize"
                    defaultValue={currentTab}
                    onChange={(e) => setCurrentTab(e.target.value)}
                >
                    {tabs.map((tab) => (
                        <option key={tab.name} value={tab.name}>{tab.name}</option>
                    ))}
                </select>
            </div>

            <div className="bg-white overflow-y-scroll rounded-lg p-5 h-screen flex flex-col gap-3">
                <div className="content">
                    <ul className='grid md:grid-cols-2 gap-2'>
                        {saved?.map((saveContent: any, id) => {
                            if (saveContent.type === currentTab) {
                                return <li key={id}>
                                    <Link href={`/dashboard/${urlType(saveContent.subtype, saveContent.saved.value)}`}>
                                        <a className="border rounded-lg p-5 flex justify-between items-center hover:bg-[#F38A7A]/10 hover:border-[#F38A7A]" target="_blank">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-lg font-semibold">{saveContent.saved.value}</span>
                                                <p className="text-sm text-gray-500">{moment(saveContent.created_at).fromNow()}</p>
                                            </div>
                                            <ArrowUpRightIcon className="w-4 h-4" />
                                        </a>
                                    </Link>
                                </li>;
                            }
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Saved;

Saved.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
