"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { loginSuccess, logout } from "../store/authslice";
import { restoreAuth } from "../lib/auth";

export default function AuthLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    restoreAuth(dispatch, loginSuccess, logout);
  }, [dispatch]);

  return null;
}