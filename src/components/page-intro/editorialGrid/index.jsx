"use client";

import { Josefin_Sans } from "next/font/google";
// const IMAGES = ["/images/bg2.avif", "/images/bg3.avif"];

import { motion } from "framer-motion";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
export default function RunwayHero() {
  return (
    <section className="runway">
      {/* Single Background Image */}
      <div
        className="bg"
        style={{
          backgroundImage: `url("/images/bg2.avif")`,
        }}
      />

      {/* Soft overlay */}
      <div className="overlay" />

      {/* Content */}
  
      <style jsx>{`
        .runway {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          background: #ede7df;
        }

        /* Background */
        .bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        /* Simple luxury overlay */
        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(245, 240, 233, 0.444);
        }

        /* Content wrapper */
        .contentWrap {
          position: relative;
          z-index: 2;
          width: 100%;
          min-height: 100vh;

          display: flex;
          align-items: center;
          justify-content: flex-end;

          padding: 6vw;
        }

        /* Content */
        .content {
          width: 100%;
          max-width: 620px;
        }

        /* Small label */
        .eyebrow {
          display: inline-block;
          margin-bottom: 22px;

          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;

          color: #5e564e;
        }

        /* Heading */
        .title {
          margin: 0;

          font-size: clamp(1rem, 7vw, 2rem);
          line-height: 0.92;
          font-weight: 100;
          letter-spacing: -0.06em;

          color: #15120f;
        }

        /* Divider */
        .line {
          width: 90px;
          height: 1px;

          background: rgba(0, 0, 0, 0.22);

          margin: 34px 0;
        }

        /* Description */
        .desc {
          max-width: 560px;

          font-size: clamp(0.95rem, 1.1vw, 1.08rem);
          line-height: 2;
          letter-spacing: 0.01em;

          color: #2d2823;
        }

        .desc strong {
          font-weight: 500;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .contentWrap {
            justify-content: center;
            padding: 80px 40px;
          }

          .content {
            max-width: 100%;
          }

          .title {
            font-size: clamp(3rem, 10vw, 5rem);
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .runway {
            min-height: 100svh;
          }

          .contentWrap {
            align-items: flex-end;
            justify-content: center;

            padding: 100px 22px 50px;
          }

          .content {
            background: rgba(248, 244, 239, 0.58);
            backdrop-filter: blur(10px);

            border-radius: 28px;
            padding: 28px;
          }

          .eyebrow {
            font-size: 10px;
            letter-spacing: 0.22em;
            margin-bottom: 18px;
          }

          .title {
            font-size: clamp(2.6rem, 14vw, 4rem);
            line-height: 0.95;
          }

          .line {
            width: 70px;
            margin: 24px 0;
          }

          .desc {
            font-size: 0.92rem;
            line-height: 1.9;
          }
        }

        /* Small Mobile */
        @media (max-width: 480px) {
          .content {
            padding: 24px 20px;
            border-radius: 24px;
          }

          .title {
            font-size: 2.4rem;
          }

          .desc {
            font-size: 0.88rem;
            line-height: 1.8;
          }
        }
      `}</style>
    </section>
  );
}