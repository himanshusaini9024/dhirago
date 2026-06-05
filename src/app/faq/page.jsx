"use client";

import { useState, useRef, useEffect } from "react";
import { Josefin_Sans } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const josefin = Josefin_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

const faqData = {
  "SHIPPING & DELIVERY": [
    {
      q: "How long does it take to deliver my order?",
      a: "Most orders arrive within 5–10 days of order being confirmed. An order confirmation SMS/Email will be sent to you, post which an SMS/Email notification will be sent once your order is shipped.",
    },
    {
      q: "What are the delivery charges?",
      a: "A delivery charge of ₹99 will be levied on orders worth ₹2,499 and below. Delivery charges are not refundable in case of such orders.",
    },
    {
      q: "Do you deliver outside India?",
      a: "We only ship within India but accept most international credit cards.",
    },
    {
      q: "What happens when no one is available to accept the shipment?",
      a: "If you are not available, the courier service will notify you and make one additional delivery attempt. After that, your package will be returned to our fulfilment centre. For prepaid orders, a refund will be generated as credits into your website account.",
    },
  ],
  "ORDERS & TRACKING": [
    {
      q: "How do I track my order?",
      a: "You can check the status of your order via the tracking link shared with you via SMS, or by clicking on 'Track' on the top right corner of the homepage. You will be asked to provide your Order No. or AWB No. The tracking link is activated 24 hours after the order is received.",
    },
    {
      q: "Do you split shipments?",
      a: "Sometimes we ship orders in multiple parts so we can get you each part faster. One shipment may therefore arrive in advance of another.",
    },
    {
      q: "My order is delayed — should I wait or cancel?",
      a: "We do our best to deliver within the expected date. If your delivery date has passed and you haven't received your order, please email us at contact@dhirago.com with your tracking number and we will assist you.",
    },
    {
      q: "Can Dhirago cancel my order?",
      a: "Occasionally we may have to cancel an order if the product is out of stock, discontinued, or damaged in transit. For prepaid orders, the amount will be refunded to your payment source.",
    },
    {
      q: "Can I return damaged items?",
      a: "If your order is tampered, opened, or visibly damaged on delivery, please return the order on arrival and notify our team by emailing contact@dhirago.com.",
    },
  ],
  "PAYMENTS": [
    {
      q: "Can I pay on delivery?",
      a: "Pay on Delivery is available in most pin codes we deliver to. You can choose to pay via cash, UPI, Wallet, or Debit Cards.",
    },
    {
      q: "What online payment methods do you accept?",
      a: "We support all major domestic and international credit cards, debit cards, wallets, and net banking.",
    },
  ],
  "RETURNS & CANCELLATIONS": [
    {
      q: "How do I cancel my order?",
      a: "Only orders that haven't left the fulfilment centre can be cancelled. Go to My Account → Orders → Select Product → Cancel. If the order has already shipped, you can refuse delivery and send it back. A refund will be generated once the product is received at our fulfilment centre.",
    },
    {
      q: "How do I return my order?",
      a: "A return request can only be raised 24 hours after receipt of the product and must be submitted within 15 days of delivery. Go to My Account → Orders → Select Product → Return. Once processed, the return will be picked up from your address. You will receive a confirmation via SMS and email.",
    },
    {
      q: "What is your return policy?",
      a: "Most items are eligible for returns except personal use items such as masks, swimwear, innerwear, sunglasses, fragrances, socks, and jewellery. All returned items must be unused, intact, and in their original packaging. Refunds are processed after quality inspection, which may take 5–7 working days after receipt at our fulfilment centre.",
    },
    {
      q: "Can I return sale items?",
      a: "If you used a promo code or discount, you will be credited only for the final amount paid. Products purchased using a Non-Returnable coupon code are final sale and cannot be returned or exchanged.",
    },
  ],
  "REFUNDS": [
    {
      q: "How are Cash on Delivery purchases refunded?",
      a: "You can receive your refund as Dhirago Credits in your website account, or as an account refund via a link sent to your registered email and mobile. Go to My Account → Orders → Select Product → Cancel or Return to choose your preferred method. Note: Refunds are not processed on bank holidays, Sundays, or non-working Saturdays.",
    },
    {
      q: "How are prepaid orders refunded?",
      a: "You can choose to receive the refund back to your original payment source, or as credits in your website account. Go to My Account → Orders → Select Product → Cancel or Return to select your preferred refund method. Back-to-source refunds may take up to 5 days to reflect.",
    },
  ],
  "FAIR USAGE POLICY": [
    {
      q: "What is the fair usage policy?",
      a: "At Dhirago, we strive to offer a seamless shopping experience. However, misuse of services such as free returns or failing to accept pay-on-delivery shipments may result in shipping charges being levied, pay-on-delivery being disabled, or orders not being accepted from certain pincodes or email IDs.",
    },
  ],
  "CONTACT US": [
    {
      q: "How can I reach Dhirago?",
      a: "We'd love to hear from you! Email us at contact@dhirago.com for any query, feedback, or suggestion. You can also call us at +91-8905524932. Our lines are open Monday to Saturday, 10 AM to 7 PM IST, except on National and Public Holidays.",
    },
  ],
};

const categories = Object.keys(faqData);

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [openItem, setOpenItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionRefs = useRef({});
  const tabsScrollRef = useRef(null);

  // Update active category on scroll
  useEffect(() => {
    const handleScroll = () => {
      categories.forEach((key) => {
        const el = sectionRefs.current[key];
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < 200 && rect.bottom > 200) setActiveCategory(key);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll active tab into view on desktop tab bar
  useEffect(() => {
    const container = tabsScrollRef.current;
    if (!container) return;
    const activeBtn = container.querySelector("[data-active='true']");
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeCategory]);

  const scrollTo = (key) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      sectionRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 10);
  };

  return (
    <div className={`min-h-screen bg-[#faf9f7] ${josefin.className}`}>

      {/* ── HERO ── */}
      <div className="w-full border-b border-stone-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-16 py-12 md:py-20 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
          <div>
            <p className="text-[10px] tracking-[0.5em] uppercase text-stone-400 mb-3 md:mb-4">
              Support
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight text-stone-900 uppercase">
              Frequently Asked <br className="hidden sm:block" />
              Questions
            </h1>
          </div>
          <p className="text-[13px] font-light text-stone-400 leading-relaxed md:max-w-xs md:text-right">
            Can't find what you're looking for?{" "}
            <a
              href="/contact"
              className="text-stone-700 underline underline-offset-2 hover:text-stone-900 transition-colors duration-200"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>

      {/* ── STICKY CATEGORY TABS — desktop: scrollable row / mobile: dropdown ── */}
      <div className="w-full bg-white border-b border-stone-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-16">

          {/* MOBILE: dropdown trigger */}
          <div className="flex md:hidden items-center justify-between py-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-stone-900 font-medium">
              {activeCategory}
            </span>
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="text-stone-500 text-xl leading-none px-2"
              aria-label="Toggle FAQ categories"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* MOBILE: dropdown menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden md:hidden border-t border-stone-100"
              >
                <div className="py-2 space-y-0.5">
                  {categories.map((key) => (
                    <button
                      key={key}
                      onClick={() => scrollTo(key)}
                      className={`w-full text-left px-2 py-3 text-[11px] tracking-[0.25em] uppercase transition-colors duration-200 ${
                        activeCategory === key
                          ? "text-stone-900 font-medium"
                          : "text-stone-400 hover:text-stone-700"
                      }`}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* DESKTOP: horizontal scrollable tab row */}
          <div
            ref={tabsScrollRef}
            className="hidden md:flex gap-4 lg:gap-6  scrollbar-hide"
          >
            {categories.map((key) => (
              <button
                key={key}
                data-active={activeCategory === key}
                onClick={() => scrollTo(key)}
                className={`relative py-4 text-[10px] tracking-[0.3em] uppercase shrink-0 transition-colors duration-200 whitespace-nowrap ${
                  activeCategory === key
                    ? "text-stone-900"
                    : "text-stone-400 hover:text-stone-600"
                }`}
              >
                {key}
                {activeCategory === key && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-stone-900"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ SECTIONS ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-16 py-10 md:py-16 space-y-14 md:space-y-20">
        {Object.entries(faqData).map(([category, items]) => (
          <section
            key={category}
            ref={(el) => (sectionRefs.current[category] = el)}
            className="scroll-mt-24"
          >
            {/* Category heading */}
            <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
              <h2 className="text-base md:text-xl font-medium text-stone-700 leading-none shrink-0">
                {category.charAt(0) + category.slice(1).toLowerCase()}
              </h2>
              <div className="flex-1 h-px bg-stone-200" />
              <span className="text-[11px] tracking-widest text-stone-300">
                {items.length.toString().padStart(2, "0")}
              </span>
            </div>

            {/* Accordion items */}
            <div className="divide-y divide-stone-100">
              {items.map((item, i) => {
                const id = `${category}-${i}`;
                const isOpen = openItem === id;
                return (
                  <div key={i}>
                    <button
                      onClick={() => setOpenItem(isOpen ? null : id)}
                      className="w-full flex items-start justify-between gap-4 py-5 md:py-6 text-left group"
                    >
                      <div className="flex items-start gap-3 md:gap-5">
                        <span className="text-[11px] text-stone-300 mt-0.5 shrink-0 tabular-nums hidden sm:block">
                          {(i + 1).toString().padStart(2, "0")}
                        </span>
                        <span className="text-sm md:text-[17px] font-normal text-stone-800 group-hover:text-stone-900 transition-colors duration-200 leading-snug">
                          {item.q}
                        </span>
                      </div>
                      <span
                        className={`text-stone-400 text-xl shrink-0 leading-none mt-0.5 transition-transform duration-300 ${
                          isOpen ? "rotate-45" : "rotate-0"
                        }`}
                      >
                        +
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pl-0 sm:pl-9 pb-5 md:pb-6 pr-4 md:pr-10 text-sm md:text-[15px] font-medium text-stone-600 leading-[1.9]">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* ── CONTACT STRIP ── */}
      <div className="w-full border-t border-stone-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-16 py-10 md:py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-6">
          <div>
            <p className="text-[10px] tracking-[0.45em] uppercase text-stone-400 mb-2">
              Still need help?
            </p>
            <p className="text-xl md:text-[26px] font-light text-stone-900">
              We're here to assist you
            </p>
          </div>
          <a
            href="/contact"
            className="w-full md:w-auto text-center inline-flex items-center justify-center gap-3 border border-stone-900 text-stone-900 px-8 py-3.5 text-[10px] tracking-[0.4em] uppercase hover:bg-stone-900 hover:text-white transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>

    </div>
  );
}