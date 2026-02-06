import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">Portfolio</div>
          <p className="text-gray-400 mb-6">© 2026 All rights reserved</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-gray-300 transition-colors">GitHub</a>
            <a href="#" className="hover:text-gray-300 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;