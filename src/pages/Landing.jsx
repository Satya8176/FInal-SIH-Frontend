import React from 'react';
import Header from '../components/Landing/Header';
import Hero from '../components/Landing/Hero';
import Features from '../components/Landing/Features';
import About from '../components/Landing/About';
import CTA from '../components/Landing/CTA';
import Footer from '../components/Landing/Footer';
import { useEffect,useState } from 'react';
import { requestForToken, onMessageListener } from "../firebase";
// 
function Landing() {
  const token=localStorage.getItem("token");
  // console.log("Token in landing page",token);
  const [tokenFound, setTokenFound] = useState(token);
  if(!tokenFound) {
    const token =  requestForToken(); // Get FCM Token when app starts
    console.log("Token in landing page after request",token);
      onMessageListener().then((payload) => {
        console.log("Message received:", payload);
        alert(`${payload.notification.title}: ${payload.notification.body}`);
      });
    }
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