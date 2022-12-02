import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { useRouter } from 'next/router';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

function Name() {
  const router = useRouter();
  const { name } = router.query;
  const [save, setSave] = useState(false);
  const supabase = useSupabaseClient();
  const user = useUser();

  async function saveName() {
    setSave(true);
    const duration = 2000;

    const newSave = {
      created_at: new Date().toISOString(),
      type: 'branding',
      value: name,
      user_id: user?.id
    };

    let { error } = await supabase.from('favourites').insert(newSave);

    if (error) {
      console.log(error)
      toast.error('Fail to save', {
        position: 'top-right',
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'light'
      });
    } else {
      toast.success('Added to saved', {
        position: 'top-right',
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'light'
      });
    }

  }

  return (
    <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
      <p className="text-lg font-medium leading-6 text-gray-900">{name}</p>
      <div className="mt-3 flex sm:mt-0 sm:ml-4">
        <button
          type="button"
          onClick={() => saveName()}
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {save ? (
            <HeartSolidIcon className="h-4 w-4 mr-2" aria-hidden="true" />
          ) : (
            <HeartIcon className="h-4 w-4 mr-2" aria-hidden="true" />
          )}
          Save
        </button>
      </div>
    </div>
  );
}

export default Name;

Name.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
