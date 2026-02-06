import React, { useState } from 'react';
import logo from '../assets/IIEOzoLogo.svg';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white py-4 px-4 md:px-8 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo 和文字 */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="IIEOzo Logo" className="w-10 h-10" />
          <span className="text-xl font-bold">IIEOzo</span>
        </div>

        {/* 桌面端导航 */}
        <div className="hidden md:flex space-x-10 items-center">
          <a href="#home" className="hover:text-gray-300 transition-colors duration-300">首页</a>
          <a href="#about" className="hover:text-gray-300 transition-colors duration-300">关于</a>
          <a href="#footer" className="hover:text-gray-300 transition-colors duration-300">页脚</a>
        </div>

        {/* 手机端汉堡菜单按钮 */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 手机端全屏菜单 */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900 z-40 flex flex-col justify-center items-center">
          <div className="flex flex-col space-y-10 text-2xl">
            <a 
              href="#home" 
              className="hover:text-gray-300 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              首页
            </a>
            <a 
              href="#about" 
              className="hover:text-gray-300 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              关于
            </a>
            <a 
              href="#footer" 
              className="hover:text-gray-300 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              页脚
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;