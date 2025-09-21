"use client";

// Components
import BTCPrice from "@/components/BTCPrice/BTCPrice";
import SatoshiCalculator from "@/components/shared/SatoshiCalculator";
import DailyLifeImpact from "@/components/shared/DailyLifeImpact";
import EducationalSection from "@/components/shared/EducationalSection";
import ProfessionalDisclaimer from "@/components/shared/ProfessionalDisclaimer";
import Donation from "@/components/shared/Donation";
import { useBitcoinData } from "@/components/shared/BitcoinDataProvider";

export default function Home() {
  const { 
    currentPrice, 
    calculateSatValue, 
    calculateSatsForAmount, 
    calculateSats,
    loading,
    error
  } = useBitcoinData();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-orange-500 mb-2">Loading Bitcoin Data</h2>
          <p className="text-gray-400">Fetching latest prices and market data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-400 mb-2">Unable to Load Data</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-white py-8">
      
      <SatoshiCalculator 
        currentPrice={currentPrice}
        calculateSatValue={calculateSatValue}
        calculateSatsForAmount={calculateSatsForAmount}
      />

      <BTCPrice />
      
      {/* Additional Sections */}
   
      
      <DailyLifeImpact 
        currentPrice={currentPrice}
        calculateSatsForAmount={calculateSatsForAmount}
      />
      
      <EducationalSection 
        currentPrice={currentPrice}
        calculateSats={calculateSats}
      />
      
      <ProfessionalDisclaimer />
      
      {/* Donation Component */}
      <Donation />
    </div>
  );
}
