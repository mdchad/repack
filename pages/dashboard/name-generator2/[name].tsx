import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { useRouter } from 'next/router';
import { HeartIcon } from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartSolidIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';

const urls = [
  {
    title: '.com'
  },
  {
    title: '.io'
  },
  {
    title: '.co'
  },
  {
    title: '.app'
  },
  {
    title: '.tech'
  }
];

const social_urls = [
  {
    title: 'Twitter',
    icon: 'https://img.icons8.com/color/48/000000/twitter--v1.png',
    url: 'https://twitter.com/'
  },
  {
    title: 'Instagram',
    icon: 'https://img.icons8.com/color/48/000000/instagram-new--v1.png',
    url: 'https://www.instagram.com/'
  },
  {
    title: 'Facebook',
    icon: 'https://img.icons8.com/color/48/000000/facebook-new--v1.png',
    url: 'https://www.facebook.com/'
  },
  {
    title: 'LinkedIn',
    icon: 'https://img.icons8.com/color/48/000000/linkedin--v1.png',
    url: 'https://www.linkedin.com/'
  }
];

function CheckMark({ data, social }: any) {
  if (!data) {
    return null;
  }

  return data && data[social.title.toLowerCase()]?.available ? (
    <CheckCircleIcon className="ml-auto h-6 w-6 text-green-400" />
  ) : (
    <XCircleIcon className="ml-auto items-end h-6 w-6 text-red-400" />
  );
}

function Name() {
  const router = useRouter();
  const { name } = router.query;
  const [save, setSave] = useState(false);
  const supabase = useSupabaseClient();
  const user = useUser();
  const [data, setData] = useState(null);
  const [savedData, setSavedData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (name) {
      getData();
      getSaved();
    }
  }, [name]);

  async function getData() {
    setLoading(true);
    const res = await fetch('/api/get-social?name=' + name, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin'
    });

    if (!res.ok) {
      throw Error(res.statusText);
    }

    const bodyResponse = await res.json();
    setData(bodyResponse);
    setLoading(false);
  }

  async function getSaved() {
    let { data, error } = await supabase
      .from('favourites')
      .select()
      .eq('value', name)
      .single();
    setSavedData(data);
  }

  async function saveName() {
    setSave(true);
    const duration = 2000;

    if (savedData) {
      return;
    }

    const newSave = {
      created_at: new Date().toISOString(),
      type: 'branding',
      value: name,
      user_id: user?.id
    };

    let { error } = await supabase.from('favourites').insert(newSave);

    if (error) {
      console.log(error);
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
    <section className="h-[calc(100vh-50px)] md:h-screen overflow-y-scroll">
      <div className="p-5 flex flex-col gap-3 flex-wrap">
        <div className="bg-white overflow-hidden rounded-lg w-full">
          <div className="p-5">
            <div className="border-b border-gray-200 pb-5 flex items-center justify-between">
              <p className="text-lg font-medium leading-6 text-gray-900">
                {name}
              </p>
              <div className="flex sm:mt-0 sm:ml-4">
                <button
                  type="button"
                  onClick={() => saveName()}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {savedData || save ? (
                    <>
                      <HeartSolidIcon
                        className="h-4 w-4 mr-2"
                        aria-hidden="true"
                      />{' '}
                      Saved
                    </>
                  ) : (
                    <>
                      <HeartIcon className="h-4 w-4 mr-2" aria-hidden="true" />{' '}
                      Save
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="py-5">
              <p className="text-sm text-gray-500 pb-5">Default TLDs</p>
              <ul className="list-none grid grid-cols-2 md:grid-cols-5 gap-3">
                {urls.map((url, index) => (
                  <li
                    key={index}
                    className="p-3 grid place-content-center uppercase"
                  >
                    <a
                      href={`https://www.namecheap.com/domains/whois/result?domain=${name}${url.title}`}
                      target="_blank"
                      className="flex flex-col text-center hover:text-[#F38A7A]"
                    >
                      {url.title}
                      <span className="text-sm text-gray-400">WHOIS</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="columns-1 lg:columns-2">
          <div className="bg-white overflow-hidden rounded-lg p-5 mb-3">
            <p className="text-sm text-gray-500 pb-5">Social Networks</p>
            {social_urls.map((social, index) => (
              <div key={index} className="flex py-3">
                <img src={social.icon} className="h-6 w-6 mr-3" />
                {/*// @ts-ignore*/}
                <a href={`${social.url}${name?.toLowerCase()}`} target="_blank">
                  {social.url}
                  {/*// @ts-ignore*/}
                  {name?.toLowerCase()}
                </a>
                {/*// @ts-ignore*/}
                {loading && (
                  <div className="ml-auto">
                    <svg
                      className="animate-spin h-5 w-5 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                )}
                <CheckMark data={data} social={social} />
              </div>
            ))}
          </div>

          <div className="bg-white overflow-hidden rounded-lg p-5 mb-3">
            <p className="text-sm text-gray-500 pb-5">Social Networks</p>
            {social_urls.map((social, index) => (
              <div key={index} className="flex items-center py-3">
                <img src={social.icon} className="h-6 w-6 mr-3" />
                <Link href="#">
                  <a>
                    {social.url}
                    {name}
                  </a>
                </Link>
              </div>
            ))}
            {social_urls.map((social, index) => (
              <div key={index} className="flex items-center py-3">
                <img src={social.icon} className="h-6 w-6 mr-3" />
                <Link href="#">
                  <a>
                    {social.url}
                    {name}
                  </a>
                </Link>
              </div>
            ))}
          </div>

          <div className="bg-white overflow-hidden rounded-lg p-5 mb-3">
            <p className="text-sm text-gray-500 pb-5">Social Networks</p>
            {social_urls.map((social, index) => (
              <div key={index} className="flex items-center py-3">
                <img src={social.icon} className="h-6 w-6 mr-3" />
                <Link href="#">
                  <a>
                    {social.url}
                    {name}
                  </a>
                </Link>
              </div>
            ))}
            {social_urls.map((social, index) => (
              <div key={index} className="flex items-center py-3">
                <img src={social.icon} className="h-6 w-6 mr-3" />
                <Link href="#">
                  <a>
                    {social.url}
                    {name}
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Name;

Name.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
