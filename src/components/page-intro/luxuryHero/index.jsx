"use client";

import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
 
import LoginDrawer from "../../header/logindashboard"

export default function LuxurySection() {
   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const [loginOpen, setLoginOpen] = useState(false);
    const pathname = usePathname();
  
  return (
    <section className="bg-white  border-t font-[Montserrat] overflow-hidden">
      
      <div className="max-w-3xl mx-auto px-6 text-center">

        {/* Logo with floating animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center mb-2"
        >
          <motion.img
            src="/images/logo/3.svg"
            alt="Logo"
            className="w-[110px] md:w-[160px] opacity-90"
          
          />
        </motion.div>

        {/* Brand label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-[11px] tracking-[0.5em] text-gray-400 mb-4"
        >
          DHIRAGO
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl  text-gray-900 mb-6 leading-tight"
        >
          Welcome to Dhirago
        </motion.h2>

        {/* Animated divider */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "50px" }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="h-[1px] bg-black mx-auto mb-4"
        />

        {/* Description */}
   <div className="max-w-2xl mx-auto mb-8 text-black text-sm md:text-base leading-relaxed md:leading-loose">
  
  <p>
    {/* We craft premium menswear, designed to last. */}
    Every Dhirago piece is thoughtfully designed
    
  </p>

  <p className="font-light tracking-wide">
To reflect timeless sophistication{" "}

    {/* Start exploring our categories and make sure you{" "} */}
   
     for those who demand nothing less than the finest.
    {/* for exclusive benefits. */}
  </p>

</div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          viewport={{ once: true }}
        >
          
          {/* <a
            href="/pages/signup"
            className="relative inline-block px-10 py-3 border border-black text-black text-xs tracking-[0.35em] rounded-full overflow-hidden group"
          >
            <span className="relative z-10">JOIN US</span>

            <span className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100  origin-left transition-transform duration-300" />
            <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-300 font-semibold" >
              JOIN US
            </span>
          </a> */}
           {!isLoggedIn ? (
                <button
                  onClick={() => setLoginOpen(true)}
                  className={`text-[18px] ${
                    pathname === "/"  ? "text-white" : "text-black"
                  }`}
                >
                 <a
            href="#"
            className="relative inline-block px-10 py-3 border border-black text-black text-xs tracking-[0.35em] rounded-full overflow-hidden group"
          >
            <span className="relative z-10">JOIN US</span>

            <span className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100  origin-left transition-transform duration-300" />
            <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-300 font-semibold" >
              JOIN US
            </span>
          </a>
                </button>
              ) : ( 
                             <a
            href="#"
            className="relative inline-block px-10 py-3 border border-black text-black text-xs tracking-[0.35em] rounded-full overflow-hidden group"
          >
            <span className="relative z-10">WELCOME  {user ? (user.first_name): ('')}</span>

            <span className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100  origin-left transition-transform duration-300" />
            <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-300 font-semibold" >
              WELCOME {user ? (user.first_name): ('')}
            </span>
          </a>

              )}
        </motion.div>

        {/* Conversion Line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          viewport={{ once: true }}
          className="text-[10px] md:text-[11px] text-gray-400 mt-5 tracking-widest"
        >
          LIMITED DROPS • MEMBERS ONLY • PREMIUM FABRIC
        </motion.p>

      </div>
              <LoginDrawer open={loginOpen} setOpen={setLoginOpen} />
      
    </section>
  );
}