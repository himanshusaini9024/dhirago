"use client";
import { useEffect, useState } from "react";
import LoginPopup from "../../components/loginpopup/index";
import { useSelector } from "react-redux";

export default function PopupProvider({ children }) {
  const [showPopup, setShowPopup] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const handleScroll = () => {
      // const isLoggedIn = localStorage.getItem("isLoggedIn");

      let popupCount = parseInt(localStorage.getItem("popupCount")) || 0;

      if (!isLoggedIn && popupCount < 2 && !hasTriggered) {
        if (window.scrollY > 300) {
          setHasTriggered(true);

          setTimeout(() => {
            setShowPopup(true);

            popupCount += 1;
            localStorage.setItem("popupCount", popupCount);
          }, 500);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasTriggered]);

  // 🔁 Reopen after close (15 sec)
  const handleClose = () => {
    setShowPopup(false);

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    let popupCount = parseInt(localStorage.getItem("popupCount")) || 0;

    if (!isLoggedIn && popupCount < 2) {
      setTimeout(() => {
        setShowPopup(true);

        popupCount += 1;
        localStorage.setItem("popupCount", popupCount);
      }, 15000); // ⏱️ 15 seconds
    }
  };

  return (
    <>
      {children}
      <LoginPopup
        isOpen={showPopup}
        onClose={handleClose}
      />
    </>
  );
}