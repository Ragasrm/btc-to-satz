// components/shared/SatoshiCalculator.tsx
import InfoCard from "./InfoCard";

type SatoshiCalculatorProps = {
  readonly currentPrice: string;
  readonly calculateSatValue: (priceInRupees: number) => number;
  readonly calculateSatsForAmount: (priceInRupees: number, rupeeAmount: number) => number;
};

export default function SatoshiCalculator({ currentPrice, calculateSatValue, calculateSatsForAmount }: SatoshiCalculatorProps) {
  return (
    <div className="w-full bg-gradient-to-br from-purple-900/30 to-indigo-900/30 p-4 sm:p-6 lg:p-8 rounded-xl border border-purple-500/50 mb-8">
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
  );
}
