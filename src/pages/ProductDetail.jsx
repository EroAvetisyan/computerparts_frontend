import React, { useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products"; // ✅ FIX: products is now defined
import { useCart } from "../context/CartContext";
import { ShoppingCart, Star, Heart, Check, Truck, Shield } from 'lucide-react';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams();

  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsWishlistOpen, // ✅ open wishlist drawer to confirm
  } = useCart();

  const [quantity, setQuantity] = useState(1);

  // Find the product
  const product = products.find((item) => item.id === Number(id));

  // Handle case where product is not found
  if (!product) {
    return (
      <div className="container mx-auto px-5 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
        <Link to="/" className="text-accent-blue hover:underline">Return Home</Link>
      </div>
    );
  }

  const liked = isInWishlist(product.id);

  // Related products (same category, excluding current)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    toast.success(`Added ${quantity} x ${product.name} to cart`, {
      style: {
        background: '#1a1a2e',
        color: '#fff',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      },
      iconTheme: {
        primary: '#bc13fe',
        secondary: '#fff',
      },
    });
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);

    toast.success(
      liked
        ? `Removed ${product.name} from wishlist`
        : `Added ${product.name} to wishlist`,
      {
        style: {
          background: '#1a1a2e',
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        iconTheme: {
          primary: '#bc13fe',
          secondary: '#fff',
        },
      }
    );

    // Optional: open wishlist drawer so you SEE it worked
    setIsWishlistOpen(true);
  };

  return (
    <div className="pb-20 pt-24">
      <div className="container mx-auto px-5">
        {/* Breadcrumbs */}
        <div className="text-sm text-text-secondary mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-accent-blue transition-colors">Home</Link>
          <span>/</span>
          <span className="text-black">{product.category}</span>
          <span>/</span>
          <span className="text-text-primary font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl bg-bg-secondary border border-white/5 p-8 flex items-center justify-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,80,0.5)_0%,transparent_70%)] opacity-50"></div>
            <img
              src={`/${product.image}`}
              alt={product.name}
              className="w-full max-w-md object-contain z-10 transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center text-yellow-400 gap-1">
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                    <span className="text-text-secondary ml-1">(128 reviews)</span>
                  </div>

                  <span className="text-green-400 flex items-center gap-1">
                    <Check size={14} /> In Stock
                  </span>
                </div>
              </div>

              {/* ✅ Wishlist button (working + shows liked state) */}
              <button
                onClick={handleToggleWishlist}
                className="text-text-secondary hover:text-red-500 transition-colors"
                aria-label="Toggle wishlist"
              >
                <Heart
                  size={24}
                  className={
                    liked
                      ? "text-accent-purple fill-accent-purple stroke-gradient300"
                      : "text-text-secondary"
                  }
                />
              </button>
            </div>

            <div className="text-3xl font-bold text-gradient mb-8 border-b border-white/10 pb-6">
              ${product.price}
            </div>

            <p className="text-text-secondary mb-8 leading-relaxed">
              Experience ultimate performance with the {product.name}. Designed for gamers and creators who demand the best.
              Features high-speed performance, superior cooling, and premium build quality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border border-white/20 rounded-lg bg-white/5">
                <button
                  className="px-4 py-3 hover:bg-white/10 transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>

                <span className="w-12 text-center font-medium">{quantity}</span>

                <button
                  className="px-4 py-3 hover:bg-white/10 transition-colors"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>

              <Button className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart size={20} /> Add to Cart
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                <Truck size={20} className="text-accent-blue" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                <Shield size={20} className="text-accent-blue" />
                <span>2 Year Warranty</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h3 className="text-2xl font-bold mb-8">Related Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;