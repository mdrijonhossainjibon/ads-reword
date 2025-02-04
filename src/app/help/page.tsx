'use client';

import { motion } from 'framer-motion';

export default function HelpCenter() {
  const sections = [
    {
      title: "Getting Started",
      content: `• Creating an Account: Learn how to create and set up your Telegram Ads Manager account
      • Campaign Setup: Step-by-step guide to creating your first advertising campaign
      • Payment Methods: Information about supported payment methods and billing
      • Account Verification: Understanding the verification process and requirements`
    },
    {
      title: "Campaign Management",
      content: `• Campaign Types: Overview of different campaign types and their uses
      • Targeting Options: Learn about audience targeting and optimization
      • Budget Settings: How to set and manage your campaign budget
      • Performance Metrics: Understanding campaign analytics and reporting
      • Ad Formats: Guide to available ad formats and best practices`
    },
    {
      title: "Billing & Payments",
      content: `• Payment Methods: Accepted payment methods and currencies
      • Billing Cycles: Understanding billing periods and payment processing
      • Invoice Access: How to access and download invoices
      • Payment Issues: Troubleshooting common payment problems
      • Refund Policy: Information about our refund process`
    },
    {
      title: "Account Security",
      content: `• Password Management: Tips for secure password creation and management
      • Two-Factor Authentication: Setting up and using 2FA
      • Account Recovery: Steps to recover your account
      • Security Best Practices: Recommendations for keeping your account secure`
    },
    {
      title: "Content Guidelines",
      content: `• Ad Requirements: Technical specifications and content guidelines
      • Prohibited Content: List of restricted and prohibited content
      • Review Process: Understanding the ad review process
      • Content Best Practices: Tips for creating effective ad content`
    },
    {
      title: "Technical Support",
      content: `• Common Issues: Solutions to frequently encountered problems
      • Platform Requirements: System and browser requirements
      • API Documentation: Links to API documentation and resources
      • Error Messages: Understanding and resolving common error messages`
    },
    {
      title: "Account Management",
      content: `• Account Settings: Managing your account preferences
      • User Roles: Understanding different user roles and permissions
      • Team Management: Adding and managing team members
      • Account Status: Information about account status and restrictions`
    },
    {
      title: "Contact Support",
      content: `Need additional help? Our support team is available:
      • Email Support: support@telegramads.com
      • Live Chat: Available 24/7 through your account dashboard
      • Support Ticket: Create a ticket for complex issues
      • Response Time: Usually within 24 hours`
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
            Help Center
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find answers to common questions and get support
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
              Welcome to the Telegram Ads Manager Help Center. Here you'll find comprehensive guides,
              tutorials, and answers to common questions about our platform.
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
            Can't find what you're looking for?{" "}
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
