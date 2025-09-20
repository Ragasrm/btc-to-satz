"use client";

import { useState, useEffect } from "react";
import InfoCard from "@/components/shared/InfoCard";
import DisclaimerCard from "@/components/shared/DisclaimerCard";

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

export default function BTCPrice() {
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

  if (loading) {
    return (
      <div className="mt-8 p-4 bg-gray-800 rounded-lg">
        <p className="text-gray-300">Loading BTC price...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-4 bg-red-900 rounded-lg">
        <p className="text-red-300">Error: {error}</p>
      </div>
    );
  }

  if (!btcData) {
    return (
      <div className="mt-8 p-4 bg-gray-800 rounded-lg">
        <p className="text-gray-300">No BTC-INR data available</p>
      </div>
    );
  }

  const highestPrice = btcData["24hoursHigh"] || btcData.market;
  const currentPrice = btcData.market;
  const priceChange = parseFloat(btcData.pricechange);
  const lowPrice = btcData["24hoursLow"];

  // Convert numbers to simple, understandable words
  const formatPriceInWords = (price: number) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(1)} crores`;
    } else if (price >= 100000) {
      return `${(price / 100000).toFixed(1)} lakhs`;
    } else if (price >= 1000) {
      return `${(price / 1000).toFixed(1)} thousands`;
    }
    return price.toFixed(0);
  };

  // Calculate sats equivalent
  const calculateSats = (priceInRupees: number) => {
    const satsPerRupee = 100000000 / priceInRupees; // 1 BTC = 100,000,000 sats
    return Math.round(satsPerRupee);
  };

  // Calculate 1 Sat value in rupees
  const calculateSatValue = (priceInRupees: number) => {
    const satValue = priceInRupees / 100000000; // 1 BTC = 100,000,000 sats
    return satValue;
  };

  // Calculate sats for different rupee amounts
  const calculateSatsForAmount = (priceInRupees: number, rupeeAmount: number) => {
    const satsPerRupee = 100000000 / priceInRupees;
    return Math.round(satsPerRupee * rupeeAmount);
  };

  const getPriceChangeDescription = (change: number) => {
    if (change > 0) {
      return `Bitcoin gained ${change.toFixed(2)}% today - good news for investors!`;
    } else if (change < 0) {
      return `Bitcoin dropped ${Math.abs(change).toFixed(2)}% today - a buying opportunity!`;
    } else {
      return "Bitcoin price stayed stable today";
    }
  };

  const getEducationalMessage = (price: number) => {
    const sats = calculateSats(price);
    if (price >= 10000000) {
      return `That's ₹${formatPriceInWords(price)}! You can buy ${sats.toLocaleString()} sats with just ₹1.`;
    } else if (price >= 100000) {
      return `That's ₹${formatPriceInWords(price)}! You can buy ${sats.toLocaleString()} sats with just ₹1.`;
    } else {
      return `You can buy ${sats.toLocaleString()} sats with just ₹1!`;
    }
  };

  return (
    <div className="w-full px-2 sm:px-4 py-4 sm:py-8">
      {/* Hero Section */}
      <div className="text-center mb-6 sm:mb-8 px-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-orange-500 mb-3 sm:mb-4">💰 Bitcoin Price Today</h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-400">Making Bitcoin simple for everyone to understand</p>
      </div>

      {/* Main Price Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
        {/* Current Price - Large Display */}
        <div className="lg:col-span-2 bg-gradient-to-br from-gray-800 to-gray-700 p-4 sm:p-6 lg:p-8 rounded-xl shadow-2xl">
          <div className="text-center mb-4 lg:mb-6">
            <h3 className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-3 lg:mb-4">Current Bitcoin Price</h3>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 lg:mb-4 break-all">
              ₹{parseFloat(currentPrice).toLocaleString()}
            </div>
            <p className="text-sm sm:text-base lg:text-xl text-gray-400 mb-3 lg:mb-4 px-2">
              One Bitcoin costs ₹{formatPriceInWords(parseFloat(currentPrice))} rupees
            </p>
            <div className="bg-blue-900/30 p-3 lg:p-4 rounded-lg border border-blue-500/50">
              <p className="text-sm sm:text-base lg:text-lg text-blue-300 font-medium">
                💡 {getEducationalMessage(parseFloat(currentPrice))}
              </p>
            </div>
          </div>
        </div>

        {/* Satoshi Education */}
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 p-4 sm:p-6 rounded-xl border border-blue-500/50">
          <h3 className="text-lg sm:text-xl lg:text-2xl text-blue-400 font-bold mb-3 lg:mb-4">🪙 What are Satoshis?</h3>
          <p className="text-sm sm:text-base text-blue-300 mb-3 lg:mb-4">
            Bitcoin is too expensive? No problem! You can buy tiny pieces called Sats (Satoshis).
          </p>
          <div className="bg-blue-800/50 p-3 lg:p-4 rounded-lg mb-3 lg:mb-4">
            <p className="text-blue-200 text-center text-sm sm:text-base lg:text-lg">
              <strong>1 Bitcoin = 100 million Sats</strong>
            </p>
          </div>
          <div className="bg-blue-700/50 p-3 lg:p-4 rounded-lg text-center">
            <p className="text-blue-100 text-sm sm:text-base">
              With ₹1, you can buy
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-300 break-all">
              {calculateSats(parseFloat(currentPrice)).toLocaleString()} Sats
            </p>
          </div>
        </div>
      </div>

      {/* Price Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <InfoCard
          title="Today's Peak"
          value={`₹${parseFloat(highestPrice).toLocaleString()}`}
          description={`Bitcoin hit its highest price today at ₹${formatPriceInWords(parseFloat(highestPrice))} rupees`}
          icon="📈"
          bgColor="bg-gradient-to-br from-green-900/30 to-green-800/30"
          textColor="text-green-400"
          borderColor="border-green-500/50"
          valueColor="text-green-300"
        />

        <InfoCard
          title="Today's Change"
          value={`${priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)}%`}
          description={getPriceChangeDescription(priceChange)}
          icon="📊"
          bgColor={priceChange >= 0 ? 'bg-gradient-to-br from-green-900/30 to-green-800/30' : 'bg-gradient-to-br from-red-900/30 to-red-800/30'}
          textColor={priceChange >= 0 ? 'text-green-400' : 'text-red-400'}
          borderColor={priceChange >= 0 ? 'border-green-500/50' : 'border-red-500/50'}
          valueColor={priceChange >= 0 ? 'text-green-300' : 'text-red-300'}
        />

        {lowPrice && (
          <InfoCard
            title="Today's Lowest"
            value={`₹${parseFloat(lowPrice).toLocaleString()}`}
            description={`Bitcoin's lowest price today was ₹${formatPriceInWords(parseFloat(lowPrice))} rupees`}
            icon="📉"
            bgColor="bg-gradient-to-br from-red-900/30 to-red-800/30"
            textColor="text-red-400"
            borderColor="border-red-500/50"
            valueColor="text-red-300"
          />
        )}
      </div>

      {/* Dynamic Satoshi Calculator */}
      <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 p-4 sm:p-6 lg:p-8 rounded-xl border border-purple-500/50 mb-8">
        <h3 className="text-xl sm:text-2xl lg:text-3xl text-purple-400 font-bold mb-4 lg:mb-6 text-center">🪙 Dynamic Satoshi Calculator</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <InfoCard
            title="1 Sat Value"
            value={`₹${calculateSatValue(parseFloat(currentPrice)).toFixed(6)}`}
            description="Current value of 1 Satoshi"
            icon="🪙"
            bgColor="bg-purple-800/50"
            textColor="text-purple-300"
            borderColor="border-purple-500/30"
            valueColor="text-purple-200"
          />

          <InfoCard
            title="For ₹1"
            value={`${calculateSatsForAmount(parseFloat(currentPrice), 1).toLocaleString()} Sats`}
            description="Sats you can buy with ₹1"
            icon="💰"
            bgColor="bg-indigo-800/50"
            textColor="text-indigo-300"
            borderColor="border-indigo-500/30"
            valueColor="text-indigo-200"
          />

          <InfoCard
            title="For ₹10"
            value={`${calculateSatsForAmount(parseFloat(currentPrice), 10).toLocaleString()} Sats`}
            description="Sats you can buy with ₹10"
            icon="💵"
            bgColor="bg-blue-800/50"
            textColor="text-blue-300"
            borderColor="border-blue-500/30"
            valueColor="text-blue-200"
          />

          <InfoCard
            title="For ₹100"
            value={`${calculateSatsForAmount(parseFloat(currentPrice), 100).toLocaleString()} Sats`}
            description="Sats you can buy with ₹100"
            icon="💸"
            bgColor="bg-cyan-800/50"
            textColor="text-cyan-300"
            borderColor="border-cyan-500/30"
            valueColor="text-cyan-200"
          />
        </div>

        {/* Comparison with old rate */}
        <div className="mt-6 bg-gray-800/50 p-4 rounded-lg">
          <div className="text-center">
            <p className="text-gray-300 mb-2">
              <strong>Price Comparison:</strong>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-orange-900/30 p-3 rounded">
                <p className="text-orange-300">
                  <strong>Old Rate:</strong> 1 Sat = ₹0.032
                </p>
                <p className="text-orange-200 text-sm">
                  ₹1 = {Math.round(1/0.032).toLocaleString()} Sats
                </p>
              </div>
              <div className="bg-green-900/30 p-3 rounded">
                <p className="text-green-300">
                  <strong>Current Rate:</strong> 1 Sat = ₹{calculateSatValue(parseFloat(currentPrice)).toFixed(6)}
                </p>
                <p className="text-green-200 text-sm">
                  ₹1 = {calculateSatsForAmount(parseFloat(currentPrice), 1).toLocaleString()} Sats
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Life Impact - Food Prices in Sats */}
      <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 p-4 sm:p-6 lg:p-8 rounded-xl border border-yellow-500/50 mb-8">
        <h3 className="text-xl sm:text-2xl lg:text-3xl text-yellow-400 font-bold mb-4 lg:mb-6 text-center">🍽️ Daily Life Impact - Food Prices in Sats</h3>
        <p className="text-yellow-300 text-center text-sm sm:text-base mb-6">
          See how Bitcoin Sats compare to your everyday food expenses
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          <InfoCard
            title="Chai (Tea)"
            value={`${calculateSatsForAmount(parseFloat(currentPrice), 15).toLocaleString()} Sats`}
            description="₹15 = One cup of chai"
            icon="☕"
            bgColor="bg-gradient-to-br from-amber-800/50 to-yellow-800/50"
            textColor="text-amber-300"
            borderColor="border-amber-500/50"
            valueColor="text-amber-200"
          />

          <InfoCard
            title="Dosa"
            value={`${calculateSatsForAmount(parseFloat(currentPrice), 50).toLocaleString()} Sats`}
            description="₹50 = One crispy dosa"
            icon="🥞"
            bgColor="bg-gradient-to-br from-orange-800/50 to-red-800/50"
            textColor="text-orange-300"
            borderColor="border-orange-500/50"
            valueColor="text-orange-200"
          />

          <InfoCard
            title="Biryani"
            value={`${calculateSatsForAmount(parseFloat(currentPrice), 200).toLocaleString()} Sats`}
            description="₹200 = One plate of biryani"
            icon="🍛"
            bgColor="bg-gradient-to-br from-red-800/50 to-pink-800/50"
            textColor="text-red-300"
            borderColor="border-red-500/50"
            valueColor="text-red-200"
          />
        </div>

        {/* Fun Fact */}
        <div className="mt-6 bg-gradient-to-r from-yellow-800/30 to-orange-800/30 p-4 rounded-lg border border-yellow-500/30">
          <div className="text-center">
            <h4 className="text-yellow-300 font-semibold mb-2 flex items-center justify-center">
              <span className="text-yellow-400 mr-2">💡</span>
              Fun Fact
            </h4>
            <p className="text-yellow-200 text-sm sm:text-base">
              Instead of spending ₹265 on chai + dosa + biryani, you could buy{' '}
              <strong className="text-yellow-300">
                {(calculateSatsForAmount(parseFloat(currentPrice), 15) + 
                  calculateSatsForAmount(parseFloat(currentPrice), 50) + 
                  calculateSatsForAmount(parseFloat(currentPrice), 200)).toLocaleString()} Sats
              </strong>{' '}
              and potentially grow your wealth over time! 🚀
            </p>
          </div>
        </div>
      </div>

      {/* Educational Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Why Stack Sats */}
        <div className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 p-6 rounded-xl border border-orange-500/50">
          <h3 className="text-2xl text-orange-400 font-bold mb-4">🚀 Why Stack Sats?</h3>
          <p className="text-orange-300 mb-4 text-lg">
            <strong>Don&apos;t buy whole Bitcoin - buy Sats instead!</strong>
          </p>
          <ul className="text-orange-300 space-y-3">
            <li className="flex items-center">
              <span className="text-orange-400 mr-3">•</span>
              Start with just ₹10-₹100
            </li>
            <li className="flex items-center">
              <span className="text-orange-400 mr-3">•</span>
              Buy regularly (daily/weekly)
            </li>
            <li className="flex items-center">
              <span className="text-orange-400 mr-3">•</span>
              Build wealth over time
            </li>
            <li className="flex items-center">
              <span className="text-orange-400 mr-3">•</span>
              No need to wait for Bitcoin to drop
            </li>
          </ul>
        </div>

        {/* Simple Summary */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl border border-gray-600/50">
          <h3 className="text-2xl text-white font-bold mb-4">💡 Simple Takeaway</h3>
          <div className="bg-gray-700/50 p-4 rounded-lg mb-4">
            <p className="text-gray-300 text-center text-lg">
              Bitcoin costs ₹{parseFloat(currentPrice).toLocaleString()} today
            </p>
          </div>
          <div className="bg-orange-900/30 p-4 rounded-lg text-center">
            <p className="text-orange-200 mb-2">
              Instead of buying 1 Bitcoin, buy
            </p>
            <p className="text-2xl font-bold text-orange-300 mb-2">
              {calculateSats(parseFloat(currentPrice)).toLocaleString()} Sats
            </p>
            <p className="text-orange-200">
              with ₹1 and start your journey!
            </p>
          </div>
        </div>
      </div>

      {/* Professional Disclaimer */}
      <div className="mt-8 bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-xl border border-gray-600/50">
        <h3 className="text-xl text-gray-300 font-semibold mb-4 flex items-center">
          <span className="text-yellow-400 mr-2">⚠️</span>
          Important Information & Disclaimers
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <DisclaimerCard
            title="Data Source"
            icon="📊"
            bgColor="bg-gray-700/50"
            textColor="text-gray-300"
            borderColor="border-gray-600/30"
          >
            <p className="text-gray-400 text-xs sm:text-sm mb-2">
              Price data is sourced from <strong className="text-blue-300">ZebAPI</strong> market endpoint
            </p>
            <div className="bg-gray-800/50 p-2 rounded border">
              <p className="text-gray-400 text-xs sm:text-sm mb-1">
                <strong>API Endpoint:</strong>
              </p>
              <code className="text-blue-300 text-xs sm:text-sm break-all block">
                https://www.zebapi.com/api/v1/market
              </code>
            </div>
          </DisclaimerCard>

          <DisclaimerCard
            title="Investment Risk Warning"
            icon="🚨"
            bgColor="bg-red-900/20"
            textColor="text-red-300"
            borderColor="border-red-500/30"
          >
            <p className="text-red-200 text-xs sm:text-sm mb-2">
              <strong>Cryptocurrency investments are highly volatile and risky.</strong>
            </p>
            <p className="text-red-200 text-xs sm:text-sm">
              Past performance does not guarantee future results. Only invest what you can afford to lose.
            </p>
          </DisclaimerCard>

          <DisclaimerCard
            title="Price Accuracy"
            icon="⏰"
            bgColor="bg-yellow-900/20"
            textColor="text-yellow-300"
            borderColor="border-yellow-500/30"
          >
            <p className="text-yellow-200 text-xs sm:text-sm mb-2">
              Prices are updated in real-time but may have slight delays
            </p>
            <p className="text-yellow-200 text-xs sm:text-sm">
              Always verify current prices before making investment decisions
            </p>
          </DisclaimerCard>

          <DisclaimerCard
            title="Educational Purpose"
            icon="📚"
            bgColor="bg-green-900/20"
            textColor="text-green-300"
            borderColor="border-green-500/30"
          >
            <p className="text-green-200 text-xs sm:text-sm mb-2">
              This platform is designed for educational purposes only
            </p>
            <p className="text-green-200 text-xs sm:text-sm">
              Not financial advice. Consult professionals before investing
            </p>
          </DisclaimerCard>
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-4 pt-4 border-t border-gray-600/50">
          <p className="text-gray-400 text-xs text-center">
            <strong>Disclaimer:</strong> This application provides Bitcoin price information and educational content about Satoshi stacking. 
            All data is sourced from third-party APIs and should be used for informational purposes only. 
            We are not responsible for any financial losses or investment decisions made based on this information. 
            Always conduct your own research and consult with qualified financial advisors before making investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
