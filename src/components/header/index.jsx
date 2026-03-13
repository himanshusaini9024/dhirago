"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import Logo from "../../assets/icons/logo";



const Header = ({ isErrorPage }) => {
  const pathname = usePathname();
   
const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const arrayPaths = ["/"];

  const [onTop, setOnTop] = useState(
    !(!arrayPaths.includes(pathname) || isErrorPage),
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaMenu, setMegaMenu] = useState(false);
  const navRef = useRef(null);
  const searchRef = useRef(null);

  const headerClass = () => {
    if (window.pageYOffset === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };

  useEffect(() => {
    if (!arrayPaths.includes(pathname.pathname) || isErrorPage) {
      return;
    }

    headerClass();
    window.onscroll = function () {
      headerClass();
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

useEffect(() => {
  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setMenuOpen(false);
    }

    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <header className={`site-header ${!onTop ? "site-header--fixed" : ""}`}>
      <div className="container">
        <Link href="/">
          <h1 className="site-logo">
            <Logo />
            Dhirago
          </h1>
        </Link>
        <nav
          ref={navRef}
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
        >
          <Link href="/products">Products</Link>
          <a href="#">Inspiration</a>
          <a href="#">Rooms</a>
          <button className="site-nav__btn">
            <p>Account</p>
          </button>
        </nav>

        <div className="site-header__actions">
          <button
            ref={searchRef}
            className={`search-form-wrapper ${searchOpen ? "search-form--active" : ""}`}
          >
            <form className="search-form">
              <i
                className="icon-cancel"
                onClick={() => setSearchOpen(!searchOpen)}
              />
              <input
                type="text"
                name="search"
                placeholder="Enter the product you are looking for"
              />
            </form>
            <i
              onClick={() => setSearchOpen(!searchOpen)}
              className="icon-search"
            />
          </button>
          <Link href="/cart" >
            <button className="btn-cart">
              <i className="icon-cart" />
              {cartItems.length > 0 && (
                <span className="btn-cart__count">{cartItems.length}</span>
              )}
            </button>
          </Link>
          <Link href="/login" >
            <button className="site-header__btn-avatar">
              <i className="icon-avatar" />
            </button>
          </Link>
          <button
            onClick={() => setMenuOpen(true)}
            className="site-header__btn-menu"
          >
            <i className="btn-hamburger">
              <span />
            </i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
