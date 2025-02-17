import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNowStrict } from 'date-fns'
import { enUS } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateAddress = (address: string) => {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 6
  )}`;
};

const formatDistanceLocale = {
  lessThanXSeconds: 'just now',
  xSeconds: 'just now',
  halfAMinute: 'just now',
  lessThanXMinutes: '{{count}}m',
  xMinutes: '{{count}}m',
  aboutXHours: '{{count}}h',
  xHours: '{{count}}h',
  xDays: '{{count}}d',
  aboutXWeeks: '{{count}}w',
  xWeeks: '{{count}}w',
  aboutXMonths: '{{count}}m',
  xMonths: '{{count}}m',
  aboutXYears: '{{count}}y',
  xYears: '{{count}}y',
  overXYears: '{{count}}y',
  almostXYears: '{{count}}y',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatDistance(token: string, count: number, options?: any): string {
  options = options || {}

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace('{{count}}', count.toString())

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result
    } else {
      if (result === 'just now') return result
      return result + ' ago'
    }
  }

  return result
}

export function formatTimeToNow(date: Date) {
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date provided");
  }

  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...enUS,
      formatDistance,
    },
  });
}


export function formatAmount(amount: number): string {
  if (amount % 1 === 0) {
    return amount.toLocaleString();
  }
  const formatted = amount.toFixed(2);
  return formatted.endsWith("0") ? parseFloat(formatted).toLocaleString() : formatted;
}

export const formatMoney = (amount: number): string => {
  if (amount < 1000) return amount.toString();
  const units = ['K', 'M', 'B', 'T'];
  const index = Math.floor(Math.log10(amount) / 3) - 1;
  const formattedAmount = (amount / Math.pow(1000, index + 1)).toFixed(0);
  return `${formattedAmount}${units[index]}`;
}


export function formatUSD(amount: number): string {
  return amount % 1 === 0
    ? `$${amount.toLocaleString()}`
    : `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatAvgEntry(amount: number): string {
  if (amount < 1000) {
    return "<$1K";
  } else if (amount >= 1_000_000_000) {
    return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  } else if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  } else if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(amount % 1 === 0 ? 0 : 1)}K`;
  }
  return "$0";
}

export const generateRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

