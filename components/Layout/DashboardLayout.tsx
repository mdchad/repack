import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
    Bars3Icon,
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/router';

import DashboardSideBar from '@/components/ui/Dashboard/Sidebar/DashboardSidebar';
import { useUser } from '@/utils/useUser';
import { ToastContainer, toast } from 'react-toastify';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
    { name: 'Team', href: '#', icon: UsersIcon, current: false },
    { name: 'Projects', href: '#', icon: FolderIcon, current: false },
    { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    { name: 'Documents', href: '#', icon: InboxIcon, current: false },
    { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
]


export default function DashboardLayout({ children }: any) {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { session, error } = useSessionContext();
  const { user, isLoading, subscription } = useUser();

  const userNavigation = [
    // { name: 'Your Profile', href: '#' },
    {
      name: 'Settings',
      onClickEvent: async () => {
        await router.push('/dashboard/settings');
      }
    },
    {
      name: 'Sign out',
      onClickEvent: async () => {
        await supabaseClient.auth.signOut();
        await router.push('/signin');
      }
    }
  ];

    if (session) {
        return (
            <>
                {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
                <div>
                    <Transition.Root show={sidebarOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
                            <Transition.Child
                                as={Fragment}
                                enter="transition-opacity ease-linear duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity ease-linear duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                            </Transition.Child>

                            <div className="fixed inset-0 z-40 flex">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transition ease-in-out duration-300 transform"
                                    enterFrom="-translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transition ease-in-out duration-300 transform"
                                    leaveFrom="translate-x-0"
                                    leaveTo="-translate-x-full"
                                >
                                    <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-in-out duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-300"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="absolute top-0 right-0 -mr-12 pt-2">
                                                <button
                                                    type="button"
                                                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    <span className="sr-only">Close sidebar</span>
                                                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </Transition.Child>

                                        {/* Static sidebar for mobile */}
                                        <DashboardSideBar user={user} />

                                    </Dialog.Panel>
                                </Transition.Child>
                                <div className="w-14 flex-shrink-0">{/* Force sidebar to shrink to fit close icon */}</div>
                            </div>
                        </Dialog>
                    </Transition.Root>

                    {/* Static sidebar for desktop */}
                    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
                        <DashboardSideBar user={user} />
                    </div>

                    <div className="flex flex-1 flex-col md:pl-64">
                        <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
                            <button
                                type="button"
                                className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <main className="flex-1">
                            <div className="m-5 p-5 bg-[#FAFBFC] rounded-t-lg">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </>
        );
    } else {
        return <p>You are not signed in</p>;
    }
}
