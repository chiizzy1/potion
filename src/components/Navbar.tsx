"use client";

import { navItems } from "@/constants";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";
import { DiscordLogo, Logo, UserIcon, XLogo } from "@/assets";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { handleWalletConnect } from "@/lib/wallet-actions";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [activePage, setActivePage] = useState("Leaderboards");
  const [stickyClass, setStickyClass] = useState(false);

  const { publicKey } = useWallet();

  //get active page
  const pathname = usePathname();

  useEffect(() => {
    setActivePage(pathname === "/" ? "Leaderboards" : pathname.slice(1));
  }, [pathname]);

  const stickNavbar = () => {
    if (window !== undefined) {
      setStickyClass(window.scrollY > 50);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50  ${stickyClass ? "bg-black backdrop-blur-sm shadow-lg shadow-primary/20" : ""}`}
    >
      <div className="container max-w-[1342px] mx-auto w-full">
        <div className="flex w-full justify-between items-center py-3">
          <div className="flex items-center gap-[81px] w-full">
            <Link href="/">
              <Image src={Logo} width={154} height={47} alt="logo" />
            </Link>

            <div className="hidden lg:flex items-center gap-[36px]">
              {navItems.map(({ id, label, href }) => (
                <ul key={id}>
                  <Link href={href}>
                    <span
                      className={`text-[16px] leading-[20.16px] font-bold ${
                        activePage === label ? "text-white" : "text-tertiary"
                      }`}
                    >
                      {label}
                    </span>
                  </Link>
                </ul>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-[50px] w-full justify-end">
            <div className="flex items-center gap-5">
              <Link href={"http://x.com/"}>
                <Image src={XLogo} alt="" />
              </Link>
              <Link href={"http://discord.com/"}>
                <Image src={DiscordLogo} alt="" />
              </Link>
            </div>

            <div className="hidden lg:flex items-center">
              {!publicKey ? (
                <Button onClick={handleWalletConnect} className="h-[47px] px-[30px] rounded-[8px] bg-primary">
                  <span className={`text-[16px] leading-[20.16px] -tracking-[2%] font-bold`}>Connect wallet</span>
                </Button>
              ) : (
                <Button onClick={handleWalletConnect}>
                  <Image src={UserIcon} alt="user icon" className="h-[53px] w-[53px] rounded-full" />
                </Button>
              )}
              <WalletMultiButton style={{ display: "none" }} />
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex items-center justify-center rounded-lg p-2"
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile menu */}
        {menuOpen ? (
          <div className="flex flex-col items-center gap-6 py-4 lg:hidden">
            <div className="flex flex-col items-center gap-[10px]">
              {navItems.map(({ id, label, href }) => (
                <ul key={id}>
                  <Link href={href}>
                    <span
                      className={`text-[16px] leading-[20.16px] font-bold ${
                        activePage === label ? "text-white" : "text-tertiary"
                      }`}
                    >
                      {label}
                    </span>
                  </Link>
                </ul>
              ))}
            </div>
            <div className="flex items-center">
              {!publicKey ? (
                <Button onClick={handleWalletConnect} className="h-[47px] px-[30px] rounded-[8px] bg-primary">
                  <span className={`text-[16px] leading-[20.16px] -tracking-[2%] font-bold`}>Connect wallet</span>
                </Button>
              ) : (
                <Button onClick={handleWalletConnect}>
                  <Image src={UserIcon} alt="user icon" className="h-[53px] w-[53px] rounded-full" />
                </Button>
              )}
              <WalletMultiButton style={{ display: "none" }} />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default Navbar;
