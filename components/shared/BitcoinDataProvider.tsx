// components/shared/BitcoinDataProvider.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";

type MarketData = {
  market: string;
  volumeEx: number;
  volumeQt: number;
  pricechange: string;
  quickTradePrice: string;
  pair: string;
  virtualCurrency: string;
  currency: string;
  volume: number;
  quickTradePriceChange: string;
  buy?: string;
  sell?: string;
  "24hoursHigh"?: string;
  "24hoursLow"?: string;
};

type BitcoinContextType = {
  btcData: MarketData | null;
  loading: boolean;
  error: string | null;
  currentPrice: string;
  highestPrice: string;
  lowPrice: string | undefined;
  priceChange: number;
  calculateSats: (priceInRupees: number) => number;
  calculateSatValue: (priceInRupees: number) => number;
  calculateSatsForAmount: (priceInRupees: number, rupeeAmount: number) => number;
};

const BitcoinContext = createContext<BitcoinContextType | undefined>(undefined);

export function BitcoinDataProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [btcData, setBtcData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBTCData = async () => {
      try {
        const response = await fetch("https://www.zebapi.com/api/v1/market");
        if (!response.ok) {
          throw new Error("Failed to fetch market data");
        }
        const data: MarketData[] = await response.json();
        
        // Find BTC-INR pair
        const btcInrData = data.find(item => item.pair === "BTC-INR");
        setBtcData(btcInrData || null);
        setError(btcInrData ? null : "BTC-INR data not found");
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBTCData();
  }, []);

  // Calculate functions
  const calculateSats = (priceInRupees: number) => {
    const satsPerRupee = 100000000 / priceInRupees;
    return Math.round(satsPerRupee);
  };

  const calculateSatValue = (priceInRupees: number) => {
    const satValue = priceInRupees / 100000000;
    return satValue;
  };

  const calculateSatsForAmount = (priceInRupees: number, rupeeAmount: number) => {
    const satsPerRupee = 100000000 / priceInRupees;
    return Math.round(satsPerRupee * rupeeAmount);
  };

  const currentPrice = btcData?.market || "0";
  const highestPrice = btcData?.["24hoursHigh"] || btcData?.market || "0";
  const lowPrice = btcData?.["24hoursLow"];
  const priceChange = parseFloat(btcData?.pricechange || "0");

  const value: BitcoinContextType = useMemo(() => ({
    btcData,
    loading,
    error,
    currentPrice,
    highestPrice,
    lowPrice,
    priceChange,
    calculateSats,
    calculateSatValue,
    calculateSatsForAmount,
  }), [btcData, loading, error, currentPrice, highestPrice, lowPrice, priceChange]);

  return (
    <BitcoinContext.Provider value={value}>
      {children}
    </BitcoinContext.Provider>
  );
}

export function useBitcoinData() {
  const context = useContext(BitcoinContext);
  if (context === undefined) {
    throw new Error("useBitcoinData must be used within a BitcoinDataProvider");
  }
  return context;
}
