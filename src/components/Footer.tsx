import Link from "next/link";
import { FC } from "react";
import { LuCopyright } from "react-icons/lu";

const Footer: FC = ({}) => {
  return (
    <footer className="">
      <div className="container max-w-[1342px] mx-auto w-full">
        <div className="flex items-center justify-center gap-2 py-[18px]">
          <LuCopyright size={32} className="text-tertiary"/>
          <span className="text-[14px] leading-[19.2px] -tracking-[3.5%] font-bold font-monumentExtended text-center text-tertiary">
            {new Date().getFullYear()} By
          </span>
          <Link href="https://x.com/samurai_10x">samurai</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
