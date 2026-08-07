"use client";

import { some } from "lodash";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { addProduct } from "../../../store/reducers/cart";
import { toggleFavProduct } from "../../../store/reducers/user";
import { event } from "../../../lib/gtag";
import productsColors from "../../../utils/data/products-colors";
import productsSizes from "../../../utils/data/products-sizes";
import MensSizeChart from "../MensSizeChart";
import { fbEvent } from "../../../lib/facebookPixel";
import { sendMetaEvent } from "../../../lib/meta";
const F = "'Josefin Sans', sans-serif";

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const check = () => setM(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return m;
}
const BORDER = "0.5px solid #dedad2";

const SectionLabel = ({ children }) => (
  <p
    style={{
      margin: 0,
      fontSize: "11.5px",
      letterSpacing: "0.26em",
      textTransform: "uppercase",
      color: "#111111",
      fontFamily: F,
      fontWeight: 400,
    }}
  >
    {children}
  </p>
);

const HR = () => (
  <div style={{ width: "100%", height: "0.5px", background: "#dedad2" }} />
);

// ── Accordion with single-open control ───────────────────────────────────────
function AccordionRow({ title, children, isOpen, onToggle }) {
  return (
    <>
      <HR />
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "13px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: F,
        }}
      >
        <span
          style={{
            fontSize: "10px",
            fontWeight: 400,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#1a1a1a",
            fontFamily: F,
          }}
        >
          {title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.16 }}
          style={{ fontSize: "16px", color: "#c0bbb3", lineHeight: 1 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingBottom: "18px" }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Content({ product }) {

  useEffect(() => {
    fbEvent("ViewContent", {
        content_ids: [product.id],
        content_name: product.name,
        content_type: "product",
        value: product.currentPrice,
        currency: "INR",
    });
}, []);

  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const [openSizeChart, setOpenSizeChart] = useState(false);
  const [itemSize, setItemSize] = useState("");
  const [sizeError, setSizeError] = useState("");
  const [color, setColor] = useState("");
  // single open accordion: null | "care" | "shipment" | "returns"
  const [openAccordion, setOpenAccordion] = useState("details");

  const toggleAccordion = (key) =>
    setOpenAccordion((prev) => (prev === key ? null : key));

  const variants = useMemo(() => {
    const sizes = product.sizes?.split(",") || [];
    const colors = product.colors?.split(",") || [];
    return colors.flatMap((c) =>
      sizes.map((s) => ({
        color: c.trim().toLowerCase(),
        size: s.trim().toLowerCase(),
        price: product.price,
        stock: product.quantityAvailable,
      })),
    );
  }, [product]);

  const availableColors = [...new Set(variants.map((v) => v.color))];
  useEffect(() => {
    if (variants.length) setColor(variants[0].color);
  }, [variants]);

  const favProducts = useSelector((s) => s.user?.favProducts || []);
  const isFav = some(favProducts, (id) => id === product.id);

  const measurements = useMemo(() => {
    try {
      if (!product?.measurements) return null;
      return typeof product.measurements === "object"
        ? product.measurements
        : JSON.parse(product.measurements);
    } catch {
      return null;
    }
  }, [product]);

  const sizeGuide = useMemo(() => {
    return product?.size_guide || measurements || null;
  }, [product, measurements]);

  const hasSizeGuide = useMemo(() => {
    const dims = sizeGuide?.dimensions;
    return Array.isArray(dims) && dims.some((d) => (d?.name || "").trim());
  }, [sizeGuide]);

  const addToCart = async ()  => {
      const eventID = crypto.randomUUID();

    if (!itemSize) {
      setSizeError("Please select your size");
      return;
    }
    fbEvent("AddToCart", {
    content_ids: [product.id],
    content_name: product.name,
    value: product.currentPrice,
    currency: "INR",
},eventID);

 await sendMetaEvent({
    event_name: "AddToCart",
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventID,
    action_source: "website",
    custom_data: {
      content_ids: [product.id],
      content_name: product.name,
      currency: "INR",
      value: product.currentPrice,
    },
  });

    setSizeError("");
    event({
      action: "add_to_cart",
      category: product.category,
      label: product.name,
      value: product.price,
    });
    dispatch(
      addProduct({
        count: 1,
        product: {
          id: product.id,
          name: product.name,
          sku: product.sku,
          thumb: product.images?.[0] || "",
          price: product.price,
          slug: product.slug,
          category: product.category || null,
          color: color.toLowerCase(),
          size: itemSize.toLowerCase(),
        },
      }),
    );
  };

  const prose = {
    fontSize: "14px",
    lineHeight: "1.7",
    color: "#555",
    fontWeight: 400,
    fontFamily: F,
  };

  const CareSection = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
      <p style={prose}>
        It is advisable to wash this garment separately and do not expose it to
        direct sunlight as it could lead to variation in colour.
      </p>
      {[
        {
          label: "Do not bleach",
          icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M8 4h8l-1.5 4H9.5L8 4z" stroke="#555" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M7 9h10l-1.2 9.2a2 2 0 0 1-2 1.8h-3.6a2 2 0 0 1-2-1.8L7 9z" stroke="#555" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M5 5l14 14" stroke="#555" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ),
        },
        {
          label: "Iron or steam with warm heat",
          icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 14h13a4 4 0 0 0 0-8H9" stroke="#555" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M4 14v2a2 2 0 0 0 2 2h10" stroke="#555" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M8 18v2M12 18v2M16 18v2" stroke="#555" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          ),
        },
        {
          label: "Separately hand wash",
          icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M8 11c0-2 1.5-3.5 3.5-3.5S15 9 15 11v1" stroke="#555" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M7 12h9.5a2.5 2.5 0 0 1 0 5H9a3 3 0 0 1-3-3v-1.2A1.8 1.8 0 0 1 7.8 11" stroke="#555" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 7.5V5.8M12 7V5M15 7.5V6" stroke="#555" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          ),
        },
      ].map((item, i) => (
        <div
          key={i}
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              flexShrink: 0,
              background: "#f4f1ea",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.icon}
          </div>
          <span style={prose}>{item.label}</span>
        </div>
      ))}
      <div style={{ borderTop: BORDER, paddingTop: "10px" }}>
        <p style={prose}>
          NOTE:
          <br />
          Colour bleeding is normal in naturally dyed garments in the initial
          washes after which the colours stabilise. The fading and bleeding of
          the natural dyes result in graceful fades with the passage of time.
        </p>
      </div>
    </div>
  );

  return (
    <>
      <section style={{ width: "100%", fontFamily: F }}>
        {/* NAME */}
        <h1
          style={{
            fontSize: isMobile ? "14px" : "15px",
            fontWeight: 400,
            textTransform: "uppercase",
            color: "#111",
            lineHeight: 1.45,
            margin: "0 0 4px",
            fontFamily: F,
          }}
        >
          {product.name}
        </h1>

        {/* SKU */}
        {product.sku && (
          <p
            className="!mt-4"
            style={{
              fontSize: "13.3px",
              color: "#rgb(28,28,28)",
              fontWeight: 450,
              textTransform: "uppercase",
              margin: "0 0 10px",
              fontFamily: F,
            }}
          >
            SKU: {product.sku}
          </p>
        )}

        {/* PRICE */}
        <div
          className="!mt-6"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "18px",
          }}
        >
          <span
            style={{
              fontSize: isMobile ? "17px" : "19px",
              color: "rgb(28,28,28,0.65)",
              letterSpacing: "0.01em",
              fontWeight: 480,
              fontFamily: F,
            }}
          >
            RS. {product.price?.toLocaleString("en-IN")}.00
          </span>
        </div>

        {/* COLOUR */}
        {availableColors.length > 1 && (
          <div style={{ marginBottom: "16px" }}>
            <SectionLabel>
              Colour —{" "}
              <span style={{ textTransform: "capitalize", color: "#666" }}>
                {color}
              </span>
            </SectionLabel>
            <div style={{ display: "flex", gap: "7px", marginTop: "7px" }}>
              {availableColors.map((val, i) => {
                const obj = productsColors.find(
                  (c) => c.label.toLowerCase() === val,
                );
                if (!obj) return null;
                return (
                  <button
                    key={i}
                    onClick={() => setColor(val)}
                    aria-label={val}
                    style={{
                      width: "19px",
                      height: "19px",
                      borderRadius: "50%",
                      background: obj.color,
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      boxShadow:
                        color === val
                          ? "0 0 0 1.5px #fff, 0 0 0 2.5px #333"
                          : "0 0 0 1px rgba(0,0,0,0.12)",
                      transition: "box-shadow 0.18s",
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* SIZE */}
        <div className="!mt-8" style={{ marginBottom: "12px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "7px",
            }}
          >
            <SectionLabel>Size:</SectionLabel>
            {hasSizeGuide && (
              <button
                onClick={() => setOpenSizeChart(true)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  fontSize: "13.5px",
                  color: "#666",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                  fontFamily: F,
                }}
              >
                View Size Guide
              </button>
            )}
          </div>

          <div style={{ position: "relative" }}>
            <select
              value={itemSize}
              onChange={(e) => {
                setItemSize(e.target.value);
                setSizeError("");
              }}
              style={{
                width: "100%",
                height: "40px",
                border: sizeError ? "1px solid #c0392b" : "1px solid #d5d0c8",
                padding: "0 32px 0 10px",
                fontSize: "13px",
                color: "#111",
                fontFamily: F,
                fontWeight: 300,
                background: "#fff",
                appearance: "none",
                WebkitAppearance: "none",
                cursor: "pointer",
                outline: "none",
                letterSpacing: "0.06em",
                borderRadius: 0,
              }}
            >
              <option value="">Select Size</option>
              {productsSizes.map((type) => (
                <option key={type.id} value={type.label.toLowerCase()}>
                  {type.label}
                </option>
              ))}
            </select>
            <div
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                fontSize: "10px",
                color: "#999",
              }}
            >
              ▾
            </div>
          </div>
          {sizeError && (
            <p
              style={{
                fontSize: "9.5px",
                color: "#c0392b",
                margin: "5px 0 0",
                fontFamily: F,
              }}
            >
              {sizeError}
            </p>
          )}
        </div>

        <br />
        <br />

        {/* ADD TO CART */}
        <button
          onClick={addToCart}
          style={{
            width: "100%",
            height: isMobile ? "50px" : "46px",
            background: "#1a1a1a",
            color: "#fff",
            border: "none",
            fontSize: "11px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: F,
            fontWeight: 600,
            marginBottom: "7px",
            transition: "background 0.18s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#1a1a1a")}
        >
          Add to Cart
        </button>

        <br />
        <br />

        {/* MEET THE MAKERS */}
        {/* <button
          style={{
            width: "100%",
            height: isMobile ? "46px" : "42px",
            background: "transparent",
            color: "#1a1a1a",
            border: "1px solid #d5d0c8",
            fontSize: "11px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: F,
            fontWeight: 400,
            marginBottom: "23px",
            transition: "border-color 0.18s",
            borderRadius: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#555")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#d5d0c8")}
        >
          Meet the Makers
        </button> */}

        {/* <div style={{ textAlign: "center", marginBottom: "18px" }}>
          <p
            style={{
              fontSize: "17.5px",
              color: "#111",
              margin: "0 0 7px",
              fontFamily: F,
              letterSpacing: "0.03em",
            }}
          >
            Meticulously Crafted By Artisans
          </p>
          <p
            style={{
              fontSize: "17.5px",
              color: "#c0bbb3",
              margin: 0,
              fontFamily: F,
              fontWeight: 350,
            }}
          >
            Know More About Them On The Link Above
          </p>
        </div> */}

        {/* ACCORDIONS — single open at a time */}
        <AccordionRow
          title="Product Details"
          isOpen={openAccordion === "details"}
          onToggle={() => toggleAccordion("details")}
        >
          <div
            style={{
              fontSize: "14px",
              lineHeight: "2.4",
              color: "#555555",
              fontWeight: 400,
              fontFamily: F,
            }}
            dangerouslySetInnerHTML={{
              __html: product?.description || "No description available.",
            }}
          />
          {/* {measurements && (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "12px",
              }}
            >
              <tbody>
                {Object.entries(measurements).map(([k, v]) => (
                  <tr key={k} style={{ borderBottom: BORDER }}>
                    <td
                      style={{
                        padding: "7px 0",
                        fontSize: "10.5px",
                        color: "#a8a49c",
                        textTransform: "capitalize",
                        fontFamily: F,
                      }}
                    >
                      {k.replace(/_/g, " ")}
                    </td>
                    <td
                      style={{
                        padding: "7px 0",
                        fontSize: "10.5px",
                        color: "#1a1a1a",
                        textAlign: "right",
                        fontFamily: F,
                      }}
                    >
                      {v}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )} */}
        </AccordionRow>

        <AccordionRow
          title="Wash Care for Cotton"
          isOpen={openAccordion === "care"}
          onToggle={() => toggleAccordion("care")}
        >
          <CareSection />
        </AccordionRow>

        <AccordionRow
          title="Shipment and Delivery"
          isOpen={openAccordion === "shipment"}
          onToggle={() => toggleAccordion("shipment")}
        >
          <div style={prose}>
            <p style={{ margin: "0 0 6px" }}>
              Ready-to-ship styles dispatch in 5–8 days.
            </p>
            <p style={{ margin: "0 0 6px" }}>
              Express delivery 4–5 business days across India after dispatch.
            </p>
            <p style={{ margin: 0 }}>
              For changes email&nbsp;
              <a
                href="mailto:brahaanbynarains@gmail.com"
                style={{
                  color: "#111",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                contact@dhirago.com
              </a>
            </p>
          </div>
        </AccordionRow>

        <AccordionRow
          title="Return and Exchange"
          isOpen={openAccordion === "returns"}
          onToggle={() => toggleAccordion("returns")}
        >
          <div style={prose}>
            <p style={{ margin: "0 0 6px" }}>
              Refunds and returns possible in certain situations. Fitting
              alterations can be arranged.
            </p>
            <p style={{ margin: 0 }}>
              <a
                href={`${baseUrl}/shipping-and-return`}
                target="_blank"
                style={{
                  color: "#111",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Read full policy →
              </a>
            </p>
          </div>
        </AccordionRow>

        <HR />
      </section>

      {/* SIZE CHART MODAL */}
      <AnimatePresence>
        {openSizeChart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9990,
              background: "rgba(0,0,0,0.38)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "end",
            }}
          >
            <motion.div
              initial={{ scale: 0.94, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 18 }}
              transition={{ duration: 0.2 }}
              className="
bg-white
w-full
md:w-[41%]
max-w-[820px]
relative
h-[90vh]
md:h-[83vh]
overflow-y-auto
rounded-t-lg
md:rounded-none
"
            >
              <button
                onClick={() => setOpenSizeChart(false)}
                className="px-1 py-1 absolute top-[12px] right-[10px] md:right-[6px]"
                style={{

                  background: "black",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "22px",
                  color: "#ffffff",
                }}
              >
                ✕
              </button>
              <MensSizeChart
                sizeGuide={sizeGuide}
                productName={product?.name}
                productSizes={product?.sizes}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
