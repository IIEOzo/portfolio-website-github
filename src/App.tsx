
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import './App.css';

function App() {
  // Simple routing based on path
  const path = window.location.pathname;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {path === '/about' ? <About /> : path === '/services' ? <Services /> : <Home />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
