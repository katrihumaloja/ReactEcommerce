import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Products from "./pages/Products";
import Home from './pages/Home';
import Cart from "./pages/Cart";
import "./styles/App.css";
import ProductDetails from './pages/ProductDetails';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
