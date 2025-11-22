'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LanguageSelector from '@/components/LanguageSelector';
import Dashboard from '@/components/Dashboard';
import PricingModal from '@/components/PricingModal';

export default function Home() {
  const [nativeLanguage, setNativeLanguage] = useState<string>('');
  const [targetLanguage, setTargetLanguage] = useState<string>('');
  const [showDashboard, setShowDashboard] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  const handleStartLearning = () => {
    if (nativeLanguage && targetLanguage) {
      setShowDashboard(true);
    }
  };

  const handleUpgrade = () => {
    setShowPricing(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header onUpgrade={handleUpgrade} isPremium={isPremium} />

      {!showDashboard ? (
        <>
          <Hero />
          <LanguageSelector
            nativeLanguage={nativeLanguage}
            targetLanguage={targetLanguage}
            onNativeLanguageChange={setNativeLanguage}
            onTargetLanguageChange={setTargetLanguage}
            onStartLearning={handleStartLearning}
          />
        </>
      ) : (
        <Dashboard
          nativeLanguage={nativeLanguage}
          targetLanguage={targetLanguage}
          isPremium={isPremium}
          onUpgrade={handleUpgrade}
        />
      )}

      {showPricing && (
        <PricingModal
          onClose={() => setShowPricing(false)}
          onSubscribe={() => {
            setIsPremium(true);
            setShowPricing(false);
          }}
        />
      )}
    </div>
  );
}
