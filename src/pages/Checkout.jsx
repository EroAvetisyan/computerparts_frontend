import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const Checkout = () => {
  const { cart, subtotal } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (cart.length === 0) {
      alert("Cart is empty")
      return
    }

    navigate("/success")
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          required
          className="w-full border p-3 rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full border p-3 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <textarea
          placeholder="Shipping Address"
          required
          className="w-full border p-3 rounded"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <div className="flex justify-between items-center pt-4">
          <h2 className="text-xl font-semibold">
            Total: ${subtotal.toFixed(2)}
          </h2>

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  )
}

export default Checkout
