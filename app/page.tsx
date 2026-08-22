import HeroCarousel from '@/components/home/HeroCarousel';
import FeatureCards from '@/components/home/FeatureCards';
import AboutSection from '@/components/home/AboutSection';
import StatsSection from '@/components/home/StatsSection';
import VideoSection from '@/components/home/VideoSection';
import ServicesGrid from '@/components/home/ServicesGrid';
import WhyUsSection from '@/components/home/WhyUsSection';
import ProjectsTabs from '@/components/home/ProjectsTabs';
import TestimonialsGrid from '@/components/home/TestimonialsGrid';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <div>
      <HeroCarousel />
      <FeatureCards />
      <AboutSection />
      <StatsSection />
      <VideoSection />
      <ServicesGrid />
      <WhyUsSection />
      <ProjectsTabs />
      <TestimonialsGrid />
      <CTASection />
    </div>
  );
}
