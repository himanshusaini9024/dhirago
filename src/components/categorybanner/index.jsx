import Image from "next/image";

const Categorybaner = ({ catbanner }) => {
  let banner = "";

  try {
    // ✅ parse JSON string
    const parsed = JSON.parse(catbanner || "[]");

    // ✅ first image
    banner = Array.isArray(parsed) ? parsed[0] : parsed;
  } catch (e) {
    console.error("Invalid banner JSON", e);
  }

  // ✅ fallback
  if (!banner) {
    banner = "/images/fallback-banner.jpg";
  }

  return (
    <div className="relative w-full h-[90px] md:h-[120px]">
      <Image
        src={banner}
        alt="Category Banner"
        fill
        priority
        className="object-cover"
      />
    </div>
  );
};

export default Categorybaner;