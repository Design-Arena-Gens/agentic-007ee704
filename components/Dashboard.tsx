'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Gamepad2, Headphones, PenTool, MessageCircle, Video, Lock, Star, Trophy, Zap } from 'lucide-react';

interface DashboardProps {
  nativeLanguage: string;
  targetLanguage: string;
  isPremium: boolean;
  onUpgrade: () => void;
}

export default function Dashboard({ nativeLanguage, targetLanguage, isPremium, onUpgrade }: DashboardProps) {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [progress, setProgress] = useState({
    level: 1,
    xp: 450,
    nextLevelXp: 1000,
    streak: 7,
  });

  const activities = [
    {
      id: 'lessons',
      icon: BookOpen,
      title: 'Interactive Lessons',
      description: 'AI-powered lessons from basics to advanced',
      color: 'from-blue-500 to-cyan-500',
      isPremiumOnly: false,
    },
    {
      id: 'vocabulary',
      icon: PenTool,
      title: 'Vocabulary Builder',
      description: 'Learn new words with flashcards and quizzes',
      color: 'from-green-500 to-emerald-500',
      isPremiumOnly: false,
    },
    {
      id: 'listening',
      icon: Headphones,
      title: 'Listening Practice',
      description: 'Improve comprehension with audio exercises',
      color: 'from-purple-500 to-pink-500',
      isPremiumOnly: false,
    },
    {
      id: 'games',
      icon: Gamepad2,
      title: 'Language Games',
      description: 'Fun interactive games to practice',
      color: 'from-orange-500 to-red-500',
      isPremiumOnly: false,
    },
    {
      id: 'conversation',
      icon: MessageCircle,
      title: 'AI Conversation',
      description: 'Chat with AI tutor in your target language',
      color: 'from-indigo-500 to-purple-500',
      isPremiumOnly: true,
    },
    {
      id: 'video',
      icon: Video,
      title: 'Video Lessons',
      description: 'Professional video courses',
      color: 'from-pink-500 to-rose-500',
      isPremiumOnly: true,
    },
  ];

  const handleActivityClick = (activity: any) => {
    if (activity.isPremiumOnly && !isPremium) {
      onUpgrade();
    } else {
      setSelectedActivity(activity.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 mb-8 text-white"
      >
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star size={24} className="text-yellow-300" />
              <span className="text-sm opacity-90">Level</span>
            </div>
            <p className="text-4xl font-bold">{progress.level}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap size={24} className="text-yellow-300" />
              <span className="text-sm opacity-90">XP</span>
            </div>
            <p className="text-4xl font-bold">{progress.xp}</p>
            <div className="w-full bg-white/30 rounded-full h-2 mt-2">
              <div
                className="bg-yellow-300 h-2 rounded-full transition-all"
                style={{ width: `${(progress.xp / progress.nextLevelXp) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Trophy size={24} className="text-yellow-300" />
              <span className="text-sm opacity-90">Streak</span>
            </div>
            <p className="text-4xl font-bold">{progress.streak} days</p>
          </div>
          <div>
            <div className="text-sm opacity-90 mb-2">Learning</div>
            <p className="text-2xl font-bold">
              {targetLanguage === 'ar' && 'العربية'}
              {targetLanguage === 'en' && 'English'}
              {targetLanguage === 'es' && 'Español'}
              {targetLanguage === 'fr' && 'Français'}
              {targetLanguage === 'de' && 'Deutsch'}
              {!['ar', 'en', 'es', 'fr', 'de'].includes(targetLanguage) && targetLanguage.toUpperCase()}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Activities Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          const isLocked = activity.isPremiumOnly && !isPremium;

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleActivityClick(activity)}
              className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105 group"
            >
              {isLocked && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Lock size={12} />
                  PRO
                </div>
              )}

              <div className={`w-16 h-16 mb-4 bg-gradient-to-br ${activity.color} rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform`}>
                <Icon className="text-white" size={32} />
              </div>

              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                {activity.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {activity.description}
              </p>

              {isLocked && (
                <div className="mt-4 text-sm text-orange-500 font-semibold">
                  Upgrade to unlock →
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Activity Content */}
      {selectedActivity && (
        <ActivityContent
          activityId={selectedActivity}
          onClose={() => setSelectedActivity(null)}
          onComplete={(earnedXp: number) => {
            setProgress(prev => ({
              ...prev,
              xp: prev.xp + earnedXp,
            }));
            setSelectedActivity(null);
          }}
        />
      )}
    </div>
  );
}

function ActivityContent({ activityId, onClose, onComplete }: { activityId: string; onClose: () => void; onComplete: (xp: number) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question: 'What is "Hello" in your target language?',
      options: ['Hola', 'Bonjour', 'Hallo', 'Ciao'],
      correct: 0,
    },
    {
      question: 'What is "Goodbye" in your target language?',
      options: ['Adiós', 'Au revoir', 'Auf Wiedersehen', 'Arrivederci'],
      correct: 0,
    },
    {
      question: 'What is "Thank you" in your target language?',
      options: ['Gracias', 'Merci', 'Danke', 'Grazie'],
      correct: 0,
    },
  ];

  const handleAnswer = (selectedIndex: number) => {
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const earnedXp = score * 50;
      onComplete(earnedXp);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-2xl w-full"
      >
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              Question {currentQuestion + 1} / {questions.length}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
            {questions[currentQuestion].question}
          </h4>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full p-4 text-left rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all text-gray-800 dark:text-white"
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center text-gray-600 dark:text-gray-400">
          Score: {score} / {questions.length}
        </div>
      </motion.div>
    </motion.div>
  );
}
