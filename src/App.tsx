import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './components/HomePage';
import MenuPage from './components/MenuPage';
import LoginPage from './components/LoginPage';
import OrderPage from './components/OrderPage';
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
