import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LoadingDots from '../LoadingDots';

const tabs = [
  { name: 'General', href: '/dashboard/settings', current: false },
  { name: 'Password', href: '/dashboard/settings/password', current: false },
  { name: 'Billing', href: '/dashboard/settings/billing', current: false },
  { name: 'Team Members', href: '/dashboard/settings/team', current: false }
];

function Navbar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pageName, setPageName] = useState('');

  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.href === router.pathname);
    tabs.forEach((tab) => (tab.current = false));

    if (currentTab) {
      currentTab.current = true;
      setLoading(true);
      setPageName(currentTab.name);
    } else {
      // set all tabs to false
      setLoading(true);
    }
  }, [router.pathname]);

  if (!loading) {
    return <LoadingDots />;
  } else {
    return (
      <div className="">
        <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg divide-x divide-gray-200 shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
          {/* load tabs after useeffect */}

          {tabs.map((tab) => (
            <li key={tab.name} className="w-full">
              <Link href={tab.href}>
                {tab.current ? (
                  <a className="inline-block p-4 w-full text-gray-900 bg-gray-100 rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white">
                    {tab.name}
                  </a>
                ) : (
                  <a className="inline-block p-4 w-full hover:text-gray-900 focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:hover:text-white">
                    {tab.name}
                  </a>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Navbar;
