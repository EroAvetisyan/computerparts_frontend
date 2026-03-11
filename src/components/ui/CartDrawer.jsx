import { useCart } from "../../context/CartContext"
import { X, ShoppingBag, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Button from "./Button"

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-bg-secondary z-50 p-6 shadow-2xl flex flex-col border-l border-white/10"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <ShoppingBag className="text-accent-purple" />
                Your Cart
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[60%] text-center space-y-4">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                    <ShoppingBag size={40} className="text-text-secondary opacity-50" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-text-primary">Your cart is empty</p>
                    <p className="text-sm text-text-secondary">Looks like you haven't added anything yet.</p>
                  </div>
                  <Button variant="primary" onClick={onClose} className="mt-4">
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-accent-blue/30 transition-colors">
                      <img
                        src={`/${item.image}`}
                        alt={item.name}
                        className="w-20 h-20 object-contain rounded-lg bg-white/5 p-2"
                      />

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-sm line-clamp-2">{item.name}</h3>
                          <p className="text-accent-blue font-bold mt-1">${item.price}</p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3 bg-black/20 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-text-secondary hover:text-red-500 text-xs underline transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-6 mt-4 space-y-4 border-t border-white/10">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Subtotal</span>
                  <span className="text-gradient">${subtotal.toFixed(2)}</span>
                </div>

                <div className="space-y-3">
                  <Button variant="primary" className="w-full flex justify-center items-center gap-2 group">
                    Checkout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="w-full text-red-400 border-red-500/30 hover:bg-red-500/10 hover:border-red-500"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer
