import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 text-white py-6 px-4 md:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Portfolio</div>
        <div className="hidden md:flex space-x-8">
          <a href="/" className="hover:text-gray-300 transition-colors">Home</a>
          <a href="/about" className="hover:text-gray-300 transition-colors">About</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;