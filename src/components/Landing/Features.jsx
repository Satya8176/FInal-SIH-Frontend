import React from 'react';
import { MapPin, AlertTriangle, Shield, BarChart3 } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Live Tourist Tracking',
      description: 'Real-time location monitoring with GPS precision and privacy-first approach for enhanced safety.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: AlertTriangle,
      title: 'Emergency Panic Button',
      description: 'Instant emergency alerts with one-touch activation, connecting tourists to local authorities immediately.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Shield,
      title: 'Geo-fencing & Alerts',
      description: 'Smart boundary detection with automated safety notifications for restricted or dangerous areas.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: BarChart3,
      title: 'Police / Tourism Dashboard',
      description: 'Comprehensive analytics and incident management tools for authorities and tourism operators.',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Comprehensive Safety Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced technology solutions designed to provide complete safety coverage for tourists and efficient management tools for authorities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;