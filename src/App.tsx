import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './components/HomePage';
import MenuPage from './components/MenuPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import CartPage from './components/CartPage';
import ProtectedRoute from './components/ProtectedRoute';
import { startAuthListener } from './store/slices/authSlice';
import { useAppDispatch } from './store/hooks';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = dispatch(startAuthListener());
    return () => unsubscribe?.();
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
