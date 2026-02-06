
import Navbar from './components/layout/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* 首页锚点 */}
      <section id="home" className="min-h-screen">
        <Home />
      </section>
      
      {/* 关于锚点 */}
      <section id="about" className="min-h-screen py-20">
        <About />
      </section>
      
      {/* 页脚锚点 */}
      <footer id="footer" className="bg-gray-900 text-white py-20">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
