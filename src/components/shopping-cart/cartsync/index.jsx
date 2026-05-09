"use client";

import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../../../store/reducers/cart";
import { mergeCartItems } from "../../../utils/megacart";
import API from "../../../lib/api"; 
const CartSync = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);

  // ✅ flags to control flow
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const hasFetched = useRef(false); // prevents multiple fetch
const prevLogin = useRef(false);
  // =========================
  // ✅ FETCH + MERGE (RUN ONCE)
  // =========================
  useEffect(() => {
    if (!isLoggedIn || prevLogin.current) return;
        prevLogin.current = true;
    const fetchCart = async () => {
      try {
        hasFetched.current = true; // 🚀 prevent re-call
  const res = await API.get("/get-cart");
      
     

        const dbCart = res.data.cart || [];
        const guestCart = cartItems || [];
        const mergedCart = mergeCartItems(guestCart, dbCart);

        // ✅ update redux ONLY if changed
        dispatch(setCart(mergedCart));

        setIsCartLoaded(true);
      } catch (err) {
        console.error("Cart fetch/merge error:", err);
      }
    };

    fetchCart();
  }, [isLoggedIn, token]);

  // =========================
  // ✅ SAVE CART (AFTER LOAD)
  // =========================
  useEffect(() => {
    if (!isLoggedIn || !isCartLoaded) return;

    const saveCart = async () => {
      try {
     await API.post("/save-cart", { cart: cartItems });
      } catch (err) {
        console.error("Cart save error:", err);
      }
    };

    saveCart();
  }, [cartItems, isLoggedIn, isCartLoaded, token]);

  return null;
};

export default CartSync;