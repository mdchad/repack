import React from 'react'
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const pageTitle = 'SEO';

function Seo() {
    return (
        <section>
            <div className="flex gap-4 items-start">
                <div className="bg-gray border p-5 md:w-1/3 flex flex-col gap-4 rounded">
                    <div>
                        <cite className="text-lg not-italic font-bold">Startup Name Generator</cite>
                        <p>Generate cool, creative, and catchy names for your startup in seconds.</p>
                    </div>

                    <form className="flex flex-col gap-4">
                        <div className="">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seed words</label>
                            <input type="text" id="name" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="eg. fit, exercise, gym" required />
                        </div>

                        <div className="">
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                            <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Explain here to the AI what your product (or service) is about. Rewrite to get different results." required></textarea>
                        </div>

                        <div className="flex gap-2 items-center">
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                            <p className="text-gray-500 text-[.7em]">Each generate will cost a token</p>
                        </div>

                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Generate</button>
                    </form>

                </div>

                <div className="flex-1 bg-white border h-screen rounded p-5 gap-4 flex flex-col items-center">
                    <span className="block text-sm text-center text-gray-500">Generate results by filling up the form on the left and clicking on "Generate".</span>
                </div>
            </div>
        </section >
    )
}

export default Seo

Seo.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;