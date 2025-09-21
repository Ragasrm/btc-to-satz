// components/shared/ProfessionalDisclaimer.tsx
import DisclaimerCard from "./DisclaimerCard";

export default function ProfessionalDisclaimer() {
  return (
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
  );
}
