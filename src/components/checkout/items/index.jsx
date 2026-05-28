"use client";
import { useSelector } from "react-redux";

const IMGURL = "https://res.cloudinary.com/ds48lk80f/";

const CheckoutItems = () => {
  const { cartItems } = useSelector((state) => state.cart);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 text-sm">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <div
          key={`${item.id}-${item.size}-${item.color}`}
          className="flex gap-4 items-center border rounded-xl p-3 md:p-4 bg-white shadow-sm hover:shadow-md transition"
        >
          
          {/* IMAGE */}
          <div className="w-40 h-48 md:w-36 md:h-44 flex-shrink-0 overflow-hidden rounded-lg border bg-gray-50">
             
            <img
              src={`${IMGURL}${item.thumb?.url}`}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* DETAILS */}
          <div className="flex-1">
            <h3 className="text-sm md:text-base font-light ">
              {item.name}
            </h3>

            <p className="text-xs text-gray-600 mt-1">
              {item.color && <span>Color: {item.color}</span>}

            </p>

            {/* EXTRA INFO */}
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
              {item.size && <span>Size: {item.size}</span>}
            </div>

            {/* QUANTITY */}
            <p className="text-xs text-gray-500 mt-1">
              Qty: <span className="font-medium">{item.quantity}</span>
            </p>
          </div>

          {/* PRICE */}
          <div className="text-right">
            <p className="text-sm md:text-base font-light ">
              ₹{item.price * item.quantity}
            </p>

            {item.quantity > 1 && (
              <p className="text-xs text-gray-400">
                ₹{item.price} × {item.quantity}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckoutItems;