
import Image from "next/image";

const Categorybaner = () => (
  <div className="relative w-full h-[120px] md:h-[180px]">
    <Image
      src="/images/cat.png"
      alt="Category Banner"
      fill
      priority
      className="object-cover"
    />
  </div>
);

export default Categorybaner;
