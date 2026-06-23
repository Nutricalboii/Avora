import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Avora | Intelligent Outsourcing Powered by AI',
  description: 'Scale your operations with top-tier engineering talent and cutting-edge artificial intelligence solutions. We build, manage, and optimize for your growth.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <Hero />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
