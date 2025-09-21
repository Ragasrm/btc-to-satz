"use client";

import InfoCard from "@/components/shared/InfoCard";
import { useBitcoinData } from "@/components/shared/BitcoinDataProvider";

export default function BTCPrice() {
  const { 
    currentPrice, 
    highestPrice, 
    lowPrice, 
    priceChange,
    calculateSats
  } = useBitcoinData();


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

    </div>
  );
}
