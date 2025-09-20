// components/Footer/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-center py-4 border-t border-gray-700">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-gray-300 text-sm mb-2">
          🚀 Making Bitcoin accessible for every Indian
        </p>
        <div className="flex justify-center space-x-6 text-xs text-gray-400">
          <span>Start stacking sats today</span>
          <span>•</span>
          <span>Build wealth gradually</span>
          <span>•</span>
          <span>No minimum investment</span>
        </div>
        <p className="text-gray-500 text-xs mt-2">
          © 2024 BTC Sats App - Empowering financial freedom through Bitcoin
        </p>
      </div>
    </footer>
  );
}
