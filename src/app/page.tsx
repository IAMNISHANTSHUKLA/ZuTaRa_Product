import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import IdeasSection from '@/components/home/IdeasSection';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <BenefitsSection />
        <IdeasSection />
        <ReviewsSection />
      </main>
      <Footer />
    </>
  );
}
