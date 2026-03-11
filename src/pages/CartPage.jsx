import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart()

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <Link
          to="/"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="space-y-6">
        {cart.map(item => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row md:items-center justify-between border-b pb-6"
          >
            <div className="flex items-center gap-6">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />

              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-500">${item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <button
                onClick={() =>
                  updateQuantity(item.id, item.quantity - 1)
                }
                className="px-3 py-1 border rounded"
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() =>
                  updateQuantity(item.id, item.quantity + 1)
                }
                className="px-3 py-1 border rounded"
              >
                +
              </button>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 ml-4"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-right mt-10">
        <h2 className="text-2xl font-semibold">
          Subtotal: ${subtotal.toFixed(2)}
        </h2>

        <Link
          to="/checkout"
          className="inline-block mt-4 bg-black text-white px-6 py-3 rounded"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}

export default CartPage
