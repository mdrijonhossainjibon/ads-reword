'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Telegram Ads Manager?",
    answer: "Telegram Ads Manager is a powerful tool that helps you create, manage, and optimize your advertising campaigns on Telegram. It provides an intuitive interface to reach your target audience effectively through Telegram's advertising platform."
  },
  {
    question: "How do I get started with advertising?",
    answer: "Getting started is easy! First, create an account, then set up your advertising profile. You can create your first campaign by selecting your target audience, setting your budget, and designing your ad creative. Our platform will guide you through each step."
  },
  {
    question: "What targeting options are available?",
    answer: "We offer various targeting options including demographics, interests, behaviors, and custom audiences. You can target users based on their location, language, interests, and engagement with Telegram channels."
  },
  {
    question: "What are the payment methods?",
    answer: "We accept multiple payment methods including credit/debit cards, PayPal, and cryptocurrency. All payments are processed securely through our trusted payment partners."
  },
  {
    question: "How can I track my ad performance?",
    answer: "Our platform provides comprehensive analytics and reporting tools. You can track key metrics like impressions, clicks, engagement rates, and ROI in real-time through your dashboard."
  },
  {
    question: "What type of ads can I create?",
    answer: "You can create various types of ads including text posts, image ads, video ads, and carousel ads. Each format has its own specifications and best practices which we outline in our documentation."
  }
];

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find answers to common questions about our Telegram Ads Manager
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  {expandedIndex === index ? (
                    <FiMinus className="h-6 w-6 text-blue-500" />
                  ) : (
                    <FiPlus className="h-6 w-6 text-blue-500" />
                  )}
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-gray-300">
            Still have questions?{" "}
            <a
              href="/contact"
              className="text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Contact our support team
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
