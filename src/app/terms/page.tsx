'use client';

import { motion } from 'framer-motion';

export default function Terms() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing and using the Telegram Ads Manager platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.`
    },
    {
      title: "2. Use License",
      content: `Permission is granted to temporarily access the Telegram Ads Manager platform for personal or business advertising purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
      • Modify or copy the materials
      • Use the materials for any commercial purpose other than advertising on Telegram
      • Attempt to decompile or reverse engineer any software contained on the platform
      • Remove any copyright or other proprietary notations from the materials
      This license shall automatically terminate if you violate any of these restrictions.`
    },
    {
      title: "3. Account Responsibilities",
      content: `You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account or any other security breach.`
    },
    {
      title: "4. Payment Terms",
      content: `All payments for advertising services must be made in advance. We accept various payment methods including credit cards, PayPal, and cryptocurrency. Refunds may be issued at our discretion and will be processed using the original payment method.`
    },
    {
      title: "5. Content Guidelines",
      content: `All advertising content must comply with Telegram's advertising policies and our content guidelines. We reserve the right to reject or remove any advertisement that violates these guidelines. Prohibited content includes but is not limited to:
      • Illegal products or services
      • Misleading or fraudulent content
      • Adult or explicit material
      • Hate speech or discriminatory content`
    },
    {
      title: "6. Service Modifications",
      content: `We reserve the right to modify or discontinue the service at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.`
    },
    {
      title: "7. Privacy Policy",
      content: `Your use of the Telegram Ads Manager platform is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices regarding data collection and usage.`
    },
    {
      title: "8. Limitation of Liability",
      content: `The platform is provided "as is" without warranties of any kind. In no event shall we be liable for any damages arising out of the use or inability to use the platform.`
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Last updated: February 4, 2025
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
        >
          <div className="prose prose-blue dark:prose-invert max-w-none">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 dark:text-gray-300 mb-8"
            >
              Welcome to Telegram Ads Manager. These terms and conditions outline the rules and regulations
              for the use of our platform.
            </motion.p>

            {sections.map((section, index) => (
              <motion.section
                key={index}
                variants={sectionVariants}
                className="mb-8 last:mb-0"
              >
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {section.title}
                </h2>
                <div className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                  {section.content}
                </div>
              </motion.section>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 dark:text-gray-300">
            Have questions about our terms?{" "}
            <a
              href="/contact"
              className="text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Contact our legal team
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
