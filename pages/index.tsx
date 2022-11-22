import Layout from '@/components/Layout/Layout';
import Hero from '@/components/section/Hero';
import Services from '@/components/section/Services';
import Process from '@/components/section/Process';
import Pricing from '@/components/section/Pricing';
import CustomerOpinion from '@/components/section/CustomerOpinion';
import Contact from '@/components/section/Contact';
import Faq from '@/components/section/Faq';
import Plans from '@/components/section/Plans';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      {/* <Process /> */}
      <Plans />
      <CustomerOpinion />
      <Pricing />
      {/* <Contact /> */}
      <Faq />
      <Footer />
    </>
  );
}

Home.getLayout = (page: any) => <Layout>{page}</Layout>;
