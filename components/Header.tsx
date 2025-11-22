'use client';

import { Moon, Sun, Crown } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useState, useEffect } from 'react';

interface HeaderProps {
  onUpgrade: () => void;
  isPremium: boolean;
}

export default function Header({ onUpgrade, isPremium }: HeaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeContext = mounted ? useTheme() : { theme: 'light', toggleTheme: () => {} };
  const { theme, toggleTheme } = themeContext;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">L</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Lingo Master
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {!isPremium && (
              <button
                onClick={onUpgrade}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-105"
              >
                <Crown size={18} />
                <span className="font-semibold">Upgrade to Pro</span>
              </button>
            )}

            {isPremium && (
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg">
                <Crown size={18} />
                <span className="font-semibold">Pro Member</span>
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
