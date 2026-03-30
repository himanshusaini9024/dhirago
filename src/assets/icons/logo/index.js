import Image from "next/image";

const Logo = () => {
  return (
    <div className="relative w-full h-full">
      <Image
        src="/images/logo/bird_4-5.png"
        alt="Home Furniture Online"
        fill
        priority
        className="object-contain"
      />
    </div>
  );
};

export default Logo;