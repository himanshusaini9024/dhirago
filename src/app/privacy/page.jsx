"use client";

import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function PrivacyPolicyPage() {
  return (
    <div
      className={`min-h-screen bg-white text-stone-800 ${josefin.className}`}
    >
      

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
                    Privacy Policy
                  </h3>
                </div>
              </div>
            </section>
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-14">
        <h1
          className={`${josefin.className} uppercase leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}
        >
          What is your Privacy Policy?
        </h1>

        <div className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
          <p>
            This Website with the URL{" "}
           <Link href="https://www.dhirago.com" target="_blank" className="underline text-stone-900">www.dhirago.com</Link>{" "}
            ("Website/Site") is operated by Dhirago Fashion Private Limited
            ("We/Our/Us"). We are committed to protecting and respecting your
            privacy. We collect your personal information and process your
            personal data in accordance with applicable law in India relating to
            the processing of personal data. Please read the following carefully
            to understand how we use your personal data.
          </p>
          <p>
            When you interact with us, whether this be online via the Website or
            in-person at our or our franchisee owned stores, we may require you
            to provide us certain information which is essential for us to
            manage your registration as a user, to enable and manage your
            purchase of products, to respond to your queries for customer
            service and for processing returns. We may also seek certain other
            information which we use for marketing communications, to enable
            your participation in loyalty and rewards programs, and for
            analytics which we use to improve our products and services, and our
            platforms and operations. You will have an option to not provide us
            this information, or to opt out of marketing communications and
            rewards programs.
          </p>
          <p>
            We may collect data such as your name, address, telephone number,
            age, gender, birth date and anniversaries, browsing and visit
            patterns, purchase patterns and history, hobbies, details of friends
            and acquaintances.
          </p>
          <p>
            Some of this data is essential for us to collect in order to provide
            you with our products and services; for instance, personal data such
            as your name, address, phone number and email id, is used to
            register you as a user on our online platforms or in-store, to
            enable your purchase of our products, maintain your purchase
            history, respond to your queries, provide customer service, manage
            returns and exchanges, and to enable us to comply with our legal
            obligations. We may also communicate with you over telephone, SMS,
            or email for such purposes.
          </p>
          <p>
            Other data may be optional, which you will be made aware of in
            relation to the activity for which we collect it. These aspects are
            elaborated below. Such activity may include among others,
            promotional activity for providing you information about our
            products including new products, sending you newsletters, enabling
            your participation in loyalty and rewards programs, greeting you on
            special days such as birthdays and anniversaries and providing
            special discounts, informing you about season-end and other sales.
            For these purposes also, we may communicate with you over telephone,
            SMS or email.
          </p>
          <p>
            We may use certain data such as your browsing and purchase history,
            purchase patterns, gender, age, income, etc for analytics to be able
            to customize our marketing and promotional activities, to improve
            our products and services and also to improve user experience when
            shopping at our stores or via the Website.
          </p>
          <p>
            If you intend to unsubscribe from communications towards marketing
            and promotional activity, please write to the Grievance Officer on
            the communication address provided herein. Where we communicate with
            you over email, the email will also have an option to unsubscribe
            from such communications.
          </p>
          <p>
            Data so collected by us is stored on secure servers provided by
            third parties and we ensure through contractual obligations with
            them that they take reasonable precautions in accordance with
            applicable laws to ensure that this information is kept in a secure
            fashion. However, any loss of data by the third parties is not our
            liability and in the eventuality it happens we will inform you
            accordingly via your registered email address within 48 hours of us
            being notified by such third party.
          </p>
          <p>
            You are responsible to ensure that the data you provide to us is
            accurate and not misleading. You must also keep it up to date and
            inform us of changes where necessary for us to fulfil our
            obligations to you.
          </p>
          <p>
            Your actual order details may be stored with us and you may access
            this information by logging into your account on the website. Here
            you can view the details of your orders that have been completed,
            those which are open and those which are shortly to be dispatched
            and administer your address details, bank details and any newsletter
            to which you may have subscribed. You are responsible for the
            security of your login credentials including passwords and we cannot
            assume liability for any misuse of these.
          </p>
          <p>
            In relation to payment processing, we do not receive nor store any
            information with respect to your financial instruments such as
            credit cards, debit cards, bank details, etc, except in the manner
            prescribed under applicable law. For non-cash payments at stores and
            online payments, payments are processed using a number of
            participants who operate in accordance with applicable applicable to
            such processing operations and they make decisions about the
            collection and processing of your personal and financial data. We do
            not receive nor store your payment instrument data such as credit
            card or banking data with any of our vendors, staff or personnel.
          </p>
          <p>
            If you are under 18 years of age, you may only use Our Website with
            the consent of your parent or legal guardian.
          </p>
          <p>
            We may make changes to this policy from time to time. Where we do
            so, we will change the "Last Updated" date above and may also post a
            notice on our websites for a period of time to notify you of such
            changes. Your continued use of our services after such changes have
            been published to our services will constitute your acceptance of
            such revised policy.
          </p>
        </div>

        {/* Section: How We Collect */}
        <h2
          className={`${josefin.className} uppercase leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}
        >
          How We Collect the Information
        </h2>
        <ul className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
          <li>
            From you directly and through this site: We may collect information
            through the Website when you visit. The data we collect depends on
            the context of your interaction with the Website.
          </li>
          <li>
            Through business interaction: We may collect information through
            business interaction with you or your employees.
          </li>
          <li>
            From other sources: We may receive information from other sources,
            such as public databases; joint marketing partners; social media
            platforms; or other third parties such as updated delivery and
            address information from our carriers, which we use to correct our
            records and deliver your next purchase of communication more easily.
          </li>
          <li>
            Information about your interactions with the products and services
            offered by our subsidiaries.
          </li>
        </ul>

        {/* Section: Information We Collect */}
        <h2
          className={`${josefin.className} uppercase leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}
        >
          Information We Collect
        </h2>
        <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
          We collect information primarily to provide better services to all of
          our customers.
        </p>
        <ul className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
          <li>
            When you visit our site, some information is automatically
            collected. This may include information such as the Operating System
            (OS) running on your device, Internet Protocol (IP) address, access
            times, browser type, and language, and the website you visited
            before our site. We also collect information about how you use Our
            products or services.
          </li>
          <li>
            We automatically collect purchase or content use history, which we
            sometimes aggregate with similar information from other customers to
            create features such as Best Seller, Top Rate, etc.
          </li>
          <li>
            The full Uniform Resource Locators (URL) clickstream to, through and
            from our website (including date and time; cookie number; products
            and/or content you viewed or searched for; page response times;
            download errors; length of visits to certain pages; page interaction
            information (such as scrolling, clicks, and mouse-overs).
          </li>
          <li>
            We automatically collect information using "Cookies". Cookies are
            small data files stored on your hard drive. Among other things,
            cookies help us identify you and your session, recall your
            authentication information, store your site preferences and
            personalize content.
          </li>
        </ul>

        {/* Section: Cookies */}
        <h2
          className={`${josefin.className} uppercase leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}
        >
          Cookies
        </h2>
        <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
          We use cookies and similar tracking technologies to track activity on
          our Website and hold certain information. Cookies are files with a
          small amount of data which may include an anonymous unique identifier.
          You can instruct your browser to refuse all cookies or to indicate
          when a cookie is being sent. However, if you do not accept cookies,
          you may not be able to use some portions of our Website.
        </p>

        {/* Section: Data Sharing */}
        <h2
          className={`${josefin.className} uppercase leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}
        >
          Data Sharing
        </h2>
        <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
          We do not sell, trade, or rent your personal identification
          information to others. We may share generic aggregated demographic
          information not linked to any personal identification information
          regarding visitors and users with our business partners, trusted
          affiliates and advertisers for the purposes outlined above.
        </p>

        {/* Section: Security */}
        <h2
          className={`${josefin.className} uppercase leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}
        >
          Security
        </h2>
        <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
          We adopt appropriate data collection, storage, and processing
          practices and security measures to protect against unauthorized
          access, alteration, disclosure or destruction of your personal
          information, username, password, transaction information and data
          stored on our Website.
        </p>

        {/* Section: Your Rights */}
        <h2
          className={`${josefin.className} uppercase leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}
        >
          Your Rights
        </h2>
        <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
          You have the right to access, update or delete the information we have
          on you. Whenever made possible, you can access, update or request
          deletion of your personal information directly within your account
          settings section. If you are unable to perform these actions yourself,
          please contact us to assist you. You also have the right to withdraw
          consent at any time where we relied on your consent to process your
          personal information.
        </p>

        {/* Section: Policy Updates */}
        <h2
          className={`${josefin.className} uppercase leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}
        >
          Policy Updates
        </h2>
        <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
          We may update this privacy policy periodically. We will notify you of
          any changes by posting the new privacy policy on this page and
          updating the "Last Updated" date. You are advised to review this
          Privacy Policy periodically for any changes.
        </p>

        {/* Section: Contact */}
        <h2
          className={`${josefin.className} uppercase leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}
        >
          Contact
        </h2>
        <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
          If you have any questions about this Privacy Policy, please contact us
          at{" "}
          <a
            href="mailto:contact@dhirago.com"
            className="underline text-stone-900"
          >
            contact@dhirago.com
          </a>{" "}
          or call us at +91-8905524932.
        </p>
      </div>
    </div>
  );
}
