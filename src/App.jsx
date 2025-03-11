import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import "./styles/App.css"

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Kotisivu</h1>} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  )
}

export default App
