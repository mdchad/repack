import DashboardLayout from '@/components/Layout/DashboardLayout';
import Card from '@/components/ui/Dashboard/Card/Card';
import { EyeIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Table, Pagination } from 'flowbite-react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

import { SUBTYPE, TYPE } from '@/utils/enums';
import { splitFontURL, splitHashURL } from '@/utils/helpers';

const features = [
  {
    tab: 'branding',
    title: 'Brand Names',
    description:
      'Get inspired and find the perfect name for your startup with our tool.',
    href: 'name-generator',
    background:
      'bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-300/100 via-slate-700/30 to-teal-100/100',
    hover:
      'hover:bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] hover:from-indigo-300 hover:via-slate-700 hover:to-teal-100',
    assets: 'design/name.svg',
    assets_alt: 'Brand Names'
  },
  {
    tab: 'branding',
    title: 'Color Palette',
    description: 'Easily create color palettes for your designs.',
    href: 'color-generator',
    background:
      'bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-300/100 via-slate-700/30 to-teal-100/100',
    hover:
      'hover:bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] hover:from-indigo-300 hover:via-slate-700 hover:to-teal-100',
    assets: 'design/palette.svg',
    assets_alt: 'Color Palette'
  },
  {
    tab: 'branding',
    title: 'Font Pair',
    description:
      'Easily create cohesive and visually appealing font combinations.',
    href: 'font-generator',
    background:
      'bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-300/100 via-slate-700/30 to-teal-100/100',
    hover:
      'hover:bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] hover:from-indigo-300 hover:via-slate-700 hover:to-teal-100',
    assets: 'design/Aa.svg',
    assets_alt: 'Color Palette'
  },
  {
    tab: 'branding',
    title: 'Brand Guide',
    description:
      "Effectively manage and maintain your brand's identity with our brand guide tool.",
    href: 'brand-guide-generator',
    background:
      'bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-300/100 via-slate-700/30 to-teal-100/100',
    hover:
      'hover:bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] hover:from-indigo-300 hover:via-slate-700 hover:to-teal-100',
    assets: 'design/brandguide.svg',
    assets_alt: 'Color Palette'
  }
];

interface Item {
  id: number;
  name: string;
  saved: { value: [] | undefined };
  type: string;
  subtype: string;
}

export default function Dashboard() {
  const supabase = useSupabaseClient();
  const user = useUser();

  const [saved, setSaved] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<any>(1);
  let [page, setPage] = useState<any>(1);
  const [limit, setLimit] = useState<any>(25);

  async function getTableData(page: number = 1) {
    // set ts
    let favourites: any;
    let error: any;
    let count: any;

    let from = (page - 1) * limit;
    let to = page * limit;

    console.log('page', page);

    try {
      ({
        data: favourites,
        error,
        count
      } = await supabase
        .from('favourites')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .eq('type', 'branding')
        .eq('user_id', user?.id)
        .limit(limit)
        .range(from, to));

      setSaved(favourites);
      setPage(page);

      // calc total pages
      const total = Math.ceil(count / limit);
      setTotalPages(total);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTableData();
  }, []);

  function urlType(subtype: any, queryParams: any): any {
    if (subtype === SUBTYPE.Colour) {
      queryParams = splitHashURL(queryParams);
    }

    if (subtype === SUBTYPE.Font) {
      queryParams = splitFontURL(queryParams);
    }
    // @ts-ignore
    return {
      [SUBTYPE.Name]: `name-generator/${queryParams}`,
      [SUBTYPE.Colour]: `color-generator?colors=${queryParams}`,
      [SUBTYPE.Font]: `font-generator?font=${queryParams}`
    }[subtype];
  }

  return (
    <div className="flex flex-col gap-[5em] p-5 md:p-6 lg:p-8 h-full">
      <section className="flex flex-col gap-5">
        <h2 className="text-3xl lg:text-4xl">Apps</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            return (
              <Card
                key={index}
                href={`/dashboard/${feature.href}`}
                title={feature.title}
                description={feature.description}
                background={feature.background}
                hover={feature.hover}
                assets={feature.assets}
                assets_alt={feature.assets_alt}
              />
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-3xl lg:text-4xl">Activity</h2>

        <div className="flex flex-col gap-5">
          <Table hoverable={true}>
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Type</Table.HeadCell>
              <Table.HeadCell>Sub Type</Table.HeadCell>
              <Table.HeadCell className="text-center">Action</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {saved.map((item: Item, index: number) => {
                return (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={index}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {item.saved.value && item.saved.value.join(', ')}
                    </Table.Cell>
                    <Table.Cell className="capitalize">
                      {item.type && item.type}
                    </Table.Cell>
                    <Table.Cell className="capitalize">
                      {item.subtype && item.subtype}
                    </Table.Cell>
                    <Table.Cell className="flex items-center justify-center">
                      <Link
                        href={`/dashboard/${urlType(
                          item.subtype,
                          item.saved.value
                        )}`}
                      >
                        <a className="font-medium text-black hover:text-gray-500">
                          <EyeIcon className="w-5 h-5" />
                        </a>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>

          {totalPages > 1 && (
            <Pagination
              className="flex justify-center"
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(params) => {
                getTableData(params);
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
}

Dashboard.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
