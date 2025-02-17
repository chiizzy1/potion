"use client";

import { traders } from "@/lib/mock-trader";
import { Trader } from "@/types";

export function useGetTraderDetails() {
  const getTraderById = async (id: string): Promise<Trader | undefined> => {
    return traders.find((trader) => trader.id === id);
  };

  return { getTraderById };
}
