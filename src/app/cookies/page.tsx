'use client';

import { motion } from 'framer-motion';

export default function Cookies() {
  const sections = [
    {
      title: "1. What Are Cookies",
      content: `Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our platform.`
    },
    {
      title: "2. Types of Cookies We Use",
      content: `We use the following types of cookies:
      • Essential Cookies: Required for the platform to function properly
      • Analytical Cookies: Help us understand how visitors interact with our platform
      • Functional Cookies: Remember your preferences and settings
      • Advertising Cookies: Used to deliver relevant advertisements and track campaign performance`
    },
    {
      title: "3. How We Use Cookies",
      content: `We use cookies to:
      • Keep you signed in to your account
      • Remember your advertising preferences
      • Analyze how our platform is used
      • Improve our services and user experience
      • Provide relevant advertising content`
    },
    {
      title: "4. Third-Party Cookies",
      content: `Some cookies are placed by third-party services that appear on our pages. These third-party cookies may track your use of our platform and other websites. We do not control these third-party cookies and recommend reviewing the privacy policies of these third parties.`
    },
    {
      title: "5. Managing Cookies",
      content: `You can control and manage cookies in your browser settings. You can:
      • Delete all cookies from your browser
      • Block all cookies from being set
      • Allow only certain cookies to be set
      • Block third-party cookies
      Please note that blocking some types of cookies may impact your experience on our platform.`
    },
    {
      title: "6. Cookie Duration",
      content: `The cookies we use have different durations:
      • Session Cookies: These are temporary and are deleted when you close your browser
      • Persistent Cookies: These remain on your device until they expire or you delete them`
    },
    {
      title: "7. Updates to Cookie Policy",
      content: `We may update our Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date. Your continued use of our platform after such changes constitutes acceptance of the new policy.`
    },
    {
      title: "8. Contact Us",
      content: `If you have any questions about our use of cookies, please contact our support team.`
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
            Cookie Policy
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
              This Cookie Policy explains how Telegram Ads Manager uses cookies and similar technologies
              to recognize and track your usage of our platform.
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
            Have questions about our cookies?{" "}
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
