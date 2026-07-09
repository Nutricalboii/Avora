// Designed & Engineered by Vaibhav Sharma (https://github.com/Nutricalboii)
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Process from '@/components/Process';
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
      <Ventures />
      <Team />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
