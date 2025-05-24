
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import PlatformIntroSection from '@/components/home/PlatformIntroSection';
import ForCreativesSection from '@/components/home/ForCreativesSection';
import ForClientsSection from '@/components/home/ForClientsSection';
import IdeasSection from '@/components/home/IdeasSection'; // Kept for service categories
import PlatformFeaturesSection from '@/components/home/PlatformFeaturesSection';
import SuccessStoriesSection from '@/components/home/SuccessStoriesSection'; // Replaces ReviewsSection
import GettingStartedSection from '@/components/home/GettingStartedSection';
import CommunitySupportSection from '@/components/home/CommunitySupportSection';
import PricingPlansSection from '@/components/home/PricingPlansSection';
import SecurityTrustSection from '@/components/home/SecurityTrustSection';
import JoinZutaraSection from '@/components/home/JoinZutaraSection';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PlatformIntroSection />
        <ForCreativesSection />
        <ForClientsSection />
        <IdeasSection /> 
        <PlatformFeaturesSection />
        <SuccessStoriesSection />
        <GettingStartedSection />
        <CommunitySupportSection />
        <PricingPlansSection />
        <SecurityTrustSection />
        <JoinZutaraSection />
      </main>
      <Footer />
    </>
  );
}
