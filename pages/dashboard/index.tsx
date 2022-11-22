import Layout from '@/components/Layout/DashboardLayout';
import { supabase } from '@/utils/supabase-client';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import DashboardLayout from '@/components/Layout/DashboardLayout';

export default function Dashboard() {
  return <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />;
}

Dashboard.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
