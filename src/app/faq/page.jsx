"use client";

import { useState, useRef, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { Montserrat } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
const faqData = {
  ORDER: [
    {
      q: "HOW DO I PLACE AN ORDER?",
      a: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Select the item you wish to place an order for.</li>
          <li>Add the item to your shopping cart.</li>
          <li>Click on your shopping cart to proceed to checkout.</li>
          <li>Enter your billing & shipping details.</li>
          <li>Select your payment method.</li>
          <li>You will receive order confirmation via email or phone.</li>
        </ul>
      ),
    },
    {
      q: "DO I NEED TO MAKE AN ACCOUNT TO SHOP?",
      a: "No, guest checkout is available but account gives better tracking.",
    },
    {
      q: "CAN I CANCEL MY ORDER?",
      a: "Yes, before shipment. Customized orders cannot be cancelled.",
    },
  ],

  PAYMENTS: [
    {
      q: "WHAT FORMS OF PAYMENT DO YOU ACCEPT?",
      a: "UPI, Credit/Debit Card, Net Banking, Wallets & Cash on Delivery.",
    },
    {
      q: "DO YOU OFFER ANY COUPONS?",
      a: "No, Currently we don't give any Coupon offer.",
    },
  ],

  SHIPPING: [
    {
      q: "WHEN WILL I RECEIVE MY ORDER?",
      a: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Orders ship within 24–48 hours.</li>
          <li>Delivery takes 3–7 days.</li>
          <li>Custom products may take extra 5–7 days.</li>
        </ul>
      ),
    },
    {
      q: "HOW CAN I TRACK MY ORDER?",
      a: "You will receive a tracking link via email after dispatch.",
    },
  ],

  RETURNS: [
    {
      q: "WHEN DO I GET MY EXCHANGE?",
      a: "Exchange is dispatched within 2 days after return is received.",
    },
    {
      q: "CAN I RETURN PRODUCT TO DELIVERY PERSON?",
      a: "No, please create return request via website or support.",
    },
  ],
};

export default function FAQPage() {
  const [active, setActive] = useState("ORDER");
  const sectionRefs = useRef({});
  const [openIndex, setOpenIndex] = useState({});

  // 🔥 SCROLL SPY (exact behavior)
  useEffect(() => {
    const handleScroll = () => {
      Object.keys(sectionRefs.current).forEach((key) => {
        const el = sectionRefs.current[key];
        if (!el) return;

        const rect = el.getBoundingClientRect();
        if (rect.top < 150 && rect.bottom > 150) {
          setActive(key);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggle = (cat, i) => {
    setOpenIndex((prev) => ({
      ...prev,
      [cat]: prev[cat] === i ? null : i, // 🔥 single open
    }));
  };

  return (
    <div className="bg-[#00000] min-h-screen">

      {/* HEADER */}
      <div className="text-center pt-16 pb-16">
        <h1 className={` ${montserrat.className} text-[42px] font-semibold tracking-tight`}>
          FAQ's
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex gap-20">

        {/* 🔥 SIDEBAR */}
        <aside className="hidden md:block w-[180px] pt-10 sticky top-32 h-fit">
          <ul className={` ${montserrat.className} space-y-5 text-[11px] tracking-[0.3em] text-neutral-500 `}>
            {Object.keys(faqData).map((key) => (
              <li key={key}>
                <button
                  onClick={() =>
                    sectionRefs.current[key]?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className={`pb-1 transition  ${montserrat.className}  ${
                    active === key
                      ? "border-b border-black text-black"
                      : "hover:text-black"
                  }`}
                >
                  {key}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* 🔥 CONTENT */}
        <div className="flex-1">
          {Object.entries(faqData).map(([category, items]) => (
            <section
              key={category}
              ref={(el) => (sectionRefs.current[category] = el)}
              className="mb-20"
            >
              {/* CATEGORY TITLE */}
              <h2 className="text-[15px] tracking-wide mb-6">
                {category}
              </h2>

              {/* ACCORDION LIST */}
              <div className="border-t border-neutral-300">
                {items.map((item, i) => {
                  const isOpen = openIndex[category] === i;

                  return (
                    <div
                      key={i}
                      className="border-b border-neutral-300"
                    >
                      <button
                        onClick={() => toggle(category, i)}
                        className="w-full flex justify-between items-center py-5"
                      >
                        <span className="text-[12px] tracking-[0.22em] text-neutral-800">
                          {item.q}
                        </span>

                        <span className="text-lg text-neutral-500">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {/* ANSWER */}
                      {isOpen && (
                        <div className="pb-6 text-[13px] text-neutral-700 leading-relaxed pr-6">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}