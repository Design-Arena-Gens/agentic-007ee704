'use client';

import { motion } from 'framer-motion';
import { Brain, Gamepad2, BookOpen, Trophy, Sparkles, Globe } from 'lucide-react';

export default function Hero() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Master Any Language with AI
        </h2>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
          Learn languages through interactive games, AI-powered lessons, and fun exercises. From beginner to advanced!
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
          {[
            { icon: Brain, label: 'AI-Powered', color: 'from-blue-500 to-cyan-500' },
            { icon: Gamepad2, label: 'Interactive Games', color: 'from-purple-500 to-pink-500' },
            { icon: BookOpen, label: 'Rich Lessons', color: 'from-green-500 to-emerald-500' },
            { icon: Trophy, label: 'Achievements', color: 'from-yellow-500 to-orange-500' },
            { icon: Sparkles, label: 'Fun Learning', color: 'from-red-500 to-rose-500' },
            { icon: Globe, label: '100+ Languages', color: 'from-indigo-500 to-purple-500' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center`}>
                <item.icon className="text-white" size={24} />
              </div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
