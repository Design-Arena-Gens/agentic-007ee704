'use client';

import { motion } from 'framer-motion';
import { Check, Crown, X } from 'lucide-react';

interface PricingModalProps {
  onClose: () => void;
  onSubscribe: () => void;
}

export default function PricingModal({ onClose, onSubscribe }: PricingModalProps) {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        'Basic lessons',
        'Vocabulary builder',
        'Listening practice',
        'Language games',
        'Limited AI hints',
      ],
      notIncluded: [
        'AI conversation tutor',
        'Video lessons',
        'Offline mode',
        'Priority support',
      ],
      buttonText: 'Current Plan',
      isPopular: false,
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      features: [
        'Everything in Free',
        'AI conversation tutor',
        'Professional video lessons',
        'Offline mode',
        'Unlimited AI hints',
        'Priority support',
        'Advanced exercises',
        'Certificate of completion',
        'Ad-free experience',
      ],
      notIncluded: [],
      buttonText: 'Upgrade Now',
      isPopular: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Choose Your Plan
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                plan.isPopular
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-orange-400'
                  : 'bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Crown size={16} />
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold text-gray-800 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      size={20}
                      className="text-green-500 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
                {plan.notIncluded.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 opacity-50">
                    <X
                      size={20}
                      className="text-gray-400 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-gray-500 dark:text-gray-400 line-through">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={plan.isPopular ? onSubscribe : undefined}
                disabled={!plan.isPopular}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all ${
                  plan.isPopular
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>All prices in USD. Cancel anytime. 30-day money-back guarantee.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
