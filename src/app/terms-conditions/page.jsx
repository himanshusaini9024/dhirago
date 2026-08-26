"use client";

import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function TermsConditionPage() {
  return (
    <div
      className={`min-h-screen bg-white text-stone-800 ${josefin.className}`}
    >
      {/* Hero */}
      

        <section className="w-full leading-none">
        <div className="relative w-full sm:h-[320px] md:h-[350px] overflow-hidden rounded-sm">
          <Image
            src={`https://images.dhirago.com/ecommerce/banner/co.webp?${process.env.NEXT_PUBLIC_IMAGE_VERSION}`}
            alt="A young man wearing a handwoven muslin shirt by a lakeside"
            width={2000}
            height={800}
            priority
            sizes="100vw"
            unoptimized
            className="block h-auto w-full object-contain object-center"
          />
          <div className="absolute inset-0  lg:top-[9rem] top-[4rem] flex items-center justify-center bg-black/1">
            <h3
              className="text-white  text-sm sm:text-2xl md:text-2xl font-medium tracking-[0.1em] drop-shadow-xl"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.35)" }}
            >
              Terms & Conditions
            </h3>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-14">
        {/* Last Updated */}
        <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)] text-[#777777] tracking-[0.03em] mb-8">
          Last Updated: August 25, 2026
        </p>

        {/* Introduction */}
        <h1
          className={`${josefin.className} uppercase leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}
        >
          Terms & Conditions
        </h1>

        <div className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)] text-[#444444] tracking-[0.03em] mb-8">
          <p className="mb-5">
            Welcome to{" "}
            <Link
              href="https://www.dhirago.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-stone-900"
            >
              www.dhirago.com
            </Link>
            . This website ("Website/Site") is operated by Dhirago Fashion
            Private Limited ("Dhirago", "We", "Our", or "Us").
          </p>

          <p className="mb-5">
            These Terms & Conditions govern your use of the Dhirago website and
            your purchase of products from us. By accessing or using our
            Website, placing an order, or purchasing our products, you agree to
            be bound by these Terms & Conditions. If you do not agree with these
            terms, please do not use our Website or place an order.
          </p>
        </div>

        {/* 1. About Dhirago */}
        <SectionTitle title="1. About Dhirago" />

        <Content>
          <p className="mb-3">Dhirago is operated by:</p>

          <p className="mb-3">
            <strong>Dhirago Fashion Private Limited</strong>
          </p>

          <p className="mb-3">
            <strong>Business Address:</strong> FLAT NO.502 ARCHI THE
            DIVINE,Udaipur City udaipur Rajasthan 313001 India
          </p>

          <p className="mb-3">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:contact@dhirago.com"
              className="underline text-stone-900"
            >
              contact@dhirago.com
            </a>
          </p>

          <p className="mb-3">
            <strong>Customer Care:</strong>{" "}
            <a href="tel:+918905524932" className="underline text-stone-900">
              +91 8905524932
            </a>
          </p>

          <p className="mb-5">
            <strong>Business Hours:</strong> 10:00 AM – 6:00 PM IST, Monday to
            Saturday, except Indian public holidays.
          </p>
        </Content>

        {/* 2. Website Use */}
        <SectionTitle title="2. Use of Our Website" />

        <Content>
          <p className="mb-4">
            You agree to use the Dhirago Website only for lawful purposes and in
            accordance with these Terms & Conditions.
          </p>

          <p className="mb-3">You must not:</p>

          <ul className="list-disc pl-5 mb-5 space-y-2">
            <li>Use the Website for any unlawful or fraudulent purpose.</li>
            <li>
              Attempt to gain unauthorized access to our Website, systems, or
              customer information.
            </li>
            <li>Interfere with the operation or security of the Website.</li>
            <li>
              Provide false, inaccurate, or incomplete information when placing
              an order.
            </li>
          </ul>

          <p className="mb-5">
            We reserve the right to restrict or terminate access to the Website
            where we reasonably believe these Terms & Conditions have been
            violated.
          </p>
        </Content>

        {/* 3. Products */}
        <SectionTitle title="3. Products and Product Information" />

        <Content>
          <p className="mb-4">
            We make reasonable efforts to ensure that product descriptions,
            images, colours, sizes, measurements, and other product information
            displayed on our Website are accurate.
          </p>

          <p className="mb-3">However:</p>

          <ul className="list-disc pl-5 mb-5 space-y-2">
            <li>
              Colours may appear slightly different depending on your device or
              screen settings.
            </li>
            <li>Product measurements may have minor variations.</li>
            <li>Product availability may change without prior notice.</li>
            <li>
              Handmade, handcrafted, or individually finished products may have
              minor variations that are part of their character.
            </li>
          </ul>

          <p className="mb-5">
            We reserve the right to correct errors, inaccuracies, or omissions
            and to update product information when necessary.
          </p>
        </Content>

        {/* 4. Product Availability */}
        <SectionTitle title="4. Product Availability" />

        <Content>
          <p className="mb-5">
            All products displayed on our Website are subject to availability.
          </p>

          <p className="mb-5">
            Adding a product to your cart does not guarantee that the product
            will remain available until your order is successfully placed.
          </p>

          <p className="mb-5">
            If a product becomes unavailable after an order has been placed, we
            will contact you and provide an appropriate resolution.
          </p>
        </Content>

        {/* 5. Prices and Payments */}
        <SectionTitle title="5. Prices and Payments" />

        <Content>
          <p className="mb-4">
            All product prices displayed on the Website are in Indian Rupees
            (INR).
          </p>

          <p className="mb-4">Shipping is free for all orders.</p>

          <p className="mb-4">
            We reserve the right to change product prices, offers, discounts, or
            promotions at any time. Any price applicable to an order will be the
            price displayed at the time the order is placed.
          </p>

          <p className="mb-5">
            Orders are subject to successful payment confirmation.
          </p>
        </Content>

        {/* 6. Order Confirmation */}
        <SectionTitle title="6. Order Confirmation" />

        <Content>
          <p className="mb-4">
            After successfully placing an order, you will receive an order
            confirmation email at the email address provided during checkout.
          </p>

          <p className="mb-5">
            An order confirmation does not necessarily mean that the order has
            been dispatched. You will receive a separate shipment notification
            once your order has been dispatched from our studio.
          </p>
        </Content>

        {/* 7. Shipping */}
        <SectionTitle title="7. Shipping and Delivery" />

        <Content>
          <p className="mb-4">
            We usually deliver orders within <strong>5–8 business days</strong>.
          </p>

          <p className="mb-4">
            Shipping is <strong>free for any number of products</strong>.
          </p>

          <p className="mb-4">
            Actual delivery timelines may vary depending on the delivery
            address, courier availability, operational circumstances, and peak
            shipping periods.
          </p>

          <p className="mb-4">
            If your pincode is not accepted during checkout, please contact us.
            We will do our best to service your order.
          </p>

          <p className="mb-5">
            For shipping-related information, please contact us at{" "}
            <a
              href="mailto:contact@dhirago.com"
              className="underline text-stone-900"
            >
              contact@dhirago.com
            </a>{" "}
            or WhatsApp{" "}
            <a
              href="https://wa.me/918905524932"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-stone-900"
            >
              +91 8905524932
            </a>
            .
          </p>
        </Content>

        {/* 8. Order Communication */}
        <SectionTitle title="8. Order Communication and Tracking" />

        <Content>
          <p className="mb-3">
            You will receive order-related communication in the following
            stages:
          </p>

          <ol className="list-decimal pl-5 mb-5 space-y-2">
            <li>
              An order confirmation email after you successfully place your
              order.
            </li>
            <li>
              A shipment notification once your order is dispatched from our
              studio.
            </li>
          </ol>

          <p className="mb-5">
            Once your order has been dispatched, you may track your shipment
            using the tracking information provided and the tracking service of
            the relevant courier company.
          </p>
        </Content>

        {/* 9. Delivery Attempts */}
        <SectionTitle title="9. Delivery Attempts and Address Information" />

        <Content>
          <p className="mb-4">
            Please ensure that someone is available at the delivery address to
            receive your order.
          </p>

          <p className="mb-4">
            The courier will generally attempt delivery two times before the
            shipment is returned to our studio.
          </p>

          <p className="mb-4">
            Additional fees may apply for further delivery attempts where
            applicable.
          </p>

          <p className="mb-5">
            We will be unable to schedule shipping for orders containing an
            incomplete delivery address or an incorrect telephone number.
            Customers are responsible for providing accurate and complete
            delivery and contact information at checkout.
          </p>
        </Content>

        {/* 10. Returns */}
        <SectionTitle title="10. Returns and Exchanges" />

        <Content>
          <p className="mb-4">
            We accept eligible returns and exchanges within{" "}
            <strong>5 days from the date of delivery</strong>. The return or
            exchange request can be initiated through our{" "}
            <Link href="/return-exchange" className="underline text-stone-900">
              Return/Exchange page
            </Link>{" "}
            after the order has been delivered.
          </p>

          <p className="mb-3">To be eligible for a return or exchange:</p>

          <ul className="list-disc pl-5 mb-5 space-y-2">
            <li>The product must be unused, undamaged, and unwashed.</li>
            <li>
              All original product tags must remain intact and attached to the
              product.
            </li>
            <li>
              Tags that have been removed, damaged, or tampered with will not be
              considered intact.
            </li>
            <li>The product must be returned in its original packaging.</li>
            <li>
              No unrelated items should be included in the return package, as
              this may violate applicable shipping regulations and may result in
              the return being rejected by our logistics partner or us.
            </li>
          </ul>

          <p className="mb-5">
            If the returned product does not satisfy the above conditions, we
            may refuse to accept the return or exchange.
          </p>
        </Content>

        {/* 11. Return Process */}
        <SectionTitle title="11. Return and Exchange Process" />

        <Content>
          <p className="mb-4">The return or exchange process is:</p>

          <p className="mb-3">
            Once your order has been delivered, you can initiate a return or
            exchange request by following these steps:
          </p>

          <ol className="list-decimal pl-5 mb-5 space-y-3">
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
          </ol>

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
        </Content>

        {/* 12. Refunds */}
        <SectionTitle title="12. Refunds" />

        <Content>
          <p className="mb-4">
            For eligible returns, the refund will be processed after the
            returned product is received at our studio and successfully passes
            the applicable eligibility checks.
          </p>

          <p className="mb-5">
            The time taken for the refunded amount to reflect in your account
            may depend on the payment method and the relevant payment service
            provider or bank.
          </p>
        </Content>

        {/* 13. Damaged Products */}
        <SectionTitle title="13. Incorrect, Damaged, or Defective Products" />

        <Content>
          <p className="mb-4">
            If you receive an incorrect, damaged, or defective product, please
            contact us as soon as possible at:
          </p>

          <p className="mb-5">
            <a
              href="mailto:contact@dhirago.com"
              className="underline text-stone-900"
            >
              contact@dhirago.com
            </a>{" "}
            or WhatsApp{" "}
            <a
              href="https://wa.me/918905524932"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-stone-900"
            >
              +91 8905524932
            </a>
            .
          </p>

          <p className="mb-5">
            We may request relevant information, photographs, videos, order
            details, or other evidence to assess the issue and determine the
            appropriate resolution.
          </p>
        </Content>

        {/* 14. Customer Responsibilities */}
        <SectionTitle title="14. Customer Responsibilities" />

        <Content>
          <p className="mb-3">
            When placing an order, you are responsible for providing accurate:
          </p>

          <ul className="list-disc pl-5 mb-5 space-y-2">
            <li>Full name</li>
            <li>Delivery address</li>
            <li>Pincode</li>
            <li>Telephone/mobile number</li>
            <li>Email address</li>
            <li>
              Other information required to process and deliver your order
            </li>
          </ul>

          <p className="mb-5">
            Dhirago will not be responsible for delivery issues caused by
            incorrect, incomplete, or inaccurate information provided by the
            customer.
          </p>
        </Content>

        {/* 15. Intellectual Property */}
        <SectionTitle title="15. Intellectual Property" />

        <Content>
          <p className="mb-5">
            All content available on the Dhirago Website, including but not
            limited to product photographs, images, logos, graphics, text,
            designs, branding, and other materials, is owned by or licensed to
            Dhirago Fashion Private Limited unless otherwise stated.
          </p>

          <p className="mb-5">
            You may not reproduce, copy, modify, distribute, publish, sell, or
            commercially use our content without prior written permission.
          </p>
        </Content>

        {/* 16. Website Availability */}
        <SectionTitle title="16. Website Availability" />

        <Content>
          <p className="mb-5">
            We make reasonable efforts to keep the Website available and
            functioning properly. However, we do not guarantee that the Website
            will always be available, uninterrupted, secure, or free from
            errors.
          </p>

          <p className="mb-5">
            The Website may occasionally be unavailable due to maintenance,
            technical issues, updates, or circumstances beyond our reasonable
            control.
          </p>
        </Content>

        {/* 17. Third Party */}
        <SectionTitle title="17. Third-Party Services" />

        <Content>
          <p className="mb-5">
            Our Website may use third-party services such as payment providers,
            logistics partners, analytics services, or other service providers.
          </p>

          <p className="mb-5">
            Your use of such third-party services may also be subject to their
            respective terms and policies.
          </p>
        </Content>

        {/* 18. Liability */}
        <SectionTitle title="18. Limitation of Liability" />

        <Content>
          <p className="mb-5">
            To the extent permitted by applicable law, Dhirago Fashion Private
            Limited will not be liable for indirect, incidental, or
            consequential losses arising from the use of our Website or
            services, except where such liability cannot legally be excluded.
          </p>

          <p className="mb-5">
            Nothing in these Terms & Conditions is intended to exclude or limit
            any rights or protections available to consumers under applicable
            Indian law.
          </p>
        </Content>

        {/* 19. Changes */}
        <SectionTitle title="19. Changes to These Terms" />

        <Content>
          <p className="mb-5">
            We may update these Terms & Conditions from time to time to reflect
            changes to our services, policies, legal requirements, or business
            practices.
          </p>

          <p className="mb-5">
            Any updated version will be published on this page with a revised
            "Last Updated" date.
          </p>

          <p className="mb-5">
            Your continued use of the Website after an update constitutes
            acceptance of the updated Terms & Conditions.
          </p>
        </Content>

        {/* 20. Governing Law */}
        <SectionTitle title="20. Governing Law" />

        <Content>
          <p className="mb-5">
            These Terms & Conditions shall be governed by and interpreted in
            accordance with the applicable laws of India.
          </p>

          <p className="mb-5">
            Any disputes arising in connection with these Terms & Conditions or
            your use of the Website shall be subject to the jurisdiction of the
            competent courts having jurisdiction over the registered/business
            office of Dhirago Fashion Private Limited, subject to applicable
            law.
          </p>
        </Content>

        {/* 21. Contact */}
        <SectionTitle title="21. Contact Us" />

        <Content>
          <p className="mb-4">
            If you have any questions regarding these Terms & Conditions, your
            order, shipping, returns, or exchanges, please contact us:
          </p>

          <p className="mb-2">
            <strong>Dhirago Fashion Private Limited</strong>
          </p>

          <p className="mb-2">
            Email:{" "}
            <a
              href="mailto:contact@dhirago.com"
              className="underline text-stone-900"
            >
              contact@dhirago.com
            </a>
          </p>

          <p className="mb-2">
            WhatsApp:{" "}
            <a
              href="https://wa.me/918905524932"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-stone-900"
            >
              +91 8905524932
            </a>
          </p>

          <p className="mb-2">
            Business Hours: 10:00 AM – 6:00 PM IST, Monday to Saturday
          </p>

          <p className="mb-5">Except Indian public holidays.</p>

          <p>
            <strong>Business Address:</strong> [BUSINESS ADDRESS]
          </p>
        </Content>
      </div>
    </div>
  );
}

/* Reusable Section Heading */
function SectionTitle({ title }) {
  return (
    <h2
      className={`${josefin.className} uppercase leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}
    >
      {title}
    </h2>
  );
}

function Content({ children }) {
  return (
    <div className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)] text-[#444444] tracking-[0.03em] mb-8">
      {children}
    </div>
  );
}
