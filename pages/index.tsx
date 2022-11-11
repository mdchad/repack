import Pricing from 'components/Pricing';
import { getActiveProductsWithPrices } from 'utils/supabase-client';
import { Product } from 'types';
import { GetStaticPropsResult } from 'next';


import Layout from "@/components/Layout/Layout";

export default function Home() {
    return (
        <div className="h-screen">
            <div>Home</div>
        </div >
    );
}

Home.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
);