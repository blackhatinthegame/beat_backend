"use client";

import { useState } from 'react';
import TermsModal from './TermsModal';

export default function Footer() {
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  return (
    <>
      <footer className="border-t border-neutral-800/50 bg-background/50 backdrop-blur-sm py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()} BeatMarket. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setTermsModalOpen(true)}
              className="text-sm text-neutral-400 hover:text-neutral-300 transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => setPrivacyModalOpen(true)}
              className="text-sm text-neutral-400 hover:text-neutral-300 transition-colors"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </footer>

      <TermsModal isOpen={termsModalOpen} onClose={() => setTermsModalOpen(false)} type="terms" />
      <TermsModal isOpen={privacyModalOpen} onClose={() => setPrivacyModalOpen(false)} type="privacy" />
    </>
  );
}


