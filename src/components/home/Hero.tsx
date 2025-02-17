"use client";

import { FC, useEffect, useState } from "react";
import { traders as mockTraders } from "@/lib/mock-trader";
import { Button } from "@/components/ui/button";
import { SponsorBanner } from "@/components/Sponsor";
import { periods } from "@/constants";
import SearchBar from "@/components/SearchBar";
import { columns } from "@/components/home/columns";
import { TbChartCandleFilled } from "react-icons/tb";
import { AlertBanner } from "@/components/AlertBanner";
import { TimePeriod, Trader } from "@/types";
import { useDateFilter } from "@/hooks/useDateFilter";
import { DataTable } from "./DataTable";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Hero: FC = () => {
  const [traders, setTraders] = useState<Trader[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [period, setPeriod] = useState<TimePeriod>("all-time");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["traders"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return mockTraders;
    },
  });

  useEffect(() => {
    if (data) {
      setTraders(data);
      console.log("data: ", data);
    }
  }, [data]);

  const filteredTraders = useDateFilter(traders!, period);

  if (isLoading)
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
        <AlertBanner />
        <SponsorBanner />

        <Tabs defaultValue="traders" className="relative">
          <TabsList className="flex flex-col lg:flex-row items-center justify-between pt-12 lg:pt-0 pb-6 lg:pb-0">
            <div className="flex items-center gap-1 sm:gap-2 md:gap-4 justify-between lg:gap-[104px] w-full">
              <div className="flex items-center gap-1 sm:gap-2">
                <TabsTrigger value="traders">Traders</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 md:gap-[18px]">
                {periods.map((p) => (
                  <Button
                    className={`h-[37px] rounded-[20px] px-[8px] sm:px-[16px] ${
                      period === p ? "bg-secondary border border-tertiary/50" : "bg-transparent"
                    }  shadow-sm`}
                    onClick={() => setPeriod(p)}
                    key={p}
                  >
                    <span
                      className={`text-[10px] sm:text-[14px] leading-[12.64px] sm:leading-[17.64px] -tracking-[2%] capitalize ${
                        period === p ? "text-white" : "text-tertiary"
                      }`}
                    >
                      {p}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1 md:gap-[18px] w-full absolute lg:static -top-4 justify-end">
              <SearchBar placeholder="Search by name or wallet" value={searchValue} onChange={setSearchValue} />
              <div className="flex items-center justify-center w-[53px] h-[37px] border border-tertiary/50 rounded-[20px]">
                <TbChartCandleFilled className="w-[20px] h-[20px]" />
              </div>
            </div>
          </TabsList>

          <TabsContent value="traders" className="w-full pt-[22px]">
            <DataTable columns={columns} data={filteredTraders} searchValue={searchValue} />
          </TabsContent>
          <TabsContent value="groups" className="w-full pt-[22px]">
            <div className="flex items-center justify-center h-screen">
              <h2 className="font-bold text-[24px] leading-[30.2px] -tracking-[2%]">Coming Soon...</h2>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Hero;
