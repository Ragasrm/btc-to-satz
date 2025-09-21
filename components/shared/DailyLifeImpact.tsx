// components/shared/DailyLifeImpact.tsx
import InfoCard from "./InfoCard";

type DailyLifeImpactProps = {
  readonly currentPrice: string;
  readonly calculateSatsForAmount: (priceInRupees: number, rupeeAmount: number) => number;
};

export default function DailyLifeImpact({ currentPrice, calculateSatsForAmount }: DailyLifeImpactProps) {
  return (
    <div className="w-full bg-gradient-to-br from-yellow-900/30 to-orange-900/30 p-4 sm:p-6 lg:p-8 rounded-xl border border-yellow-500/50 mb-8">
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
  );
}
