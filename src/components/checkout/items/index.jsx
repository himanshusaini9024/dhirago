"use client";
import { useSelector } from "react-redux";
import {
  getItemLineMrp,
  getItemLineSelling,
  getItemMrp,
  getItemSellingPrice,
} from "../../../lib/cartPricing";

const IMGURL = process.env.NEXT_PUBLIC_IMG_URL;

const CheckoutItems = () => {
  const { cartItems } = useSelector((state) => state.cart);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 text-sm">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {cartItems.map((item) => {
        const selling = getItemSellingPrice(item);
        const mrp = getItemMrp(item);
        const lineSelling = getItemLineSelling(item);
        const lineMrp = getItemLineMrp(item);
        const showMrp = mrp > selling;

        return (
          <div
            key={`${item.id}-${item.size}-${item.color}`}
            className="flex gap-3 items-center border rounded-xl p-3 bg-white shadow-sm hover:shadow-md transition"
          >
            <div
              className="w-14 h-18 flex-shrink-0 overflow-hidden rounded-lg border bg-gray-50"
              style={{ width: 56, height: 70 }}
            >
              <img
                src={`${IMGURL}${item.thumb?.url}`}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-futura font-medium text-gray-600 leading-snug break-words">
                {item.name}
              </h3>

              <div className="flex flex-wrap gap-x-3 mt-1 text-xs text-gray-500">
                {item.color && <span>Color: {item.color}</span>}
                {item.size && <span>Size: {item.size}</span>}
                <span>Qty: {item.quantity}</span>
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <p className="text-sm font-medium text-gray-900">
                ₹{lineSelling.toLocaleString("en-IN")}
              </p>
              {showMrp && (
                <p className="text-xs text-gray-400 line-through">
                  ₹{lineMrp.toLocaleString("en-IN")}
                </p>
              )}
              {item.quantity > 1 && (
                <p className="text-xs text-gray-400">
                  ₹{selling.toLocaleString("en-IN")} × {item.quantity}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutItems;
