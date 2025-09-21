// components/shared/EducationalSection.tsx
type EducationalSectionProps = {
  readonly currentPrice: string;
  readonly calculateSats: (priceInRupees: number) => number;
};

export default function EducationalSection({ currentPrice, calculateSats }: EducationalSectionProps) {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
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
  );
}
