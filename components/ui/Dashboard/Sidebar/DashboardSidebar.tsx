import {
  CursorArrowRaysIcon,
  FolderIcon,
  SquaresPlusIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import LogoBrand from '@/components/icons/LogoBrand';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: SquaresPlusIcon,
    current: true
  },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Activity', href: '#', icon: CursorArrowRaysIcon, current: false }
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

function Sidebar(props: any) {
  return (
    <>
      <div className="flex flex-shrink-0 items-center px-4">
        <LogoBrand />
      </div>
      <div className="h-0 flex-1 overflow-y-auto p-5 flex flex-col justify-between">
        <nav className="space-y-1" id="top-section">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? 'bg-gray-100 text-gray-900 font-normal'
                  : 'text-gray hover:bg-gray-50 font-bold hover:text-gray-900',
                'group flex items-center px-2 py-2 text-base rounded-md font-thin hover:font-normal'
              )}
            >
              <item.icon
                className={classNames(
                  item.current
                    ? 'text-gray-900'
                    : 'text-gray group-hover:text-gray-900',
                  'mr-4 flex-shrink-0 h-6 w-6'
                )}
                aria-hidden="true"
              />
              {item.name}
            </a>
          ))}
        </nav>

        <div id="bottom-section">
          <div className="">
            <p className="mb-2 text-sm">Free plan</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-gray-600 h-2.5 rounded-full w-[45%]"></div>
            </div>
            <div className="flex justify-between mb-1">
              <span></span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                <strong>378</strong> of 1,500
              </span>
              {/* <span className="text-sm font-medium text-gray-900 dark:text-white">45%</span> */}
            </div>
          </div>

          <div
            id="dropdown-cta"
            className="p-4 mt-6 bg-gray-50 rounded-lg dark:bg-gray-900"
            role="alert"
          >
            <div className="flex items-center mb-3">
              <span className="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
                Update
              </span>
              <button
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-gray-50 text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-400 p-1 hover:bg-gray-200 inline-flex h-6 w-6 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
                data-collapse-toggle="dropdown-cta"
                aria-label="Close"
              >
                <span className="sr-only">Close</span>
                <svg
                  aria-hidden="true"
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <p className="mb-3 text-sm text-blue-900 dark:text-blue-400">
              Plan upgrade is here!
            </p>
            <a
              className="text-sm text-blue-900 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              href="#"
            >
              Upgrade now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
