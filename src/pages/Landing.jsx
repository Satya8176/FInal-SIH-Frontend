import React, { useEffect, useState } from 'react';
import Header from '../components/Landing/Header';
import Hero from '../components/Landing/Hero';
import Features from '../components/Landing/Features';
import About from '../components/Landing/About';
import CTA from '../components/Landing/CTA';
import Footer from '../components/Landing/Footer';
import { requestForToken, onMessageListener } from '../firebase';

function Landing() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Get FCM token on page load
    const fetchToken = async () => {
      const retrievedToken = await requestForToken();
      if (retrievedToken) {
        setToken(retrievedToken);
        alert(`FCM Token: ${retrievedToken}`);
      } else {
        alert("No FCM token found.");
      }
    };

    fetchToken();

    // Set up foreground message listener
    const unsubscribe = onMessageListener((payload) => {
      console.log("Message received:", payload);
      alert(`${payload?.notification?.title}: ${payload?.notification?.body}`);
    });

    // Cleanup
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe(); // stop listening
      }
    };
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
