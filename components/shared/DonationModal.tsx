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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-xl p-4 sm:p-6 max-w-md w-full border border-gray-600 my-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-orange-500 flex items-center">
            <span className="mr-2">⚡</span>
            Lightning Donation
          </h2>
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transition-colors"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="text-center">
          <p className="text-gray-300 mb-4">
            Support Bitcoin education in India! 
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
