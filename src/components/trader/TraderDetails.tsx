"use client";

import { BullxLogo, SolanaLogo } from "@/assets";
import Image from "next/image";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { PiShareFill } from "react-icons/pi";
import { Check, Copy } from "lucide-react";
import { formatAmount, formatAvgEntry, formatTimeToNow, truncateAddress } from "@/lib/utils";
import { TimePeriod, Trader } from "@/types";
import { toast } from "sonner";
import Link from "next/link";
import { IoIosRefresh } from "react-icons/io";
import { periods } from "@/constants";

interface TraderDetailsProps {
  userData: Trader;
  period: TimePeriod;
  onSelectPeriod: (period: TimePeriod) => void;
}

const TraderDetails: FC<TraderDetailsProps> = ({ userData, onSelectPeriod, period }) => {
  const [copied, setCopied] = useState(false);

  const {
    avatar,
    avgBuy,
    avgEntry,
    avgHold,
    name,
    profileUrl,
    realizedPNL,
    tokens,
    trades,
    walletAddress,
    winRate,
    followers,
    lastTrade,
    roi,
    totalInvested,
    xAccount,
  } = userData;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      toast.success("wallet address copied!");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const rate = 200; //fetch from api source

  return (
    <div className="flex flex-col lg:flex-row items-center gap-[49px] w-full">
      <div className="basis-1/3 flex flex-col gap-[35px] w-full">
        <div className="flex items-center gap-4">
          <Image src={avatar} alt={"orangie"} width={80} height={80} className="rounded-full" />
          <div className="flex flex-col gap-1">
            <p className="font-bold text-[24px] leading-[30.24px] -tracking-[2%]">{name}</p>
            <div className="flex items-center gap-1">
              <p className="text-tertiary text-[14px] leading-[17.64px] -tracking-[2%]">{truncateAddress(walletAddress)}</p>
              <Button onClick={copyToClipboard}>
                {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4 text-primary" />}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="h-[55px] px-[15px] border-b border-tertiary/20 flex items-center justify-between table-bg">
            <p className="font-bold text-[14px] leading-[17.64px] -tracking-[2%]">X Account</p>
            <div className="flex flex-col gap-1">
              <p className="text-[14px] leading-[17.64px] -tracking-[2%]">{xAccount}</p>
              <p className="text-tertiary text-[12px] leading-[15.12px] -tracking-[2%]">{followers}</p>
            </div>
          </div>
          <div className="h-[55px] px-[15px] flex items-center justify-between table-bg">
            <p className="font-bold text-[14px] leading-[17.64px] -tracking-[2%]">Last Trade</p>
            <div className="flex items-center gap-2">
              <p className="text-[14px] leading-[17.64px] -tracking-[2%]">{formatTimeToNow(new Date(lastTrade))}</p>
              <Image src={BullxLogo} alt={"bullx logo"} width={16} height={14} />
            </div>
          </div>
        </div>
      </div>
      <div className="basis-2/3 flex flex-col-reverse lg:flex-col gap-[23px] w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2">
            {periods.map((p) => (
              <Button
                className={`h-[37px] rounded-[20px] px-[8px] sm:px-[16px] ${
                  period === p ? "bg-secondary border border-tertiary/50" : "bg-transparent"
                }  shadow-sm`}
                onClick={() => onSelectPeriod(p)}
                key={p}
              >
                <span
                  className={`text-[14px] leading-[17.64px] -tracking-[2%] capitalize ${
                    period === p ? "text-white" : "text-tertiary"
                  }`}
                >
                  {p}
                </span>
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-[27px]">
            <div className="hidden lg:flex items-center gap-1">
              <span className={`text-[12px] leading-[15.12px] -tracking-[2%] text-tertiary`}>Last refreshed seconds ago</span>
              <IoIosRefresh className="text-tertiary" />
            </div>
            <Link href={profileUrl}>
              <PiShareFill className="text-primary w-6 h-6" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full">
          <div className="p-4 table-bg border-r border-b border-tertiary/20 h-[55px] px-[15px] flex items-center justify-between">
            <span className={`text-[14px] leading-[17.64px] -tracking-[2%] font-bold`}>Tokens</span>
            <span className={`text-[14px] leading-[17.64px] -tracking-[2%]`}>{tokens}</span>
          </div>
          <div className="p-4 table-bg border-r border-b border-tertiary/20 h-[55px] px-[15px] flex items-center justify-between">
            <span className={`text-[14px] leading-[17.64px] -tracking-[2%] font-bold`}>Average Buy</span>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <span className={`text-[14px] leading-[17.64px] -tracking-[2%]`}>{avgBuy}</span>
                <Image src={SolanaLogo} alt="solana logo" width={20} height={20} />
              </div>
              <span className={`text-[12px] leading-[15.12px] -tracking-[2%] text-tertiary`}>{formatAmount(avgBuy * rate)}</span>
            </div>
          </div>
          <div className="p-4 table-bg border-b border-tertiary/20 h-[55px] px-[15px] flex items-center justify-between">
            <span className={`text-[14px] leading-[17.64px] -tracking-[2%] font-bold`}>Total Invested</span>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <span className={`text-[14px] leading-[17.64px] -tracking-[2%]`}>{totalInvested}</span>
                <Image src={SolanaLogo} alt="solana logo" width={20} height={20} />
              </div>
              <span className={`text-[12px] leading-[15.12px] -tracking-[2%] text-tertiary`}>{totalInvested * rate}</span>
            </div>
          </div>
          <div className="p-4 table-bg border-r border-b border-tertiary/20 h-[55px] px-[15px] flex items-center justify-between">
            <span className={`text-[14px] leading-[17.64px] -tracking-[2%] font-bold`}>Win Rate</span>
            <span className={`text-[14px] leading-[17.64px] -tracking-[2%] ${winRate > 0 ? "text-green-500" : "text-red-500"}`}>
              {winRate}%
            </span>
          </div>
          <div className="p-4 table-bg border-r border-b border-tertiary/20 h-[55px] px-[15px] flex items-center justify-between">
            <span className={`text-[14px] leading-[17.64px] -tracking-[2%] font-bold`}>Average Entry</span>
            <span className={`text-[14px] leading-[17.64px] -tracking-[2%]`}>{formatAvgEntry(avgEntry)}</span>
          </div>
          <div className="p-4 table-bg border-b border-tertiary/20 h-[55px] px-[15px] flex items-center justify-between">
            <span className={`text-[14px] leading-[17.64px] -tracking-[2%] font-bold`}>ROI</span>
            <span className={`text-[14px] leading-[17.64px] -tracking-[2%] ${roi > 0 ? "text-green-500" : "text-red-500"}`}>
              {roi > 0 ? `+${roi}` : `-${roi}`}%
            </span>
          </div>
          <div className="p-4 table-bg border-r border-tertiary/20 h-[55px] px-[15px] flex items-center justify-between">
            <span className={`text-[14px] leading-[17.64px] -tracking-[2%] font-bold`}>Trades</span>
            <span className={`text-[14px] leading-[17.64px] -tracking-[2%] text-green-500`}>
              {trades.won}/<span className="text-red-500">{trades.total}</span>
            </span>
          </div>
          <div className="p-4 table-bg border-r border-tertiary/20 h-[55px] px-[15px] flex items-center justify-between">
            <span className={`text-[14px] leading-[17.64px] -tracking-[2%] font-bold`}>Average Hold</span>
            <span className={`text-[14px] leading-[17.64px] -tracking-[2%]`}>{avgHold}</span>
          </div>
          <div className="p-4 table-bg h-[55px] px-[15px] flex items-center justify-between">
            <span className={`text-[14px] leading-[17.64px] -tracking-[2%] font-bold`}>Realized PNL</span>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <span
                  className={`text-[14px] leading-[17.64px] -tracking-[2%] ${
                    realizedPNL.solana > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {realizedPNL.solana > 0 ? `+${realizedPNL.solana}` : `-${realizedPNL.solana}`}
                </span>
                <Image src={SolanaLogo} alt="solana logo" width={20} height={20} />
              </div>
              <span className={`text-[12px] leading-[15.12px] -tracking-[2%] text-tertiary`}>{realizedPNL.amount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraderDetails;
