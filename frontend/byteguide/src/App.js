import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import OnboardingPage from './pages/OnboardingPage';
import AuthenticationPage from './pages/AuthenticationPage';
import PersonalizedPlan from './pages/PersonalizedPlan';
import ProfilePage from './pages/ProfilePage';
import SubscriptionPage from './pages/SubscriptionPage';
import ConsultationPage from './pages/ConsultationPage';

function App() {
    return (
    <AuthProvider>
      <Router>
        <div className="App">
          <div className="min-h-screen bg-gradient-bg bg-cover text-light">
            <Navbar className="bg-primary mb-0" />
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <About />
                  <Features />
                  <HowItWorks />
                  <Footer />
                </>
              } />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/login" element={<AuthenticationPage Login={true} />} />
              <Route path="/signup" element={<AuthenticationPage Login={false} />} />
              <Route path="/personalized-plan" element={<PersonalizedPlan />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/subscription" element={<SubscriptionPage />} />
              <Route path="/consultation" element={<ConsultationPage />} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
