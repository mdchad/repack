import 'styles/main.css';
import 'styles/chrome-bug.css';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { AppProps } from 'next/app';
import { MyUserContextProvider } from 'utils/useUser';
import type { Database } from 'types_db';
import { ThemeProvider } from 'next-themes';
import { NextPage } from 'next';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: any) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );

  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  const [user, setUser] = useState(null);

  const getLayout =
    Component.getLayout || ((page: any) => <Layout>{page}</Layout>);

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <MyUserContextProvider>
          {getLayout(<Component {...pageProps} />)}
        </MyUserContextProvider>
      </SessionContextProvider>
    </ThemeProvider>
  );
}
