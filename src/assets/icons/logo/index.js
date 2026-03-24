import Image from "next/image";
const Logo = () => {
  return (
        <Image
          src="/images/logo/d15.png"
          alt="Home Furniture Online"
          width={170}
          height={90}
          priority
          className="w-[110px] sm:w-[130px] lg:w-[170px] h-auto object-contain"
        />
  );
};

export default Logo;
