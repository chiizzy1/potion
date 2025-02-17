import { useMemo } from "react";
import { subDays } from "date-fns";
import { TimePeriod } from "@/types";

interface WithCreatedAt {
  createdAt: string;
}

export function useDateFilter<T extends WithCreatedAt>(data: T[] | null, period: TimePeriod): T[] {
  return useMemo(() => {
    if (!data) return [];

    const now = new Date();
    const startDate = (() => {
      switch (period) {
        case "daily":
          return subDays(now, 1);
        case "weekly":
          return subDays(now, 7);
        case "monthly":
          return subDays(now, 30);
        case "all-time":
          return new Date(0);
      }
    })();

    return data.filter((item) => {
      const itemDate = new Date(item.createdAt);
      return itemDate >= startDate! && itemDate <= now;
    });
  }, [data, period]);
}
