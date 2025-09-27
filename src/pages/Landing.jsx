import React from 'react';
import Header from '../components/Landing/Header';
import Hero from '../components/Landing/Hero';
import Features from '../components/Landing/Features';
import About from '../components/Landing/About';
import CTA from '../components/Landing/CTA';
import Footer from '../components/Landing/Footer';

function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <About />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default Landing;