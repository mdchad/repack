import DashboardHeader from '@/components/ui/Dashboard/Header/DashboardHeader';
import DashboardShortCut from '@/components/ui/Dashboard/Shortcut/DashboardShortCut';

import { useUser } from '@/utils/useUser';
import {
  useSessionContext,
  useSupabaseClient
} from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'Name Generator', href: '#', current: false },
  { name: 'Color Palette Generator', href: '#', current: false },
  { name: 'Font Pairing', href: '#', current: false },
  { name: 'Brand Guide', href: '#', current: false }
];

export default function DashboardLayout({ children }: any) {
  const { session, error } = useSessionContext();
  const { user, isLoading, subscription } = useUser();
  const [headerTheme, setHeaderTheme] = useState<any>([
    '#8ab8a8', // left
    '#8ab8a8', // right
    '#6b9997' // top
  ]);

  if (session) {
    return (
      <>
        <Toaster />
        <DashboardHeader navigation={navigation} headerTheme={headerTheme} />

        <main className="relative -mt-28 lg:-mt-32 sm:mb-16">
          <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              {children}
            </div>
          </div>
        </main>

        <DashboardShortCut />
      </>
    );
  } else {
    return <p>You are not signed in</p>;
  }
}
