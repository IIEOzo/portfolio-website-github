
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import './App.css';

function App() {
  // Simple routing based on path
  const path = window.location.pathname;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {path === '/about' ? <About /> : <Home />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
