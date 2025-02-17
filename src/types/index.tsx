import { StaticImageData } from "next/image";

// export interface Trader {
//   id: string;
//   name: string;
//   avatar: StaticImageData;
//   wallet: string;
//   twitterHandle: string;
//   isVerified: boolean;
//   totalTrades: number;
//   winRate: number;
//   roi: number;
//   totalInvested: number;
//   profitLoss: number;
//   lastActive: string;
// }

export interface TraderProfileType extends Trader {
  bio: string;
  location: string;
  joinedDate: string;
  tradingStyle: string;
  preferredMarkets: string[];
  monthlyStats: {
    month: string;
    trades: number;
    winRate: number;
    roi: number;
  }[];
}

export interface WalletInfo {
  address: string;
  balance: string;
  isConnected: boolean;
}

export interface AlertMessage {
  id: string;
  type: "info" | "warning" | "success";
  message: string;
  isCloseable?: boolean;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  message: string;
  link: string;
}

// export type filterFieldType = {
//   placeholder: string;
//   field: string;
// }[];

export interface filterField {
  placeholder: string;
  field: string;
}

export type Trade = {
  id: string;
  tokenName: string;
  tokenAddress: string;
  lastTrade: string;
  mc: number;
  invested: number;
  realizedPNL: {
    amount: number;
    solana: number;
  };
  roi: number;
  trades: {
    won: number;
    total: number;
  };
  holding: number;
  avgBuy: number;
  avgSell: number;
  held: string;
};

export type Trader = {
  id: string;
  rank: number;
  name: string;
  walletAddress: string;
  avatar: StaticImageData;
  followers?: number;
  tokens: number;
  winRate: number;
  trades: {
    won: number;
    total: number;
  };
  avgBuy: number;
  avgEntry: number;
  avgHold: string;
  realizedPNL: {
    amount: number;
    solana: number;
  };
  xAccount?: string;
  lastTrade: string;
  totalInvested: number;
  roi: number;
  profileUrl: string;
  tradeHistory: TradingData[];
  createdAt: string;
};

export interface TradingData {
  id: string;
  avatar: StaticImageData;
  tokenName: string;
  contractAddress: string;
  lastTrade: string;
  marketCap: number;
  invested: number;
  realizedPNL: number;
  roi: number;
  trades: {
    won: number;
    total: number;
  };
  holding: number;
  avgBuy: number;
  avgSell: number;
  heldTime: string;
  tokenUrl: string;
  createdAt: string;
}

export type TimePeriod = 'daily' | 'weekly' | 'monthly' | 'all-time';