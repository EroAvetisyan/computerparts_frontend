import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Search,
  Menu,
  X,
  Cpu,
  Sun,
  Moon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import WishlistDrawer from "../ui/WishlistDrawer";
import CartDrawer from "../ui/CartDrawer";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { products } from "../../data/products";

const Header = () => {
  const navigate = useNavigate();

  const {
    totalItems,
    isCartOpen,
    setIsCartOpen,
    wishlistCount,
    isWishlistOpen,
    setIsWishlistOpen,
    searchTerm,
    setSearchTerm,
  } = useCart();

  const { theme, toggleTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔍 Фильтр товаров (из 1 кода)
  const filteredProducts = products
    .filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5);

  const handleProductClick = (product) => {
    setSearchTerm("");
    navigate(`/product/${product.id}`);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-3 glass-panel border-b border-glass-border" : "py-5"
      }`}
    >
      <div className="container mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-2xl font-bold tracking-wider"
        >
          <Cpu className="text-accent-blue" size={32} />
          <span className="uppercase">
            Cyber<span className="text-gradient">Parts</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8">
          {["Home", "Products", "Builds", "Support"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="relative font-medium text-text-secondary transition-colors duration-300 hover:text-text-primary after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-accent-blue after:transition-[width] hover:after:w-full"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          {/* 🔍 Search + dropdown */}
          <div className="hidden md:flex items-center relative bg-white/5 rounded-full px-4 py-1.5 border border-transparent transition-all duration-300 focus-within:bg-white/10 focus-within:border-accent-purple focus-within:shadow-neon-purple">
            <Search size={20} className="text-text-secondary" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none text-gradient300 outline-none w-[200px] ml-2 placeholder:text-text-secondary"
            />

            {searchTerm && filteredProducts.length > 0 && (
              <div className="absolute top-full left-0 mt-2 w-[260px] bg-[#0f0f14] border border-white/10 rounded-xl shadow-2xl max-h-72 overflow-y-auto z-50 backdrop-blur-lg text-white">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-white/10 cursor-pointer text-sm transition"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-contain bg-white/5 rounded-md p-1"
                    />
                    <span>{product.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 🌙 Theme toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          {/* ❤️ Wishlist */}
          <Button
            variant="outline"
            size="sm"
            className="relative"
            onClick={() => setIsWishlistOpen(true)}
          >
            <Heart size={18} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent-purple text-gradient300 text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Button>

          {/* 🛒 Cart */}
          <Button
            variant="outline"
            size="sm"
            className="relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent-purple text-white text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>

          {/* 📱 Mobile menu */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="absolute top-full left-0 w-full p-5 border-t border-glass-border glass-panel md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <nav className="flex flex-col gap-4">
              {["Home", "Products", "Builds", "Support"].map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-semibold p-2.5 rounded-lg hover:bg-white/5"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🧾 Drawers */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />
    </header>
  );
};

export default Header;
