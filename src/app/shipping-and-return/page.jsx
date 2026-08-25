"use client";

import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function ShippingReturn() {
  return (
    <div
      className={`min-h-screen bg-white text-stone-800 ${josefin.className}`}
    >
      <div className="relative w-full h-[240px]   sm:h-[320px] md:h-[350px] overflow-hidden rounded-sm">
        <Image
          src="/images/european-linen.jpg"
          alt="EUROPEAN LINEN"
          fill
          className="w-full h-full md:px-10  object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-200 via-sky-100 to-blue-300" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/1">
          <h3
            className="text-white text-xl sm:text-2xl md:text-3xl font-medium tracking-[0.2em] drop-shadow-xl"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.35)" }}
          >
            Shipping & Return
          </h3>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-14">
        <h1
          className={`${josefin.className} text-center uppercase leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}
        >
          Shipping
        </h1>

        <div className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em]">
          <ul style={{ listStyle: "disc" }}>
            <li>Usually delivery within 5-8 business days.</li>
            <li>Shipping is Free for any number of product.</li>
          </ul>
        </div>

        {/* Shipping Within India */}

        <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
          Actual delivery timelines could vary, usually based on the delivery
          address and during peak shipping periods. In case your pincode is not
          accepted at Checkout, please contact us, we will do our best to
          service your order.  <br />
          For any information, please contact our customer care service at:{" "}
          <br />
          <br />
          Email: contact@dhirago.com, or WhatsApp (+91 8905524932).
        </p>

        {/* International Shipping */}

        {/* Order Communication */}
        <h2 className="text-[13px] font-medium uppercase tracking-wide text-stone-400 mt-12 mb-5">
          Order Communication
        </h2>
        <div className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
          <p>You will receive order related emails in two stages.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>An order confirmation email once you place the order.</li>
            <li>
              A shipment email once the order is dispatched from our studio to
              your address. You will be able to track your order on the website
              of the relevant courier company through the tracking code.
            </li>
            <li>
              Please ensure someone is there at the given address to receive
              your order. Delivery will be attempted two times before the
              shipment is returned to our studio. There will be additional fees
              for further delivery attempts. Please note that we will be unable
              to schedule shipping for orders with incomplete address or wrong
              telephone number.
            </li>
          </ul>
        </div>

        {/* Returns */}
        <h2
          className={`${josefin.className} uppercase leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-3`}
        >
          Returns
        </h2>
        <div className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
          <p>
            We accept returns and exchange within 5 days from the date of
            delivery as long as it meet the eligibility conditions below -
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>The product must be unused, undamaged and unwashed.</li>
            <li>
              All original tags of the product must be intact and attached to
              the product. The tags which are found to be tampered with would
              not be considered as intact.
            </li>
            <li>The product must be returned in its original packaging</li>
            <li>
              Please do not include any other items in the package as these
              could violate Indian shipping regulations as your return may then
              not be accepted by our delivery partner/us.
            </li>
            <p>
              If the above conditions are not satisfied, we will not accept the
              returned product.
            </p>
          </ul>
        </div>

        <h2
          className={`${josefin.className} uppercase leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}
        >
          RETURN PROCESS
        </h2>
        <div className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
          <p>Request. Confirm. Handover. </p>
          <ul className="list-disc pl-5 space-y-2">
          <li>
              Visit our{" "}
              <Link
                href="/return-exchange"
                className="underline text-stone-900"
              >
                Return/Exchange page
              </Link>{" "}
              after your order has been delivered.
            </li>
            <li>
              Submit your request within 5 days from the date of delivery.
            </li>
            <li>Pack the product as originally received.</li>
            <li>
              Hand over the package to our designated logistics partner when
              instructed.
            </li>
            <li>
              The returned product will be received and inspected at our studio.
            </li>
          </ul>
              <p className="mb-4">
            Eligible returns and exchanges are free of cost.
          </p>

          <p className="mb-5">
            A refund will be processed once the returned product is received at
            our studio and is confirmed to meet the applicable return
            conditions.
          </p>

          <p className="mb-5">
            You may also contact our customer care team if you need assistance
            with a return or exchange.
          </p>
          <p className="font-medium text-[#111111]">You can also call or write to us if you need any assistance.</p>
        </div>

          <div>
          <h2
            className={`${josefin.className} uppercase leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}
          >
            CUSTOMER CARE
          </h2>
          <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
            Mobile - (+91 8905524932). <br />
            Email - contact@dhirago.com <br />
            Business Hours <br />
            10 am – 6 pm IST, Monday to Friday <br />
            (Except Indian public holidays)
          </p>
          </div>
      </div>
    </div>
  );
}
