"use client";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    product: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e51?w=900&q=85&fit=crop",
    ambient: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=900&q=80&fit=crop",
    label: "The Mist Shirt",
    subtitle: "Linen · Sun-washed Yellow",
    tag: "New Season",
    price: "₹ 3,800",
  },
 
  {
    product: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=85&fit=crop",
    ambient: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900&q=80&fit=crop",
    label: "The Dusk Drape",
    subtitle: "Handwoven · Sage Khadi",
    tag: "Limited Edition",
    price: "₹ 6,400",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    if (idx === current || transitioning) return;
    setTransitioning(true);
    setPrev(current);
    setCurrent(idx);
    setTimeout(() => {
      setPrev(null);
      setTransitioning(false);
    }, 1400); // slower transition
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        const next = (c + 1) % slides.length;
        setPrev(c);
        setTransitioning(true);
        setTimeout(() => {
          setPrev(null);
          setTransitioning(false);
        }, 1400);
        return next;
      });
    }, 9000); // slower autoplay

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const slide = slides[current];

  return (
    <section className="hero">
      <div className="split">
        {/* LEFT */}
        <div className="imgWrap">
          <img
            key={`prod-${current}`}
            src={slide.product}
            alt=""
            className="img zoomFade"
          />
        </div>

        {/* RIGHT */}
        <div className="imgWrap">
          <img
            key={`amb-${current}`}
            src={slide.ambient}
            alt=""
            className="img zoomFadeSlow"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="divider" />

      {/* TEXT */}
      <div key={current} className="info">
        <p className="tag">{slide.tag}</p>
        <h1 className="title">{slide.label}</h1>
        <p className="subtitle">{slide.subtitle}</p>

        <div className="ctaRow">
          <button className="btn">Shop Now</button>
          <span className="price">{slide.price}</span>
        </div>
      </div>

      {/* INDICATORS */}
      <div className="indicators">
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className="indicator">
            <span className={i === current ? "activeText" : ""}>
              0{i + 1}
            </span>
            <div className={i === current ? "line active" : "line"} />
          </button>
        ))}
      </div>

      {/* STYLES */}
      <style jsx>{`
        .hero {
          height: 100vh;
          width: 100%;
          overflow: hidden;
          position: relative;
          background: #111;
        }

        .split {
          display: flex;
          height: 100%;
        }

        .imgWrap {
          width: 50%;
          height: 100%;
          overflow: hidden;
          position: relative;
        }

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* 🔥 LUXURY ANIMATIONS */
        .zoomFade {
          animation: zoomFade 8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .zoomFadeSlow {
          animation: zoomFade 10s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes zoomFade {
          0% {
            opacity: 0;
            transform: scale(1.06);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Divider */
        .divider {
          position: absolute;
          left: 50%;
          top: 0;
          width: 1px;
          height: 100%;
          background: rgba(255, 255, 255, 0.3);
          transform: translateX(-50%);
        }

        /* TEXT */
        .info {
          position: absolute;
          bottom: 60px;
          left: 50px;
          color: #faf8f4;
          animation: textUp 1.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .tag {
          font-size: 10px;
          letter-spacing: 0.2em;
          opacity: 0.6;
          margin-bottom: 10px;
        }

        .title {
          font-size: clamp(42px, 5vw, 68px);
          font-weight: 300;
          margin-bottom: 10px;
        }

        .subtitle {
          font-size: 12px;
          letter-spacing: 0.15em;
          margin-bottom: 25px;
          opacity: 0.7;
        }

        .ctaRow {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .btn {
          background: #faf8f4;
          color: #111;
          border: none;
          padding: 12px 26px;
          font-size: 11px;
          letter-spacing: 0.15em;
          cursor: pointer;
        }

        .price {
          font-size: 20px;
          font-style: italic;
        }

        @keyframes textUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* INDICATORS */
        .indicators {
          position: absolute;
          bottom: 70px;
          right: 50px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .indicator {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.4);
        }

        .activeText {
          color: #fff;
        }

        .line {
          width: 12px;
          height: 1px;
          background: rgba(255, 255, 255, 0.3);
          transition: all 0.5s;
        }

        .line.active {
          width: 30px;
          background: #fff;
        }
      `}</style>
    </section>
  );
}