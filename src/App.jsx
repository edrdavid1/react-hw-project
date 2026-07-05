import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HomePage from './components/HomePage';
import MenuPage from './components/MenuPage';
import LoginPage from './components/LoginPage';
import OrderPage from './components/OrderPage.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import { startAuthListener } from './store/slices/authSlice';

function App() {
  const dispatch = useDispatch();

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
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
