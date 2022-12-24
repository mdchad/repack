import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useUser } from 'utils/useUser';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LogoBrand from '@/components/icons/LogoBrand';

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '/dashboard/settings' },
  { name: 'Sign out', href: '#' }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function Header({ navigation }: any) {
  const { user } = useUser();
  const router = useRouter();
  const [display, setDisplay] = useState<any>('');
  const [headerTheme, setHeaderTheme] = useState<any>([
    '#6b9997',
    '#6b9997',
    '#8ab8a8'
  ]);

  useEffect(() => {
    // check if url is /dashboard show Hi {user.name}, else show page title
    const URL = router.asPath;

    // get end of url
    const page = URL.split('/').pop() || '';

    // check if url is more than 2 /'s
    if (URL.split('/').length > 2) {
      // get page name without dash and param
      const pageName = page.split('-').join(' ').split('?')[0];

      setDisplay(pageName);
    } else {
      setDisplay(`Hi ${user?.user_metadata.full_name}!`);
    }
  }, [router]);

  return (
    <Disclosure as="div" className="relative overflow-hidden pb-32">
      {({ open }) => (
        <>
          <nav
            className={classNames(
              open ? 'bg-gray-800' : 'bg-transparent',
              'relative z-10 border-b border-gray-900 border-opacity-5 lg:border-none lg:bg-transparent'
            )}
          >
            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
              <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-gray-900 lg:border-opacity-5">
                <div className="flex items-center px-2 lg:px-0">
                  <div className="flex-shrink-0">
                    <LogoBrand />
                  </div>
                </div>

                <div className="hidden lg:flex flex-1 justify-center lg:justify-center">
                  <div className="flex gap-3">
                    {navigation.map((item: any) => (
                      <Link href={item.href} key={item.name}>
                        <a
                          key={item.name}
                          className={classNames(
                            item.current
                              ? 'bg-black bg-opacity-25'
                              : 'hover:bg-gray-700',
                            'rounded-md py-2 px-3 text-sm font-medium text-white'
                          )}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon
                        className="block h-6 w-6 flex-shrink-0"
                        aria-hidden="true"
                      />
                    ) : (
                      <Bars3Icon
                        className="block h-6 w-6 flex-shrink-0"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="hidden lg:ml-4 lg:block">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="flex-shrink-0 rounded-full p-1 text-gray-200 hover:bg-gray-700 hover:text-white focus:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-900"
                    >
                      <span className="sr-only">View notifications</span>
                      {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-4 flex-shrink-0">
                      <div>
                        <Menu.Button className="flex rounded-full text-sm text-white focus:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-900">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user?.user_metadata.avatar_url}
                            alt="avatar"
                            referrerPolicy="no-referrer"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link href={item.href}>
                                  <a
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block py-2 px-4 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="bg-gray-800 lg:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3 hidden">
                {navigation.map((item: any) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-black bg-opacity-25'
                        : 'hover:bg-gray-700',
                      'block rounded-md py-2 px-3 text-base font-medium text-white'
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-300 border-opacity-25 pt-4 pb-3">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user?.user_metadata.avatar_url}
                      alt="avatar"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {user?.user_metadata.full_name}
                    </div>
                    <div className="text-sm font-medium text-gray-200">
                      {user?.user_metadata.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full p-1 text-gray-200 hover:bg-gray-700 hover:text-white focus:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-900"
                  >
                    <span className="sr-only">View notifications</span>
                    {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                  </button>
                </div>
                <div className="mt-3 px-2">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md py-2 px-3 text-base font-medium text-gray-200 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </nav>

          <div
            aria-hidden="true"
            className={classNames(
              open ? 'bottom-0' : 'inset-y-0',
              'absolute inset-x-0 left-1/2 w-full -translate-x-1/2 transform overflow-hidden lg:inset-y-0'
            )}
          >
            <div className="absolute inset-0 flex">
              <div
                className="h-full w-1/2"
                style={{ backgroundColor: headerTheme[0] }}
              />
              <div
                className="h-full w-1/2"
                style={{ backgroundColor: headerTheme[1] }}
              />
            </div>

            <div className="relative flex justify-center">
              <svg
                className="flex-shrink-0"
                width={1750}
                height={308}
                viewBox="0 0 1750 308"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M284.161 308H1465.84L875.001 182.413 284.161 308z"
                  fill={headerTheme[2]}
                />
                <path
                  d="M1465.84 308L16.816 0H1750v308h-284.16z"
                  fill={headerTheme[1]}
                />
                <path
                  d="M1733.19 0L284.161 308H0V0h1733.19z"
                  fill={headerTheme[0]}
                />
                <path
                  d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z"
                  fill={headerTheme[2]}
                />
              </svg>
            </div>
          </div>

          <header className="relative py-5 lg:py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-white capitalize">
                {display}
              </h1>
            </div>
          </header>
        </>
      )}
    </Disclosure>
  );
}

export default Header;
