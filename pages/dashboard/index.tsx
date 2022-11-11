import Layout from "@/components/Layout/DashboardLayout";
import { withPageAuth } from '@supabase/auth-helpers-nextjs';

// check for auth user
export const getServerSideProps = withPageAuth({ redirectTo: '/signin' });

export default function Dashboard() {
    return (
        <div>dashboard</div>
    );
}

Dashboard.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
);


