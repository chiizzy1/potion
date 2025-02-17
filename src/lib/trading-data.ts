import { TradingData } from "@/types";
import { UserIcon } from "@/assets"
import { generateRandomDate } from "./utils";


export const tradingData: TradingData[] = [
    {
        id: "1",
        avatar: UserIcon,
        tokenName: "Retardio",
        contractAddress: "Zo9tA4FpXzT2N9HjVC3K2zYqP5LTJX7N8wMFGv1DB6pump",
        lastTrade: "20m",
        marketCap: 27900,
        invested: 100.2,
        realizedPNL: 1001.2,
        roi: 74,
        trades: {
            won: 1,
            total: 5,
        },
        holding: 11.2,
        avgBuy: 6900,
        avgSell: 225000,
        heldTime: "30m",
        tokenUrl: 'https://solscan.io/account/airhGYCQMFJJyTAhvwCcJ79jMGuBZGUGBBAkduFavZ8',
        createdAt: generateRandomDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()),

    },
    {
        id: "2",
        avatar: UserIcon,
        tokenName: "ORANGIE",
        contractAddress: "X8twvT3KqM5D4JgQ7B6JzoMTUFAVC3GK9XoLZRpF2Npump",
        lastTrade: "2m",
        marketCap: 279000,
        invested: 10.2,
        realizedPNL: 101.2,
        roi: 74,
        trades: {
            won: 5,
            total: 8,
        },
        holding: 102.2,
        avgBuy: 690,
        avgSell: 22500,
        heldTime: "3hr",
        tokenUrl: 'https://solscan.io/account/airhGYCQMFJJyTAhvwCcJ79jMGuBZGUGBBAkduFavZ8',
        createdAt: generateRandomDate(new Date(Date.now() - 24 * 60 * 60 * 1000), new Date()),

    },
    {
        id: "3",
        avatar: UserIcon,
        tokenName: "Jeet",
        contractAddress: "YQoMTUFAVC3GK9XoLZRpF2N1X8twvT3KqM5D4JgQ7Bpump",
        lastTrade: "12m",
        marketCap: 27900000,
        invested: 22.2,
        realizedPNL: 91.2,
        roi: -74,
        trades: {
            won: 1,
            total: 9,
        },
        holding: 1.2,
        avgBuy: 690000,
        avgSell: 2250000,
        heldTime: "3days",
        tokenUrl: 'https://solscan.io/account/airhGYCQMFJJyTAhvwCcJ79jMGuBZGUGBBAkduFavZ8',
        createdAt: generateRandomDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()),

    },
    {
        id: "4",
        avatar: UserIcon,
        tokenName: "Weed",
        contractAddress: "V3XTsWfD4Jgq7B5hXA9N1xM8dB2FKZRpF2N1X8twvTpump",
        lastTrade: "12m",
        marketCap: 27900000,
        invested: 22.2,
        realizedPNL: 91.2,
        roi: -74,
        trades: {
            won: 1,
            total: 9,
        },
        holding: 1.2,
        avgBuy: 690000,
        avgSell: 2250000,
        heldTime: "3days",
        tokenUrl: 'https://solscan.io/account/airhGYCQMFJJyTAhvwCcJ79jMGuBZGUGBBAkduFavZ8',
        createdAt: generateRandomDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()),

    },
]

