import 'styles/main.css';
import 'styles/chrome-bug.css';
import { useEffect, useState } from 'react';
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { AppProps } from 'next/app';
import { MyUserContextProvider } from 'utils/useUser';
import type { Database } from 'types_db';

export default function MyApp({ Component, pageProps }: AppProps) {
    const [supabaseClient] = useState(() =>
        createBrowserSupabaseClient<Database>()
    );
    useEffect(() => {
        document.body.classList?.remove('loading');
    }, []);

    const [user, setUser] = useState(null);

    const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

    return (
        <div className="bg-black">
            <SessionContextProvider supabaseClient={supabaseClient}>
                <MyUserContextProvider>
                    {getLayout(<Component {...pageProps} />)}
                </MyUserContextProvider>
            </SessionContextProvider>
        </div>
    );
}
