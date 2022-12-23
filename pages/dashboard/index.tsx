import DashboardLayout from '@/components/Layout/DashboardLayout';
import Card from '@/components/ui/Dashboard/Card';
import { ArrowUpRightIcon, CloudIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { TYPE } from '@/utils/enums';
import Link from 'next/link';

const features = [
  {
    tab: 'branding',
    title: 'Startup name generator',
    description: 'Generate your own startup name.',
    href: 'name-generator'
  },
  {
    tab: 'branding',
    title: 'Color palette generator',
    description: 'Generate your own color palette.',
    href: 'color-generator'
  },
  {
    tab: 'branding',
    title: 'Font pairing generator',
    description: 'Generate your own font pairing.',
    href: 'font-generator'
  },
  {
    tab: 'branding',
    title: 'Brand guide generator',
    description: 'Generate your own startup brand guide.',
    href: 'brand-guide-generator'
  },
  {
    tab: 'website',
    title: 'Landing page copy',
    description:
      'Turn a title and an outline into a fully SEO-optimized and long article with this AI editor.'
  },
  {
    tab: 'blog',
    title: 'Article Generator',
    description:
      'Turn a title and an outline into a fully SEO-optimized and long article with this AI editor.'
  }
];

const tabs = [
  {
    name: TYPE.Branding,
    title: 'Branding',
    color: 'bg-white',
    description: 'Generate your own startup brand guide.'
  },
  {
    name: TYPE.Website,
    title: 'Website',
    color: 'bg-white',
    description:
      'Turn a title and an outline into a fully SEO-optimized and long article with this AI editor.'
  },
  {
    name: TYPE.Blog,
    title: 'Blog',
    color: 'bg-white',
    description:
      'Turn a title and an outline into a fully SEO-optimized and long article with this AI editor.'
  }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('branding');

  return (
    <div className="flex flex-col gap-10 p-8 h-full">
      <div className="hidden">
        <Card>
          <section className="flex flex-row flex-wrap">
            {/* <span className="text-2xl font-bold">Popular</span> */}
            {tabs.map((tab, index) => (
              <button
                onClick={() => setActiveTab(tab.name)}
                className={`block p-1 w-1/4 lg:w-1/6`}
                key={index}
              >
                <span
                  className={`p-3 rounded-lg hover:bg-gray-100 w-full ${tab.color}-500 flex flex-col items-center justify-center text-center gap-1 border h-6/6`}
                >
                  <CloudIcon className="w-8 h-8" />
                  <p className="text-sm">{tab.title}</p>
                </span>
              </button>
            ))}
          </section>
        </Card>

        <Card className="flex-1">
          <section className="flex flex-col gap-3">
            <span className="text-2xl font-bold">Popular</span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-x gap-4 m-1">
              {features.map((feature, index) => {
                if (feature.tab === activeTab) {
                  return (
                    <Link href={`/dashboard/${feature.href}`} key={index}>
                      <a className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 overflow-hidden ring-inset">
                        <span className="mb-3 text-md font-bold tracking-tight text-gray-900 dark:text-white flex flex-grow justify-between items-center">
                          {feature.title}
                          <ArrowUpRightIcon className="w-4 h-4" />
                        </span>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </a>
                    </Link>
                  );
                }
              })}
            </div>
          </section>
        </Card>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-3xl">Quicklinks</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            if (feature.tab === activeTab) {
              return (
                <Link href={`/dashboard/${feature.href}`} key={index}>
                  <a className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 overflow-hidden ring-inset">
                    <span className="mb-3 text-md font-bold tracking-tight text-gray-900 dark:text-white flex flex-grow justify-between items-center">
                      {feature.title}
                      <ArrowUpRightIcon className="w-4 h-4" />
                    </span>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </a>
                </Link>
              );
            }
          })}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-3xl">Activity</h2>

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  Product name
                </th>
                <th scope="col" className="py-3 px-6">
                  Color
                </th>
                <th scope="col" className="py-3 px-6">
                  Category
                </th>
                <th scope="col" className="py-3 px-6">
                  Price
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4 w-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro 17"
                </th>
                <td className="py-4 px-6">Sliver</td>
                <td className="py-4 px-6">Laptop</td>
                <td className="py-4 px-6">$2999</td>
                <td className="py-4 px-6">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4 w-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-2"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checkbox-table-search-2"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Microsoft Surface Pro
                </th>
                <td className="py-4 px-6">White</td>
                <td className="py-4 px-6">Laptop PC</td>
                <td className="py-4 px-6">$1999</td>
                <td className="py-4 px-6">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4 w-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-3"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checkbox-table-search-3"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic Mouse 2
                </th>
                <td className="py-4 px-6">Black</td>
                <td className="py-4 px-6">Accessories</td>
                <td className="py-4 px-6">$99</td>
                <td className="py-4 px-6">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4 w-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-3"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checkbox-table-search-3"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple Watch
                </th>
                <td className="py-4 px-6">Black</td>
                <td className="py-4 px-6">Watches</td>
                <td className="py-4 px-6">$199</td>
                <td className="py-4 px-6">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4 w-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-3"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checkbox-table-search-3"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple iMac
                </th>
                <td className="py-4 px-6">Silver</td>
                <td className="py-4 px-6">PC</td>
                <td className="py-4 px-6">$2999</td>
                <td className="py-4 px-6">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4 w-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-3"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checkbox-table-search-3"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple AirPods
                </th>
                <td className="py-4 px-6">White</td>
                <td className="py-4 px-6">Accessories</td>
                <td className="py-4 px-6">$399</td>
                <td className="py-4 px-6">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4 w-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-3"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checkbox-table-search-3"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  iPad Pro
                </th>
                <td className="py-4 px-6">Gold</td>
                <td className="py-4 px-6">Tablet</td>
                <td className="py-4 px-6">$699</td>
                <td className="py-4 px-6">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4 w-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-3"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checkbox-table-search-3"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic Keyboard
                </th>
                <td className="py-4 px-6">Black</td>
                <td className="py-4 px-6">Accessories</td>
                <td className="py-4 px-6">$99</td>
                <td className="py-4 px-6">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4 w-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-3"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checkbox-table-search-3"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Smart Folio iPad Air
                </th>
                <td className="py-4 px-6">Blue</td>
                <td className="py-4 px-6">Accessories</td>
                <td className="py-4 px-6">$79</td>
                <td className="py-4 px-6">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4 w-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-3"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checkbox-table-search-3"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  AirTag
                </th>
                <td className="py-4 px-6">Silver</td>
                <td className="py-4 px-6">Accessories</td>
                <td className="py-4 px-6">$29</td>
                <td className="py-4 px-6">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <nav
            className="flex justify-between items-center p-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                1-10
              </span>{' '}
              of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                1000
              </span>
            </span>
            <ul className="inline-flex items-center -space-x-px">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  ...
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  100
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>

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
