"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { TradingData } from "@/types";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { PiShareFill } from "react-icons/pi";
import Link from "next/link";
import { formatAmount, formatAvgEntry, formatMoney, truncateAddress } from "@/lib/utils";
import { SolanaLogo } from "@/assets";

export const columns: ColumnDef<TradingData>[] = [
  {
    accessorKey: "tokenName",
    header: () => <span className="font-bold text-[14px] leading-[17.64px] -tracking-[2%]">Token</span>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image
          src={row.original.avatar || ""}
          alt={`${row.getValue("tokenName")} avatar`}
          width={43}
          height={43}
          className="rounded-full"
        />
        <div className="flex flex-col gap-1">
          <span className="font-bold text-[12px] leading-[15.12px] -tracking-[2%]">{row.getValue("tokenName")}</span>
          <span className="text-[12px] leading-[15.12px] -tracking-[2%] text-tertiary">{truncateAddress(row.original.contractAddress)}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "contractAddress",
    header: () => <span className="hidden">Contract Address</span>,
    cell: ({}) => <div className="hidden"></div>,
  },
  {
    accessorKey: "lastTrade",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <div className="flex items-center gap-1">
            <span className="font-bold text-[14px] leading-[17.64px] -tracking-[2%]">Last Trade</span>
            <MdOutlineArrowDropDown className="text-primary w-[16px] h-[16px]" />
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const lastTrade = row.getValue("lastTrade") as string;
      return <span className="font-bold text-[12px] leading-[15.12px] -tracking-[2%]">{lastTrade}</span>;
    },
  },
  {
    accessorKey: "marketCap",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <div className="flex items-center gap-1">
            <span className="font-bold text-[14px] leading-[17.64px] -tracking-[2%]">MC</span>
            <MdOutlineArrowDropDown className="text-primary w-[16px] h-[16px]" />
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.getValue("marketCap") as number;
      return <span className="font-bold text-[12px] leading-[15.12px] -tracking-[2%]">${formatMoney(amount)}</span>;
    },
  },
  {
    accessorKey: "invested",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <div className="flex items-center gap-1">
            <span className="font-bold text-[14px] leading-[17.64px] -tracking-[2%]">Invested</span>
            <MdOutlineArrowDropDown className="text-primary w-[16px] h-[16px]" />
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const invested = row.getValue("invested") as number;
      const rate = 200; //fetch actual rate from api call
      return (
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="font-bold text-[12px] leading-[15.12px] -tracking-[2%]">{formatAmount(invested)}</span>
              <Image src={SolanaLogo} width={16} height={16} alt="solana logo" />
            </div>
            <span className="text-[12px] leading-[15.12px] -tracking-[2%] text-tertiary">
              ${formatAmount(invested * rate)}
            </span>
          </div>
        </div>
      );
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
      const realizedPNL = row.getValue("realizedPNL") as number;
      const rate = 200; //fetch actual rate from api call
      const isPositive = realizedPNL > 0;
      return (
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
            <span className={`font-bold text-[12px] leading-[15.12px] -tracking-[2%] ${isPositive ? "text-green-500" : "text-red-500"}`}>{`${isPositive ? "+" : ""} ${formatAmount(
             realizedPNL
            )}`}</span>
              <Image src={SolanaLogo} width={16} height={16} alt="solana logo" />
            </div>
            <span className="text-[12px] leading-[15.12px] -tracking-[2%] text-tertiary">
              ${formatAmount(realizedPNL * rate)}
            </span>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "roi",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <div className="flex items-center gap-1">
            <span className="font-bold text-[14px] leading-[17.64px] -tracking-[2%]">ROI</span>
            <MdOutlineArrowDropDown className="text-primary w-[16px] h-[16px]" />
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const roi = row.getValue("roi") as number;
      const isPositive = roi > 0;
      return (
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1">
            <span
              className={`font-bold text-[12px] leading-[15.12px] -tracking-[2%] ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {`${roi}%`}
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
    accessorKey: "holding",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <div className="flex items-center gap-1">
            <span className="font-bold text-[14px] leading-[17.64px] -tracking-[2%]">Holding</span>
            <MdOutlineArrowDropDown className="text-primary w-[16px] h-[16px]" />
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const holding = row.getValue("holding") as number;
      const rate = 200; //fetch actual rate from api call
      return (
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="font-bold text-[12px] leading-[15.12px] -tracking-[2%]">{formatAmount(holding)}</span>
              <Image src={SolanaLogo} width={16} height={16} alt="solana logo" />
            </div>
            <span className="text-[12px] leading-[15.12px] -tracking-[2%] text-tertiary">
              ${formatAmount(holding * rate)}
            </span>
          </div>
        </div>
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
      const amount = row.getValue("avgBuy") as number;
      return <span className="font-bold text-[12px] leading-[15.12px] -tracking-[2%]">${formatAvgEntry(amount)}</span>;
    },
  },
  {
    accessorKey: "avgSell",
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
      const amount = row.getValue("avgSell") as number;
      return <span className="font-bold text-[12px] leading-[15.12px] -tracking-[2%]">${formatAvgEntry(amount)}</span>;
    },
  },
  {
    accessorKey: "heldTime",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <div className="flex items-center gap-1">
            <span className="font-bold text-[14px] leading-[17.64px] -tracking-[2%]">Held</span>
            <MdOutlineArrowDropDown className="text-primary w-[16px] h-[16px]" />
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const heldTime = row.getValue("heldTime") as string;
      return <span className="font-bold text-[12px] leading-[15.12px] -tracking-[2%]">{heldTime}</span>;
    },
  },
  {
    accessorKey: "tokenUrl",
    header: () => <span className="font-bold text-[14px] leading-[17.64px] -tracking-[2%]">Share</span>,
    cell: ({ row }) => {
      const url = row.getValue("tokenUrl") as string;
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
