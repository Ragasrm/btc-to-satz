// components/shared/DonationModal.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

type DonationModalProps = {
  readonly isOpen: boolean;
  readonly onClose: () => void;
};

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
  // Lightning Network invoice (this would typically be generated dynamically)
  const lightningInvoice = "lnurl1dp68gurn8ghj7ampd3kx2ar0veekzar0wd5xjtnrdakj7tnhv4kxctttdehhwm30d3h82unvwqhkymmed9ekser4vahh2apcxudcec69"; // Example invoice
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(lightningInvoice);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-600">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-orange-500 flex items-center">
            <span className="mr-2">⚡</span>
            Lightning Donation
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="text-center">
          <p className="text-gray-300 mb-4">
            Support Bitcoin education in India! 
            <br />
            <span className="text-orange-400">Every sat helps spread Bitcoin knowledge</span>
          </p>

          {/* QR Code Image */}
          <div className="bg-white p-4 rounded-lg mb-4 mx-auto w-64 h-64 flex items-center justify-center">
            <Image 
              src="/qr-code.png" 
              alt="Lightning Payment QR Code" 
              width={256}
              height={256}
              className="object-contain"
            />
          </div>

          {/* Lightning Invoice */}
          <div className="bg-gray-700 p-3 rounded-lg mb-4">
            <p className="text-gray-300 text-sm mb-2">Lightning Invoice:</p>
            <div className="flex items-center space-x-2">
              <code className="text-blue-300 text-xs break-all flex-1">
                {lightningInvoice}
              </code>
              <button
                onClick={handleCopy}
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  copied 
                    ? 'bg-green-600 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-left bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
            <h3 className="text-blue-400 font-semibold mb-2">How to donate:</h3>
            <ol className="text-blue-200 text-sm space-y-1">
              <li>1. Open your Lightning wallet</li>
              <li>2. Scan the QR code above</li>
              <li>3. Enter amount and confirm</li>
              <li>4. Support Bitcoin education! 🚀</li>
            </ol>
          </div>

          {/* Popular Lightning Wallets */}
          <div className="mt-4">
            <p className="text-gray-400 text-sm mb-2">Recommended wallets:</p>
            <div className="flex justify-center space-x-4 text-xs">
              <span className="text-gray-500">Phoenix</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500">Breez</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500">Wallet of Satoshi</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-600">
          <p className="text-gray-500 text-xs text-center">
            Thank you for supporting Bitcoin education in India! 🇮🇳
          </p>
        </div>
      </div>
    </div>
  );
}
