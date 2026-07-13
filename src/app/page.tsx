import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Blog from '@/components/Blog';
import Ventures from '@/components/Ventures';
import Team from '@/components/Team';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Blog />
      <Ventures />
      <Team />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
