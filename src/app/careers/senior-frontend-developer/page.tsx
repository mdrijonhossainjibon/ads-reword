'use client';

import { motion } from 'framer-motion';
import { IconBriefcase, IconGlobe, IconClock, IconStar } from '../../../components/icons';

const requirements = [
  'Minimum 5 years of experience in frontend development',
  'Strong proficiency in React.js, Next.js, and TypeScript',
  'Experience with modern frontend tools and practices (Webpack, ESLint, etc.)',
  'Experience with responsive design and cross-browser compatibility',
  'Knowledge of modern CSS practices including Tailwind CSS',
  'Understanding of web performance optimization techniques',
  'Experience with version control systems (Git)',
  'Strong problem-solving skills and attention to detail',
];

const responsibilities = [
  'Lead frontend development initiatives and mentor junior developers',
  'Architect and implement scalable frontend solutions',
  'Collaborate with designers to implement pixel-perfect UI',
  'Optimize application performance and user experience',
  'Write clean, maintainable, and well-documented code',
  'Participate in code reviews and technical discussions',
  'Stay up-to-date with emerging technologies and industry trends',
];

export default function SeniorFrontendDeveloper() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="relative isolate">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Senior Frontend Developer
            </h1>
            <div className="mt-4 flex flex-wrap gap-4">
              <span className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
                <IconBriefcase className="h-4 w-4 mr-1" />
                Engineering
              </span>
              <span className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
                <IconGlobe className="h-4 w-4 mr-1" />
                Remote
              </span>
              <span className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
                <IconClock className="h-4 w-4 mr-1" />
                Full-time
              </span>
            </div>
          </div>

          {/* Job Description */}
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We're looking for a Senior Frontend Developer to join our team and help build the next generation
              of our Telegram-based earning platform. You'll be working on challenging problems,
              mentoring other developers, and helping to shape our technical direction.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Requirements</h2>
            <ul className="space-y-2">
              {requirements.map((req, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <IconStar className="h-5 w-5 mr-2 text-primary-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-600 dark:text-gray-300">{req}</span>
                </motion.li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Responsibilities</h2>
            <ul className="space-y-2">
              {responsibilities.map((resp, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <IconStar className="h-5 w-5 mr-2 text-primary-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-600 dark:text-gray-300">{resp}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Application Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Apply Now</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Portfolio URL
                </label>
                <input
                  type="url"
                  id="portfolio"
                  name="portfolio"
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                />
              </div>
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Resume
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-300
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary-600 file:text-white
                    hover:file:bg-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Cover Letter
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
