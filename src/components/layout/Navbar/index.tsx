import React, { useState, useEffect } from 'react';

interface NavLink {
  id: string;
  label: string;
  target: string;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks: NavLink[] = [
    { id: 'home', label: '首页', target: 'home' },
    { id: 'about', label: '关于', target: 'about' },
    { id: 'footer', label: '页脚', target: 'footer' },
  ];

  // 监听滚动，为导航栏添加背景
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 点击导航链接时的处理
  const handleNavClick = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  // 阻止body滚动当菜单打开时
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* 主导航栏 */}
      <nav className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-sm py-3 shadow-lg' 
          : 'bg-transparent py-4'
        }
      `}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo部分 */}
            <div className="flex items-center">
              <button
                onClick={() => handleNavClick('home')}
                className="text-2xl font-bold text-white tracking-wider hover:text-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 rounded-lg px-2 py-1"
                aria-label="返回首页"
              >
                IIEOzo
              </button>
            </div>

            {/* 桌面端导航链接 */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.target)}
                  className="text-gray-100 hover:text-white font-medium text-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 rounded-lg px-3 py-2"
                  aria-label={`跳转到${link.label}`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* 移动端汉堡菜单按钮 */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2 rounded-lg hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
                aria-expanded={isMenuOpen}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`
                    block h-0.5 w-6 bg-white rounded-full transition-all duration-300
                    ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}
                  `} />
                  <span className={`
                    block h-0.5 w-6 bg-white rounded-full transition-all duration-300
                    ${isMenuOpen ? 'opacity-0' : 'opacity-100'}
                  `} />
                  <span className={`
                    block h-0.5 w-6 bg-white rounded-full transition-all duration-300
                    ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}
                  `} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 移动端全屏菜单 */}
      <div className={`
        fixed inset-0 z-40 transition-all duration-500 ease-in-out
        ${isMenuOpen 
          ? 'opacity-100 visible bg-gray-900/95 backdrop-blur-sm' 
          : 'opacity-0 invisible'
        }
        md:hidden
      `}>
        <div className="flex flex-col items-center justify-center h-full space-y-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.target)}
              className="text-3xl font-medium text-white hover:text-gray-200 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:text-gray-300 py-3 px-6 rounded-lg hover:bg-gray-800/50"
              aria-label={`跳转到${link.label}`}
            >
              {link.label}
            </button>
          ))}
          
          {/* 关闭菜单提示 */}
          <div className="absolute bottom-10 text-gray-400 text-sm animate-pulse">
            点击任意链接或外部区域关闭
          </div>
        </div>
        
        {/* 点击遮罩层关闭菜单 */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute inset-0 w-full h-full -z-10 cursor-default focus:outline-none"
          aria-label="关闭菜单"
        />
      </div>
      
      {/* 防止内容被导航栏遮挡 */}
      <div className={`pt-16 ${isMenuOpen ? 'h-screen overflow-hidden' : ''}`} />
    </>
  );
};

export default Navbar;
