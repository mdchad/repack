import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Tabs } from '@/utils/enums';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

const tabs = [
  { name: Tabs.Branding },
  { name: Tabs.Website },
  { name: Tabs.Blog }
];

function capitalizeFirstLetter(string: any) {
  return string[0].toUpperCase() + string.slice(1);
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

function Saved() {
  const [currentTab, setCurrentTab] = useState('branding');
  const [saved, setSaved] = useState<any[] | null>(null);
  const supabase = useSupabaseClient();
  const user = useUser();

  useEffect(() => {
    getSaved();
  }, []);

  async function getSaved() {
    let { data: favourites, error } = await supabase
      .from('favourites')
      .select('*')
      .eq('user_id', user?.id);
    setSaved(favourites);
  }

//   console.log(saved)
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={currentTab}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{capitalizeFirstLetter(tab.name)}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setCurrentTab(tab.name)}
              className={classNames(
                currentTab === tab.name
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700',
                'px-3 py-2 font-medium text-sm rounded-md'
              )}
              aria-current={currentTab ? 'page' : undefined}
            >
              {capitalizeFirstLetter(tab.name)}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-6">
        <ul>
          {saved?.map((saveContent, id) => {
            if (saveContent.type === currentTab) {
              return <li key={id}>{saveContent.value}</li>;
            }
          })}
        </ul>
      </div>
    </div>
  );
}

export default Saved;

Saved.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
