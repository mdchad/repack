import DashboardLayout from '@/components/Layout/DashboardLayout';

export default function Dashboard() {
  return <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />;
}

Dashboard.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
