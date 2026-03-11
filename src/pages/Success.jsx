import { Link } from "react-router-dom"

const Success = () => {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold mb-4">
        🎉 Order Placed Successfully!
      </h1>

      <p className="mb-6 text-gray-600">
        Thank you for your purchase.
      </p>

      <Link
        to="/"
        className="bg-black text-white px-6 py-3 rounded"
      >
        Continue Shopping
      </Link>
    </div>
  )
}

export default Success
