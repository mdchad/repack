import Link from 'next/link';
import { useState, ReactNode } from 'react';
import Layout from '@/components/Layout/DashboardLayout';

import LoadingDots from 'components/ui/LoadingDots';
import Button from 'components/ui/Button';
import { useUser } from 'utils/useUser';
import { postData } from 'utils/helpers';

import { User } from '@supabase/supabase-js';
import { useSessionContext } from '@supabase/auth-helpers-react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import SettingNavBar from '@/components/ui/Setting/Navbar';

interface Props {
    title: string;
    description?: string;
    footer?: ReactNode;
    children: ReactNode;
}

function Card({ title, description, footer, children }: Props) {
    return (
        <div className="border border-zinc-700	max-w-3xl w-full p rounded-md m-auto my-8">
            <div className="px-5 py-4">
                <h3 className="text-2xl mb-1 font-medium">{title}</h3>
                <p className="text-zinc-300">{description}</p>
                {children}
            </div>
            <div className="border-t border-zinc-700 bg-zinc-900 p-4 text-zinc-500 rounded-b-md">
                {footer}
            </div>
        </div>
    );
}

export default function Account({ user }: { user: User }) {
    const [loading, setLoading] = useState(false);
    const { isLoading, subscription, userDetails } = useUser();
    const { session, error } = useSessionContext();

    const redirectToCustomerPortal = async () => {
        setLoading(true);
        try {
            const { url, error } = await postData({
                url: '/api/create-portal-link'
            });
            window.location.assign(url);
        } catch (error) {
            if (error) return alert((error as Error).message);
        }
        setLoading(false);
    };

    const subscriptionPrice =
        subscription &&
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: subscription?.prices?.currency,
            minimumFractionDigits: 0
        }).format((subscription?.prices?.unit_amount || 0) / 100);

    return (
        <section className="md:w-2/3 flex flex-col gap-4">

            <div className="">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">{pageName}</h1>
            </div>

            <SettingNavBar />

            <div className="max-w-6xl mx-auto pt-8 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:flex-col sm:align-center">
                    <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
                        Account
                    </h1>
                    <p className="mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl max-w-2xl m-auto">
                        We partnered with Stripe for a simplified billing.
                    </p>
                </div>
            </div>

            <div className="p-4">
                <Card
                    title="Your Plan"
                    description={
                        subscription
                            ? `You are currently on the ${subscription?.prices?.products?.name} plan.`
                            : ''
                    }
                    footer={
                        <div className="flex items-start justify-between flex-col sm:flex-row sm:items-center">
                            <p className="pb-4 sm:pb-0">
                                Manage your subscription on Stripe.
                            </p>
                            <Button
                                variant="slim"
                                loading={loading}
                                disabled={loading || !subscription}
                                onClick={redirectToCustomerPortal}
                            >
                                Open customer portal
                            </Button>
                        </div>
                    }
                >
                    <div className="text-xl mt-8 mb-4 font-semibold">
                        {isLoading ? (
                            <div className="h-12 mb-6">
                                <LoadingDots />
                            </div>
                        ) : subscription ? (
                            `${subscriptionPrice}/${subscription?.prices?.interval}`
                        ) : (
                            <Link href="/">
                                <a>Choose your plan</a>
                            </Link>
                        )}
                    </div>
                </Card>
                <Card
                    title="Your Name"
                    description="Please enter your full name, or a display name you are comfortable with."
                    footer={<p>Please use 64 characters at maximum.</p>}
                >
                    <div className="text-xl mt-8 mb-4 font-semibold">
                        {userDetails?.full_name}
                    </div>
                </Card>
                <Card
                    title="Your Email"
                    description="Please enter the email address you want to use to login."
                    footer={<p>We will email you to verify the change.</p>}
                >
                    <p className="text-xl mt-8 mb-4 font-semibold">
                        {user ? user.email : undefined}
                    </p>
                </Card>
            </div>

            <div className="bg-gray border p-5 w-full rounded-lg overflow-hidden">
                <form>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </section>
    );
}

Account.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
