"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Trader } from "@/types";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { PiShareFill } from "react-icons/pi";
import Link from "next/link";
import { formatAvgEntry, formatAmount, truncateAddress } from "@/lib/utils";
import { SolanaLogo } from "@/assets";

export const columns: ColumnDef<Trader>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
    cell: ({ row }) => {
      const position = row.getValue("rank") as number;
      return (
        <div
          className={`w-[28px] h-[28px] rounded-full flex items-center justify-center ${
            position === 1
              ? "gold-bg text-black"
              : position === 2
              ? "silver-bg text-black"
              : position === 3
              ? "bronze-bg text-black"
              : ""
          }`}
        >
          <span className="font-bold text-[12px] leading-[15.12px] -tracking-[2%]">{position}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: () => <span className="font-bold text-[14px] leading-[17.64px] -tracking-[2%]">Trader</span>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image
          src={row.original.avatar || ""}
          alt={`${row.getValue("name")} avatar`}
          width={43}
          height={43}
          className="rounded-full"
        />
        <div className="flex flex-col gap-1">
          <span className="font-bold text-[12px] leading-[15.12px] -tracking-[2%]">{row.getValue("name")}</span>
          <span className="text-[12px] leading-[15.12px] -tracking-[2%] text-tertiary">{truncateAddress(row.original.walletAddress)}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "walletAddress",
    header: () => <span className="hidden">Contract Address</span>,
    cell: ({}) => <div className="hidden"></div>,
  },
  {
    accessorKey: "followers",
    header: ({ column }) => {
      return (
        <Button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <div className="flex items-center gap-1">
            <span className="font-bold text-[14px] leading-[17.64px] -tracking-[2%]">Followers</span>
            <MdOutlineArrowDropDown className="text-primary w-[16px] h-[16px]" />
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const followers = row.getValue("followers") as number | undefined;

      if (followers === undefined) return <span className="text-[12px] leading-[15.12px] -tracking-[2%]">-</span>;
      return (
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-[12px] leading-[15.12px] -tracking-[2%]">{followers.toLocaleString()}</span>
            <span className="text-[12px] leading-[15.12px] -tracking-[2%] text-tertiary">{row.original.xAccount}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "tokens",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <div className="flex items-center gap-1">
            <span className="font-bold text-[14px] leading-[17.64px] -tracking-[2%]">Tokens</span>
            <MdOutlineArrowDropDown className="text-primary w-[16px] h-[16px]" />
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const tokens = row.getValue("tokens") as number;
      return (
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-[12px] leading-[15.12px] -tracking-[2%]">{tokens}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "winRate",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <div className="flex items-center gap-1">
            <span className="font-bold text-[14px] leading-[17.64px] -tracking-[2%]">Win Rate</span>
            <MdOutlineArrowDropDown className="text-primary w-[16px] h-[16px]" />
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const winRate = row.getValue("winRate") as number;
      const isPositive = winRate > 0;
      return (
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1">
            <span
              className={`font-bold text-[12px] leading-[15.12px] -tracking-[2%] ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {`${winRate}%`}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "trades",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <div className="flex items-center gap-1">
            <span className="font-bold text-[14px] leading-[17.64px] -tracking-[2%]">Trades</span>
            <MdOutlineArrowDropDown className="text-primary" />
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const trades = row.getValue("trades") as { won: number; total: number };
      return (
        <span className="font-bold text-[14px] leading-[17.64px] -tracking-[2%] text-green-500">
          {trades.won} / <span className="text-red-500">{trades.total}</span>
        </span>
      );
    },
  },
  {
    accessorKey: "avgBuy",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <div className="flex items-center gap-1">
            <span className="font-bold text-[14px] leading-[17.64px] -tracking-[2%]">Avg Buy</span>
            <MdOutlineArrowDropDown className="text-primary w-[16px] h-[16px]" />
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const avgBuy = row.getValue("avgBuy") as number;
      const rate = 200; //fetch actual rate from api call
      return (
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="font-bold text-[12px] leading-[15.12px] -tracking-[2%]">{formatAmount(avgBuy)}</span>
              <Image src={SolanaLogo} width={16} height={16} alt="solana logo" />
            </div>
            <span className="text-[12px] leading-[15.12px] -tracking-[2%] text-tertiary">${formatAmount(avgBuy * rate)}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "avgEntry",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <div className="flex items-center gap-1">
            <span className="font-bold text-[14px] leading-[17.64px] -tracking-[2%]">Avg Entry</span>
            <MdOutlineArrowDropDown className="text-primary w-[16px] h-[16px]" />
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.getValue("avgEntry") as number;
      return <span className="font-bold text-[12px] leading-[15.12px] -tracking-[2%]">{formatAvgEntry(amount)}</span>;
    },
  },
  {
    accessorKey: "avgHold",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <div className="flex items-center gap-1">
            <span className="font-bold text-[14px] leading-[17.64px] -tracking-[2%]">Avg Hold</span>
            <MdOutlineArrowDropDown className="text-primary w-[16px] h-[16px]" />
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const avgHold = row.getValue("avgHold") as string;
      return <span className="font-bold text-[12px] leading-[15.12px] -tracking-[2%]">{avgHold}</span>;
    },
  },
  {
    accessorKey: "realizedPNL",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <div className="flex items-center gap-1">
            <span className="font-bold text-[14px] leading-[17.64px] -tracking-[2%]">Realized PNL</span>
            <MdOutlineArrowDropDown className="text-primary w-[16px] h-[16px]" />
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const pnl = row.getValue("realizedPNL") as {
        amount: number;
        solana: number;
      };
      const isPositive = pnl.solana > 0;
      return (
        <div className={`flex flex-col gap-1`}>
          <div className="flex items-center gap-1">
            <span
              className={`font-bold text-[12px] leading-[15.12px] -tracking-[2%] ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >{`${isPositive ? "+" : ""} ${formatAmount(pnl.solana)}`}</span>
            <Image src={SolanaLogo} width={16} height={16} alt="solana logo" />
          </div>
          <span className="text-[12px] leading-[15.12px] -tracking-[2%] text-tertiary">${formatAmount(pnl.amount)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "profileUrl",
    header: () => <span className="font-bold text-[14px] leading-[17.64px] -tracking-[2%]">Share</span>,
    cell: ({ row }) => {
      const url = row.getValue("profileUrl") as string;
      return (
        <Link href={url} target="_blank">
          <Button>
            <PiShareFill className="text-primary" />
          </Button>
        </Link>
      );
    },
  },
];
