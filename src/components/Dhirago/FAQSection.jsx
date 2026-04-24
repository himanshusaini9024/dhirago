"use client";
import { useState } from "react";

const faqs = [
  { q: "How can I track my order?", a: "Once your order is shipped, you'll receive a tracking number via email. You can use this to track your order on our website or the courier's site." },
  { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, UPI, net banking, and popular wallets like Paytm and PhonePe." },
  { q: "Can I modify or cancel my order after placing it?", a: "Orders can be modified or cancelled within 12 hours of placement. Please contact our support team immediately for assistance." },
  { q: "What is your return policy?", a: "We offer 30-day hassle-free returns on all items. Products must be unworn, unwashed, and in original packaging with tags attached." },
  { q: "Do you offer international shipping?", a: "Yes! We ship to over 50 countries worldwide. International shipping rates and delivery times vary by location." },
];

export default function FAQSection() {
  const [open, setOpen] = useState(null); // ✅ FIXED

  return (
    <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 mt-3 text-sm sm:text-base">
            Everything you need to know about shopping with Maya.
          </p>
        </div>

        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                className="w-full flex items-center justify-between text-left gap-4 py-5 sm:py-6"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-sm sm:text-base text-gray-900 pr-2">
                  {faq.q}
                </span>

                <span
                  className={`w-8 h-8 rounded-full border-2 border-gray-900 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                    open === i ? "rotate-45" : ""
                  }`}
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 4v16M4 12h16"
                    />
                  </svg>
                </span>
              </button>

              {open === i && (
                <p className="pb-5 text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}