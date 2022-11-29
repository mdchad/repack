import DashboardLayout from '@/components/Layout/DashboardLayout';
import { ArrowUpRightIcon, CloudIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-10">
      {/* <div className="border-solid border-[1px] rounded p-5"> */}
      <section className="flex flex-col gap-3">
        {/* <span className="text-2xl font-bold">Popular</span> */}
        <div className="flex flex-row gap-4">
          <a
            href="dashboard/name-generator"
            className="block p-3 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 overflow-hidden w-28"
          >
            <span className="flex flex-col items-center justify-center text-center gap-2">
              <CloudIcon className="w-8 h-8" />
              <p className="text-sm">Name Generator</p>
            </span>
          </a>
          <a
            href="#"
            className="block p-3 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 overflow-hidden w-28"
          >
            <span className="flex flex-col items-center justify-center text-center gap-2">
              <CloudIcon className="w-8 h-8" />
              <p className="text-sm">Blog</p>
            </span>
          </a>
          <a
            href="#"
            className="block p-3 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 overflow-hidden w-28"
          >
            <span className="flex flex-col items-center justify-center text-center gap-2">
              <CloudIcon className="w-8 h-8" />
              <p className="text-sm">Ads</p>
            </span>
          </a>
        </div>
      </section>
      {/* </div> */}

      <section className="flex flex-col gap-3">
        <span className="text-2xl font-bold">Popular</span>
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
    </div>
  );
}

Dashboard.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
