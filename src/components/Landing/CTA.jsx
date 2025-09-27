import React from 'react';
import { ArrowRight, Users, UserCheck } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Your Safety, Our Priority
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Join thousands of tourists and safety professionals who trust our platform for comprehensive safety monitoring and emergency response.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a 
            href="/admin-login" 
            className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3 min-w-[220px]"
          >
            <Users className="w-6 h-6" />
            <span>Admin Dashboard</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="/tourist-login" 
            className="group bg-gradient-to-r from-teal-500 to-teal-600 text-white px-10 py-5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3 min-w-[220px]"
          >
            <UserCheck className="w-6 h-6" />
            <span>Tourist Portal</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border border-gray-100">
          <p className="text-gray-700 text-sm">
            <strong>24/7 Emergency Support:</strong> Our monitoring team is available around the clock to ensure immediate response to any safety incidents.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;