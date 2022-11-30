import {
  CursorArrowRaysIcon,
  FolderIcon,
  SquaresPlusIcon,
  UsersIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import LogoBrand from '@/components/icons/LogoBrand';
import Link from 'next/link';
import { useState } from 'react';
import SidebarProfile from './SidebarProfile';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SidebarProfile from './SidebarProfile';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: SquaresPlusIcon,
    current: true
  },
  { name: 'Saved', href: '/dashboard/saved', icon: FolderIcon, current: false },
  { name: 'Team', href: '/dashboard/team', icon: UsersIcon, current: false },
  {
    name: 'Activity',
    href: '/dashboard/activity',
    icon: CursorArrowRaysIcon,
    current: false
  }
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

function updateNotification(status: boolean) {
  // hide notification
  if (!status) {
    document.getElementById('dropdown-cta')!.classList.add('hidden');
  }
}

function Sidebar(props: any) {
    const [currentTab, setCurrentTab] = useState('Dashboard');

    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const userNavigation = [
        {
            name: 'Sign out',
            icon: ArrowRightOnRectangleIcon,
            onClickEvent: async () => {
                await supabaseClient.auth.signOut();
                await router.push('/signin');
            }
        }
    ];

    return (
        <>
            <div className="flex flex-shrink-0 items-center px-4">
                <LogoBrand />
            </div>

            <div className="h-0 flex-1 overflow-y-auto p-5 flex flex-col justify-between">
                <div id="top-section" className="flex flex-col gap-4">
                    <SidebarProfile user={props.user} />

                    <nav className="flex flex-col gap-4" >
                        {navigation.map((item, index) => (
                            <Link key={index}
                                href={item.href}
                            >
                                <a
                                    className={classNames(
                                      currentTab === item.name
                                            ? 'bg-gray-100 text-gray-900 font-normal'
                                            : 'text-gray hover:bg-gray-50 font-bold hover:text-gray-900',
                                        'group flex items-center px-2 py-2 text-base rounded-md font-thin hover:font-normal'
                                    )}
                                >
                                    <item.icon
                                        className={classNames(
                                          currentTab === item.name
                                                ? 'text-gray-900'
                                                : 'text-gray group-hover:text-gray-900',
                                            'mr-4 flex-shrink-0 h-6 w-6'
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </a>
                            </Link>
                        ))}
                    </nav>
                </div>

                <div id="bottom-section">

                    <div className="flex flex-shrink-0 border-t border-gray-200 pt-3">
                        {/* bottom content */}
                        {userNavigation.map((item) => (
                            <div key={item.name} className="w-full">
                                <button
                                    onClick={item.onClickEvent}
                                    className={classNames('w-full text-left px-4 py-2 text-sm text-gray-700 flex gap-3 items-center')}
                                >
                                    <item.icon className="w-6 h-6"/>
                                    {item.name}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div id="dropdown-cta" className="p-4 mt-6 bg-gray-50 rounded-lg dark:bg-gray-900 transition-all" role="alert">
                        <div className="flex items-center mb-3">
                            <span className="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">Update</span>
                            <button onClick={() => updateNotification(false)} type="button" id="updateNotification" className="ml-auto -mx-1.5 -my-1.5 bg-gray-50 text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-400 p-1 hover:bg-gray-200 inline-flex h-6 w-6 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800" data-collapse-toggle="dropdown-cta" aria-label="Close">
                                <span className="sr-only">Close</span>
                                <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>
                        <p className="mb-3 text-sm text-blue-900 dark:text-blue-400">
                            Plan upgrade is here!
                        </p>
                        <a className="text-sm text-blue-900 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" href="#">Upgrade now</a>
                    </div>

                </div>


            </div>
        </>
    )
}

export default Sidebar;
