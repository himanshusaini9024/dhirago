"use client";
import { useEffect, useState } from "react";
import API from "../../lib/api";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await API.get("/orders");
    setOrders(res.data);
  };

  return (
    <div className="container py-10">
      <h1 className="text-xl font-semibold mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-xl p-5 bg-white shadow-sm"
          >
            {/* HEADER */}
            <div className="flex justify-between mb-4 text-sm">
              <div>
                <p className="text-gray-500">Order ID</p>
                <p className="font-semibold">{order.order_number}</p>
              </div>

              <div>
                <p className="text-gray-500">Status</p>
                <p className="font-semibold text-green-600">
                  {order.status}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Total</p>
                <p className="font-semibold">₹{order.total_amount}</p>
              </div>
            </div>

            {/* ITEMS */}
            <div className="space-y-3">
              {order.items?.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <img
                    src={item.product?.image}
                    className="w-16 h-16 rounded object-cover"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {item.product?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ₹{item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}