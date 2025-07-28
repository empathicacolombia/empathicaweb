import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProcessStepsSection from './components/ProcessStepsSection';
import CallToActionSection from './components/CallToActionSection';
import BenefitsSection from './components/BenefitsSection';
import PsychologistsSection from './components/PsychologistsSection';
import PlansSection from './components/PlansSection';
import BusinessSection from './components/BusinessSection';
import TrustSection from './components/TrustSection';
import Footer from './components/Footer';

function App({ navigationProps }) {
  return (
    <div className="App">
      <Navbar navigationProps={navigationProps} />
      <HeroSection navigationProps={navigationProps} />
      <ProcessStepsSection />
      <CallToActionSection navigationProps={navigationProps} />
      <BenefitsSection />
      <PsychologistsSection navigationProps={navigationProps} />
      <PlansSection navigationProps={navigationProps} />
      <BusinessSection navigationProps={navigationProps} />
      <TrustSection />
      <Footer />
    </div>
  );
}

export default App;
