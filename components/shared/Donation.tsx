// components/shared/Donation.tsx
"use client";

import { useState } from "react";
import DonationModal from "./DonationModal";

export default function Donation() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Donation Button */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={openModal}
          className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          {/* Mobile & Tablet: Small icon-only button */}
          <div className="sm:hidden w-12 h-12 flex items-center justify-center">
            <span className="text-xl">⚡</span>
          </div>
          
          {/* Desktop: Full button with text */}
          <div className="hidden sm:flex items-center space-x-2 px-6 py-3">
            <span className="text-xl">⚡</span>
            <span className="font-semibold">Support Us</span>
            <span className="text-sm opacity-80 group-hover:opacity-100">Donate</span>
          </div>
        </button>
      </div>

      {/* Donation Modal */}
      <DonationModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
