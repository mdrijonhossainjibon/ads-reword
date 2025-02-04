'use client';

import { motion } from 'framer-motion';
import { IconShield, IconLock, IconEye, IconRefresh, IconTrash } from '../../components/icons';

const sections = [
  {
    title: 'Information We Collect',
    icon: IconEye,
    content: [
      'Personal Information: Name, email address, and Telegram username when you register.',
      'Task Information: Data about tasks you complete and your interaction with our platform.',
      'Payment Information: Transaction history and payment details (we do not store complete payment information).',
      'Usage Data: How you interact with our platform, including IP address and device information.',
    ],
  },
  {
    title: 'How We Use Your Information',
    icon: IconShield,
    content: [
      'To provide and maintain our services',
      'To process your payments and prevent fraud',
      'To communicate with you about tasks, updates, and support',
      'To improve our platform and user experience',
      'To comply with legal obligations',
    ],
  },
  {
    title: 'Data Security',
    icon: IconLock,
    content: [
      'We implement industry-standard security measures to protect your data',
      'All data transmissions are encrypted using SSL/TLS protocols',
      'Regular security audits and updates are performed',
      'Access to personal data is strictly controlled and monitored',
    ],
  },
  {
    title: 'Your Rights',
    icon: IconRefresh,
    content: [
      'Access your personal data',
      'Request corrections to your data',
      'Delete your account and associated data',
      'Export your data in a portable format',
      'Opt-out of marketing communications',
    ],
  },
  {
    title: 'Data Retention',
    icon: IconTrash,
    content: [
      'We retain your data only as long as necessary to provide our services',
      'Account data is kept until you request deletion',
      'Transaction records are kept as required by law',
      'You can request data deletion at any time',
    ],
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header section */}
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl lg:mx-0 lg:flex-auto"
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              At Telegram Tasks, we take your privacy seriously. This policy outlines how we collect,
              use, and protect your personal information.
            </p>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Last updated: February 2025
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content sections */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-4xl divide-y divide-gray-200 dark:divide-gray-700">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="py-12"
            >
              <div className="flex items-center gap-x-3">
                <section.icon className="h-6 w-6 text-primary-600" />
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {section.title}
                </h2>
              </div>
              <ul className="mt-6 space-y-3 text-gray-600 dark:text-gray-300">
                {section.content.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + itemIndex * 0.05 }}
                    className="flex gap-x-3"
                  >
                    <span className="text-primary-600">•</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mx-auto max-w-4xl mt-16 rounded-2xl bg-primary-50 dark:bg-primary-900/10 p-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Questions about our Privacy Policy?
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            If you have any questions about our privacy policy or how we handle your data, please
            don't hesitate to contact our privacy team.
          </p>
          <div className="mt-6">
            <a
              href="/contact"
              className="text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-500"
            >
              Contact Privacy Team →
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
