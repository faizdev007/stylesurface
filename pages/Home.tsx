import React from 'react';
import Hero from '../components/Hero';
import ProductSection from '../components/ProductSection';
import TrustSection from '../components/TrustSection';
import Applications from '../components/Applications';
import AboutSection from '../components/AboutSection';
import Testimonials from '../components/Testimonials';
import SocialProof from '../components/SocialProof';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';

interface HomeProps {
  onOpenModal: () => void;
}

const Home: React.FC<HomeProps> = ({ onOpenModal }) => {
  return (
    <>
      <Hero onOpenModal={onOpenModal} />
      <TrustSection />
      <ProductSection onOpenModal={onOpenModal} />
      <AboutSection />
      <SocialProof />
      <Applications />
      <Testimonials />
      <FAQ />
      <ContactSection />
    </>
  );
};

export default Home;