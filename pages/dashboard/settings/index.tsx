import DashboardLayout from '@/components/Layout/DashboardLayout';
import SettingNavBar from '@/components/ui/Setting/Navbar';
import { useRouter } from 'next/router';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function settings() {
    const router = useRouter();
    const pageName = 'Settings';
    console.log(router);

    return (
        <section className="md:w-2/3 flex flex-col gap-4">

            <div className="">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">{pageName}</h1>
            </div>

            <SettingNavBar />

            <div className="bg-gray border p-5 w-full rounded-lg overflow-hidden">
                <form>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                            <input type="text" id="full_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                        </div>
                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </section>
    )
}

export default settings

settings.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;