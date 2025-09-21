// components/Footer/Footer.tsx
export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-gray-800 text-center py-3 sm:py-4 border-t border-gray-700">
      <div className="max-w-4xl mx-auto px-2 sm:px-4">
        <p className="text-gray-300 text-xs sm:text-sm mb-2">
          🚀 Making Bitcoin accessible for every Indian
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-6 text-xs text-gray-400 mb-2">
          <span>Start stacking sats today</span>
          <span className="hidden sm:inline">•</span>
          <span>Build wealth gradually</span>
          <span className="hidden sm:inline">•</span>
          <span>No minimum investment</span>
        </div>
        <p className="text-gray-500 text-xs mt-2 break-words">
          © {currentYear} BTC Sats App - Made by Ragav Endiran
        </p>
        <p className="text-gray-500 text-xs mt-1">
          Empowering financial freedom through Bitcoin
        </p>
      </div>
    </footer>
  );
}
