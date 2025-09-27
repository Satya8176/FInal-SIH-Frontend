import React from 'react';
import { ArrowRight, Users, UserCheck } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
const Hero = () => {
    const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Smart Tourist Safety
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
              Monitoring System
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Monitor tourist safety in real-time, anytime. Advanced incident response and emergency management for a safer travel experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
            onClick={() => navigate('/admin/login')}
              className="group cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3 min-w-[200px]"
            >
              <Users className="w-6 h-6" />
              <span>Admin Login</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              onClick={() => navigate('/login')}
              className="group cursor-pointer bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3 min-w-[200px]"
            >
              <UserCheck className="w-6 h-6" />
              <span>Tourist Login</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <p className="mt-8 text-sm text-gray-500">
            Trusted by tourism boards and safety organizations worldwide
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;