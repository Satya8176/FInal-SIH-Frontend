import React, { useEffect, useState } from 'react';
import Header from '../components/Landing/Header';
import Hero from '../components/Landing/Hero';
import Features from '../components/Landing/Features';
import About from '../components/Landing/About';
import CTA from '../components/Landing/CTA';
import Footer from '../components/Landing/Footer';
import { requestForToken, onMessageListener } from '../firebase';

function Landing() {
  const [tokenFound, setTokenFound] = useState(null);
  // if(!tokenFound) {
  //   const token =  requestForToken(); // Get FCM Token when app starts
  //   console.log("Token in landing page after request",token);
  //     onMessageListener().then((payload) => {
  //       console.log("Message received:", payload);
  //       alert(`${payload.notification.title}: ${payload.notification.body}`);
  //     });
  //   }
    useEffect(() => {
  requestForToken(); // Save token when landing page loads
  console.log("Landing page token")
}, []);
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
