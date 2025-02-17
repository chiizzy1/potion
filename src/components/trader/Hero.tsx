"use client";

import { FC, useEffect, useState } from "react";
import TraderDetails from "./TraderDetails";
import { TbChartCandleFilled } from "react-icons/tb";
import { DataTable } from "./DataTable";
import { columns } from "./columns";
import { useGetTraderDetails } from "@/hooks/useGetTraderDetails";
import { TimePeriod, Trader, TradingData } from "@/types";
import SearchBar from "../SearchBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDateFilter } from "@/hooks/useDateFilter";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../ui/spinner";
import { toast } from "sonner";

interface HeroProps {
  userId: string;
}

const Hero: FC<HeroProps> = ({ userId }) => {
  const [userData, setuserData] = useState<Trader>();
  const [searchValue, setSearchValue] = useState("");
  const [trades, setTrades] = useState<TradingData[]>();
  const [period, setPeriod] = useState<TimePeriod>("all-time");

  const { getTraderById } = useGetTraderDetails();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["trader"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const userdata = await getTraderById(userId);
      return userdata;
    },
  });

  useEffect(() => {
    if (data) {
      setuserData(data);
      setTrades(data!.tradeHistory);
      console.log("data: ", data);
    }
  }, [data]);

  const filteredTraders = useDateFilter(trades!, period);

  if (isLoading || !userData)
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );

  if (isError) {
    toast.error("An error occurred while fetching trader details. Please try again later.");
  }

  return (
    <section className="">
      <div className="container w-full max-w-[1342px] mx-auto">
        <div className="flex flex-col gap-[52px]">
          <TraderDetails userData={userData} period={period} onSelectPeriod={(val) => setPeriod(val)} />

          <Tabs defaultValue="trades" className="relative">
            <TabsList className="flex items-center justify-between lg:pt-0 pt-10 lg:pb-0 pb-3">
              <div className="flex items-center gap-2">
                <TabsTrigger value="trades">Trades</TabsTrigger>
                <TabsTrigger value="tokens">Tokens</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
              </div>

              <div className="flex items-center gap-1 md:gap-[18px] w-full justify-end absolute md:static -top-8">
                <SearchBar placeholder="Search by name or wallet" value={searchValue} onChange={setSearchValue} />
                <div className="flex items-center justify-center w-[53px] h-[37px] border border-tertiary/50 rounded-[20px]">
                  <TbChartCandleFilled className="w-[20px] h-[20px]" />
                </div>
              </div>
            </TabsList>
            <TabsContent value="trades" className="w-full pt-[22px]">
              <DataTable columns={columns} data={filteredTraders} searchValue={searchValue} />
            </TabsContent>
            <TabsContent value="tokens" className="w-full pt-[22px]">
              <div className="flex items-center justify-center h-screen">
                <h2 className="font-bold text-[24px] leading-[30.2px] -tracking-[2%]">Coming Soon...</h2>
              </div>
            </TabsContent>
            <TabsContent value="groups" className="w-full pt-[22px]">
              <div className="flex items-center justify-center h-screen">
                <h2 className="font-bold text-[24px] leading-[30.2px] -tracking-[2%]">Coming Soon...</h2>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Hero;
