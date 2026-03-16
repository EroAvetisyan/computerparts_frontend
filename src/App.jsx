import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';
import Builds from './pages/Builds';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="builds" element={<Builds />} />
          <Route path="product/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
