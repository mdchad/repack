import Layout from "@/components/Layout/DashboardLayout";
import { supabase } from "@/utils/supabase-client";
import { withPageAuth } from '@supabase/auth-helpers-nextjs';

export const getServerSideProps = withPageAuth({ redirectTo: '/signin' });

export default function Dashboard() {
    return (
        <div>dashboard</div>
    );
}

Dashboard.getLayout = (page: any) => (
    <Layout>
        {page}
    </Layout>
);


