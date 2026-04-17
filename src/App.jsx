import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import HomePage from './components/HomePage';
import MenuPage from './components/MenuPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
