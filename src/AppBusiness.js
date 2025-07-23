import React from 'react';
import Navbar from './components/Navbar';
import BusinessHeroSection from './components/BusinessHeroSection';
import BusinessWhatSection from './components/BusinessWhatSection';
import BusinessTechSection from './components/BusinessTechSection';
import BusinessDashboardSection from './components/BusinessDashboardSection';
import BusinessToolkitsSection from './components/BusinessToolkitsSection';
import BusinessBenefitsSection from './components/BusinessBenefitsSection';
import BusinessHowItWorksSection from './components/BusinessHowItWorksSection';
import BusinessMetricsSection from './components/BusinessMetricsSection';
import BusinessCTASection from './components/BusinessCTASection';

function AppBusiness({ navigationProps }) {
  return (
    <div className="App">
      <Navbar navigationProps={navigationProps} />
      <BusinessHeroSection />
      <BusinessWhatSection />
      <BusinessTechSection />
      <BusinessDashboardSection />
      <BusinessToolkitsSection />
      <BusinessBenefitsSection />
      <BusinessHowItWorksSection />
      <BusinessMetricsSection />
      <BusinessCTASection />
    </div>
  );
}

export default AppBusiness; 