import Link from 'next/link';
import s from './Navbar.module.css';

import Logo from 'components/icons/Logo';
import { useRouter } from 'next/router';
import { useUser } from 'utils/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import ThemeToggler from './ThemeToggler';

const Navbar = () => {
    const router = useRouter();
    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    return (
        <nav className="sticky top-0 bg-white dark:bg-[#293C4A] dark:text-white text-[#293C4A] z-40 transition-all duration-150">
            <a href="#skip" className="sr-only focus:not-sr-only">
                Skip to content
            </a>
            <div className="mx-auto max-w-6xl px-6">
                <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
                    <div className="flex flex-1 items-center">
                        <Link href="/">
                            <a className={s.logo} aria-label="Logo">
                                <Logo />
                            </a>
                        </Link>
                    </div>

                    <ThemeToggler />

                    <div className="flex flex-1 justify-end space-x-8">
                        {user ? (
                            <span
                                className={s.link}
                                onClick={async () => {
                                    await supabaseClient.auth.signOut();
                                    router.push('/signin');
                                }}
                            >
                                Sign out
                            </span>
                        ) : (
                            <Link href="/signin">
                                <a className="rounded-md px-6 py-2
                                    bg-[#F1887A] text-white hover:bg-[#293C4A] hover:text-white
                                    dark:bg-[#fff] dark:text-[#F1887A] dark:hover:bg-[#F1887A] dark:hover:text-white
                                    focus:outline-none 
                                    focus:ring 
                                    focus:ring-[#F1887A]/[.06]"
                                >
                                    Sign in
                                </a>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
