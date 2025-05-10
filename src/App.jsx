import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { FaFilter } from 'react-icons/fa';
import Navbar from './components/Navbar';
import About from './components/About';
import Form from './components/Form';
import Cart from './components/Cart';
import Carousel from './components/Carousel';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import Contact from './components/Contact';
import { products } from './data/products';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar cartItems={cartItems} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <div className="space-y-8">
                <Carousel />
                <Products products={products} onAddToCart={handleAddToCart} />
              </div>
            } />
            <Route 
              path="/product/:id" 
              element={
                <ProductDetail 
                  products={products} 
                  onAddToCart={handleAddToCart} 
                />
              } 
            />
            <Route path="/cart" element={<Cart items={cartItems} setItems={setCartItems} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/form" element={<Form />} />
            <Route path="*" element={<div className="text-center py-20">404 - Page Not Found</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
