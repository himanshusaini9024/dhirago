"use client";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export default function ShippingReturn() {
  return (
    <div className={`min-h-screen bg-white text-stone-800 ${josefin.className}`}>

      <div className="w-full bg-stone-100 py-10 text-center border-b border-stone-200">
        <h1 className="text-[26px] font-normal tracking-wide text-stone-900 uppercase">Shipping & Return</h1>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-10 py-14">

        <h1 className={`text-[22px] font-semibold uppercase  underline text-center tracking-wide text-stone-900 mb-8`}>
          Shipping
        </h1>

        <div className="lg:text-[17px] text-[14px] text-align font-medium leading-[2.2] text-stone-700 space-y-4">
          <p>
            We ship in 7 - 14 working days from the date of order. Our working days are Monday - Friday. Styles on pre order and embroidered styles have a dispatch time of 4 weeks.
          </p>
          <p>
            For queries, WhatsApp <a href="https://wa.me/918050414566" className="underline text-stone-900">+91 80504 14566</a>.
          </p>
        </div>

        {/* Shipping Within India */}
        <h2 className="text-[18px] font-medium uppercase tracking-wide text-stone-400 mt-12 mb-5">
          Shipping Within India
        </h2>
        <p className="lg:text-[17px] text-[14px] font-medium leading-[1.9] text-stone-700">
          Enjoy free shipping within India when you pay online via debit card, credit card, Paypal, net banking or bank transfer. Flat Shipping charges of INR 300 on all COD orders.
        </p>

        {/* International Shipping */}
        <h2 className="text-[18px] font-medium uppercase tracking-wide text-stone-400 mt-12 mb-5">
          International Shipping
        </h2>
        <div className="lg:text-[17px] text-[14px] font-medium leading-[1.9] text-stone-700 space-y-4">
          <p>We offer free shipping worldwide.</p>
          <p>
            Any applicable Customs, Duties and Tariffs as mandated by the country of delivery will be borne by the customer once the shipment reaches the country of delivery. In case of non-payment of duties and taxes to receive the shipment, The Summer House will not process a refund, exchange or store credit for the same.
          </p>
          <p>
            Orders from USA will incur additional duties, taxes, tariffs and customs as per new US regulations.
          </p>
        </div>

        {/* Order Communication */}
        <h2 className="text-[18px] font-medium uppercase tracking-wide text-stone-400 mt-12 mb-5">
          Order Communication
        </h2>
        <div className="lg:text-[17px] text-[14px] font-medium leading-[1.9] text-stone-700 space-y-4">
          <p>You will receive order related emails in two stages.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>An order confirmation email once you place the order.</li>
            <li>A shipment email once the order is dispatched from our studio to your address. You will be able to track your order on the website of the relevant courier company through the tracking code in the second email.</li>
          </ul>
          <p>
            Please ensure someone is there at the given address to receive your order. Delivery will be attempted two times before the shipment is returned to our studio. There will be additional fees for further delivery attempts. Please note that we will be unable to schedule shipping for orders with incomplete address or wrong telephone number.
          </p>
          <p>
            If you desire express shipping, please write to <a href="mailto:friends@thesummerhouse.in?subject=EXPRESS SHIPPING" className="underline text-stone-900">friends@thesummerhouse.in</a> with subject: EXPRESS SHIPPING, to inquire about the additional charges to your city.
          </p>
        </div>

        {/* Order Cancellation */}
        <h2 className="text-[18px] font-semibold text-center underline uppercase tracking-wide text-stone-900 mt-12 mb-5">
          Order Cancellation
        </h2>
        <p className="lg:text-[17px] text-[14px] font-medium leading-[1.9] text-stone-700">
          If you wish to cancel your order, write to us within 24 hours of placing the order at <a href="mailto:friends@thesummerhouse.in" className="underline text-stone-900">friends@thesummerhouse.in</a>.
        </p>

        {/* Refund */}
        <h2 className="text-[18px] font-semibold text-center underline uppercase tracking-wide text-stone-900 mt-12 mb-5">
          Refund
        </h2>
        <p className="lg:text-[17px] text-[14px] font-medium leading-[1.9] text-stone-700">
          We do not offer refunds on orders due to the time and labor that goes into each product. Refunds are only processed based on fulfillment errors, such as incorrectly shipped or missing items. The amount will be refunded via the original mode of payment within one week of initiation.
        </p>

        {/* Returns */}
        <h2 className="text-[18px] font-semibold text-center underline uppercase tracking-wide text-stone-900 mt-12 mb-5">
          Returns
        </h2>
        <div className="lg:text-[17px] text-[14px] font-medium leading-[1.9] text-stone-700 space-y-4">
          <p>
            Every single piece designed &amp; produced in The Summer House goes through stringent quality checks. Unevenness in colour &amp; texture of print is not a fault but a beautiful characteristic of natural processes.
          </p>
          <p>
            Any purchase can be returned for store credit valid for six months from the date of issue or exchanged for a different size. In case of exchanges where the size is not available, we shall provide you a store credit valid for six months from the date of issue. You can see our size chart <a href="/pages/size-chart" className="underline text-stone-900" target="_blank">here</a> before making a purchase. If you have any inquiries about size, fabric or fit, you can WhatsApp us on <a href="https://wa.me/918050414566" className="underline text-stone-900">+91 80504 14566</a> or email our customer care at <a href="mailto:friends@thesummerhouse.in" className="underline text-stone-900">friends@thesummerhouse.in</a>.
          </p>
          <p>
            Discounted styles and Swimwear are not eligible for returns or exchanges.
          </p>
          <p>
            All orders go through a stringent quality check before shipping. However, in the off chance that you have received a damaged product, please notify us at <a href="mailto:friends@thesummerhouse.in" className="underline text-stone-900">friends@thesummerhouse.in</a> within 3 days of receiving the order.
          </p>
          <p>
            In case of either damaged product return or size exchange, please write to <a href="mailto:friends@thesummerhouse.in?subject=RETURNS" className="underline text-stone-900">friends@thesummerhouse.in</a> with subject: RETURNS. Clothing sent to us without a prior email will not be accepted. The Summer House must be notified within three days of receipt of clothes about your intent to return or exchange. Once the email is received, we accept returns within 10 days. The cost of any return/ exchange is to be borne by the customer. We do not offer reverse pickups.
          </p>
          <p>
            On discounted pieces (including the checkout offer NOEXCHANGE), custom orders, swim wear and home ware - all sales are final, and we do not accept returns or exchanges unless the item received is defective or damaged. We encourage customers to review their orders carefully before completing the purchase. If you receive a damaged or defective item, please contact our customer service team within 2 days of receiving your order for assistance.
          </p>
          <p className="!font-bold">
            In order to initiate an exchange or return, please find the 'Initiate a return here' option at the bottom of the page. Keep your order number and Email ID at hand for a hassle free process.
          </p>
          <p>
            The Summer House team holds the right to not accept returns in case the product is used or damaged by the customer.
          </p>
        </div>

      </div>
    </div>
  );
}