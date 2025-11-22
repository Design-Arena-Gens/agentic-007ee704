'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface LanguageSelectorProps {
  nativeLanguage: string;
  targetLanguage: string;
  onNativeLanguageChange: (lang: string) => void;
  onTargetLanguageChange: (lang: string) => void;
  onStartLearning: () => void;
}

const languages = [
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
];

export default function LanguageSelector({
  nativeLanguage,
  targetLanguage,
  onNativeLanguageChange,
  onTargetLanguageChange,
  onStartLearning,
}: LanguageSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
    >
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12">
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Choose Your Languages
        </h3>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
              I speak:
            </label>
            <select
              value={nativeLanguage}
              onChange={(e) => onNativeLanguageChange(e.target.value)}
              className="w-full p-4 text-lg rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              <option value="">Select your native language</option>
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
              I want to learn:
            </label>
            <select
              value={targetLanguage}
              onChange={(e) => onTargetLanguageChange(e.target.value)}
              className="w-full p-4 text-lg rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
            >
              <option value="">Select target language</option>
              {languages
                .filter((lang) => lang.code !== nativeLanguage)
                .map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <button
          onClick={onStartLearning}
          disabled={!nativeLanguage || !targetLanguage}
          className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 flex items-center justify-center gap-2"
        >
          Start Learning
          <ArrowRight size={24} />
        </button>
      </div>
    </motion.div>
  );
}
