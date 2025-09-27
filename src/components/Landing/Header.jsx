import React from 'react';
import { Shield } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SafeGuard</h1>
              <p className="text-xs text-gray-600">Tourist Safety System</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Features</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;