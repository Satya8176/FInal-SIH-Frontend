import React from 'react';
import { Globe, Users, Clock, Award } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, label: 'Active Users', value: '50K+' },
    { icon: Globe, label: 'Cities Covered', value: '150+' },
    { icon: Clock, label: 'Response Time', value: '<2min' },
    { icon: Award, label: 'Safety Rating', value: '99.9%' }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Revolutionizing Tourist Safety Through Technology
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Our Smart Tourist Safety Monitoring & Incident Response System combines cutting-edge technology with proven safety protocols to create a comprehensive protection network for travelers worldwide.
              </p>
              <p>
                By leveraging real-time GPS tracking, intelligent geo-fencing, and instant emergency response capabilities, we ensure that tourists can explore with confidence while authorities maintain complete situational awareness.
              </p>
              <p>
                Built for tourism boards, local authorities, and safety organizations, our platform transforms how we approach tourist safety in the modern digital age.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;