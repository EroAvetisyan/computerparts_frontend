import React from "react";
import { X, Heart, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import { useCart } from "../../context/CartContext";

const WishlistDrawer = ({ isOpen, onClose }) => {
  const { wishlist, removeFromWishlist, moveWishlistItemToCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-9998"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-100 max-w-[90vw] bg-bg-secondary border-l border-glass-border z-9999 p-5 overflow-y-auto"
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: "spring", stiffness: 250, damping: 28 }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Heart size={18} className="text-accent-purple" />
                <h2 className="text-xl font-semibold">Wishlist</h2>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/5"
              >
                <X size={18} />
              </button>
            </div>

            {wishlist.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[70vh] text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <Heart size={28} className="text-accent-purple" />
                </div>

                <p className="text-lg font-semibold mb-2">
                  Your wishlist is empty
                </p>

                <p className="text-text-secondary text-sm mb-6">
                  Save products you love and view them here.
                </p>

                <Button onClick={onClose}>Start Browsing</Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {wishlist.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-3 p-3 rounded-xl glass-panel"
                  >
                    <img
                      src={
                        item.image?.startsWith("http")
                          ? item.image
                          : `/${item.image}`
                      }
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover bg-bg-tertiary"
                    />

                    <div className="flex-1">
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-text-secondary text-xs mt-1">
                        ${item.price}
                      </p>

                      <div className="flex gap-2 mt-3">
                        <Button
                          variant="primary"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={() => moveWishlistItemToCart(item)}
                        >
                          <ShoppingCart size={16} />
                          Move to cart
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromWishlist(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WishlistDrawer;