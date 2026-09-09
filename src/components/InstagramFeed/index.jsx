"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const IG_HANDLE = "dhirago_";
const IG_URL = "https://www.instagram.com/dhirago_/";

function postThumb(post) {
  if (!post) return "";
  if (post.media_type === "VIDEO") {
    return post.thumbnail_url || post.media_url || "";
  }
  if (post.media_type === "CAROUSEL_ALBUM") {
    const first = post.children?.data?.[0];
    if (first?.media_type === "VIDEO") {
      return first.thumbnail_url || first.media_url || post.media_url || "";
    }
    return first?.media_url || post.media_url || "";
  }
  return post.media_url || "";
}

function postSlides(post) {
  if (!post) return [];
  if (post.media_type === "CAROUSEL_ALBUM" && post.children?.data?.length) {
    return post.children.data.map((child) => ({
      type: child.media_type === "VIDEO" ? "VIDEO" : "IMAGE",
      url: child.media_type === "VIDEO" ? child.media_url : child.media_url,
      poster: child.thumbnail_url || undefined,
    }));
  }
  return [
    {
      type: post.media_type === "VIDEO" ? "VIDEO" : "IMAGE",
      url: post.media_url,
      poster: post.thumbnail_url || undefined,
    },
  ];
}

function formatPostDate(timestamp) {
  if (!timestamp) return "";
  try {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function InstagramIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function PlayIcon({ className = "w-8 h-8" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86a1 1 0 0 0-1.5.86z" />
    </svg>
  );
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState(IG_HANDLE);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function getInstagramPosts() {
      try {
        const response = await fetch("/api/instagram");
        if (!response.ok) throw new Error("Instagram request failed");
        const data = await response.json();
        setPosts(data.posts || []);
        if (data.profile?.username) setUsername(data.profile.username);
      } catch (error) {
        console.error("Instagram Feed Error:", error);
      } finally {
        setLoading(false);
      }
    }
    getInstagramPosts();
  }, []);

  const visiblePosts = useMemo(() => posts.slice(0, 12), [posts]);
  const activePost = activeIndex != null ? visiblePosts[activeIndex] : null;
  const slides = useMemo(() => postSlides(activePost), [activePost]);

  const openPost = (index) => {
    setActiveIndex(index);
    setSlideIndex(0);
  };

  const closePost = useCallback(() => {
    setActiveIndex(null);
    setSlideIndex(0);
  }, []);

  const goPost = useCallback(
    (dir) => {
      if (activeIndex == null || !visiblePosts.length) return;
      const next =
        (activeIndex + dir + visiblePosts.length) % visiblePosts.length;
      setActiveIndex(next);
      setSlideIndex(0);
    },
    [activeIndex, visiblePosts.length],
  );

  const goSlide = useCallback(
    (dir) => {
      if (!slides.length) return;

      setSlideDirection(dir);

      setSlideIndex((i) => (i + dir + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    if (activeIndex == null) return;
    const onKey = (e) => {
      if (e.key === "Escape") closePost();
      if (e.key === "ArrowRight") {
        if (slides.length > 1) goSlide(1);
        else goPost(1);
      }
      if (e.key === "ArrowLeft") {
        if (slides.length > 1) goSlide(-1);
        else goPost(-1);
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, closePost, goPost, goSlide, slides.length]);

  if (loading) return <InstagramSkeleton />;
  if (!visiblePosts.length) return null;

  const currentSlide = slides[slideIndex] || slides[0];

  return (
    <section className="w-full bg-white pt-14 md:pt-20 pb-16 md:pb-1">
      <div className="max-w-[1820px] mx-auto px-3 sm:px-5 md:px-8">
        <h2
          className={`${josefin.className} text-center text-[13px] font-semibold md:text-[1.5em] uppercase font-normal text-[#575757] mb-8 md:mb-12`}
        >
          Instagram
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-[2px] sm:gap-1">
          {visiblePosts.map((post, index) => {
            const image = postThumb(post);
            if (!image) return null;
            const isVideo =
              post.media_type === "VIDEO" ||
              (post.media_type === "CAROUSEL_ALBUM" &&
                post.children?.data?.[0]?.media_type === "VIDEO");

            return (
              <button
                key={post.id}
                type="button"
                onClick={() => openPost(index)}
                aria-label="View Instagram post"
                className="relative aspect-square overflow-hidden bg-[#f3f3f3] group cursor-pointer p-0 border-0"
              >
                <img
                  src={image}
                  alt={post.caption?.slice(0, 80) || "Dhirago Instagram"}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-400 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <InstagramIcon className="w-[22px] h-[22px]" />
                  </span>
                </div>

                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                    <span className="text-white drop-shadow-md">
                      <PlayIcon className="w-7 h-7" />
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {mounted &&
        activePost &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Instagram post"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/75 border-0 cursor-pointer"
              aria-label="Close"
              onClick={closePost}
            />

            <button
              type="button"
              onClick={closePost}
              aria-label="Close post"
              className="absolute top-4 right-4 md:top-6 md:right-6 z-[102] w-10 h-10 flex items-center justify-center text-white hover:opacity-70 transition-opacity bg-transparent border-0 cursor-pointer"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {visiblePosts.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => goPost(-1)}
                  aria-label="Previous post"
                  className="hidden md:flex absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-[102] w-10 h-10 items-center justify-center text-white/90 hover:text-white bg-transparent border-0 cursor-pointer"
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M15 5l-7 7 7 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => goPost(1)}
                  aria-label="Next post"
                  className="hidden md:flex absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-[102] w-10 h-10 items-center justify-center text-white/90 hover:text-white bg-transparent border-0 cursor-pointer"
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            <div className="relative z-[101] w-[min(1160px,94vw)] h-[90vh] bg-white rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl rounded-[30px]">
              {/* Media */}
              {/* Media */}
              <div className="relative bg-black md:w-[58%] aspect-square md:aspect-auto md:min-h-[520px] md:max-h-[90vh] overflow-hidden">
                {/* SLIDER */}
                <div
                  className="
      absolute inset-0
      flex
      transition-transform
      duration-[1200ms]
      ease-[cubic-bezier(0.22,1,0.36,1)]
    "
                  style={{
                    transform: `translateX(-${slideIndex * 100}%)`,
                  }}
                >
                  {slides.map((slide, index) => (
                    <div
                      key={`${slide.url}-${index}`}
                      className="relative min-w-full w-full h-full flex-shrink-0"
                    >
                      {slide.type === "VIDEO" ? (
                        <video
                          src={slide.url}
                          poster={slide.poster}
                          controls={index === slideIndex}
                          playsInline
                          autoPlay={index === slideIndex}
                          className="absolute inset-0 w-full h-full object-contain"
                        />
                      ) : (
                        <img
                          src={slide.url}
                          alt={
                            activePost.caption?.slice(0, 120) ||
                            "Instagram post"
                          }
                          className="
              absolute inset-0
              w-full h-full
              object-contain
            "
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* SLIDER BUTTONS */}
                {slides.length > 1 && (
                  <>
                    {/* LEFT */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        goSlide(-1);
                      }}
                      aria-label="Previous slide"
                      className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          z-30

          w-10 h-10
          rounded-full

          bg-white/90
          text-black

          flex
          items-center
          justify-center

          border-0
          cursor-pointer

          shadow-lg
          hover:bg-white
          hover:scale-105

          transition-all
          duration-300

          text-[25px]
          leading-none
        "
                    >
                      ‹
                    </button>

                    {/* RIGHT */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        goSlide(1);
                      }}
                      aria-label="Next slide"
                      className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          z-30

          w-10 h-10
          rounded-full

          bg-white/90
          text-black

          flex
          items-center
          justify-center

          border-0
          cursor-pointer

          shadow-lg
          hover:bg-white
          hover:scale-105

          transition-all
          duration-300

          text-[25px]
          leading-none
        "
                    >
                      ›
                    </button>

                    {/* DOTS */}
                    <div
                      className="
          absolute
          bottom-4
          left-1/2
          -translate-x-1/2
          z-30

          flex
          items-center
          gap-2
        "
                    >
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSlideIndex(index);
                          }}
                          className={`
              rounded-full
              border-0
              p-0
              cursor-pointer

              transition-all
              duration-500

              ${
                index === slideIndex
                  ? "w-5 h-2 bg-white"
                  : "w-2 h-2 bg-white/50 hover:bg-white/80"
              }
            `}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Caption panel */}
              <div className="md:w-[42%] flex flex-col min-h-0 bg-white max-h-[42vh] md:max-h-[85vh]">
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#efefef] shrink-0">
                  <span className="w-8 h-8 rounded-full bg-[#111] text-white text-[10px] tracking-wide flex items-center justify-center uppercase">
                    D
                  </span>
                  <a
                    href={IG_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] font-semibold text-[#111] hover:opacity-70"
                  >
                    {username}
                  </a>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-4">
                  <p className="text-[14px] leading-relaxed text-[#262626] whitespace-pre-wrap">
                    {activePost.caption || "View this post on Instagram."}
                  </p>
                  <a
                    href={activePost.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-[12px] tracking-[0.08em] uppercase text-[#666] underline underline-offset-4 hover:text-[#111]"
                  >
                    Open on Instagram
                  </a>
                </div>

                <div className="px-4 py-3 border-t border-[#efefef] shrink-0">
                  <p className="text-[12px] text-[#8e8e8e]">
                    {formatPostDate(activePost.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}

function InstagramSkeleton() {
  return (
    <section className="w-full bg-white pt-14 md:pt-20 pb-16 md:pb-24">
      <div className="max-w-[1820px] mx-auto px-3 sm:px-5 md:px-8">
        <div className="w-36 h-4 bg-neutral-200 animate-pulse mx-auto mb-10" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[2px] sm:gap-1">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="aspect-square bg-neutral-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
