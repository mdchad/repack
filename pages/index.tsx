import Layout from '@/components/Layout/Layout';

import Hero from '@/components/section/Hero';
import Services from '@/components/section/Services';
import Process from '@/components/section/Process';
import Pricing from '@/components/section/Pricing';
import CustomerOpinion from '@/components/section/CustomerOpinion';
import Contact from '@/components/section/Contact';
import Faq from '@/components/section/Faq';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Pricing />
      <CustomerOpinion />
      <Contact />
      <Faq />
    </>
  );
}

Home.getLayout = (page: any) => <Layout>{page}</Layout>;
