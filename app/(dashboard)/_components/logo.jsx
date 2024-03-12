import Image from "next/image";

const Logo = () => {
  return (
    <Image
      height={130}
      width={130}
      className="w-[130px] h-[130px]"
      alt="Logo"
      src="/logo.svg"
      priority
    />
  );
};

export default Logo;
