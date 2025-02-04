'use client';

import { motion } from 'framer-motion';
import {
  IconBriefcase,
  IconUsers,
  IconStar,
  IconMoneybag,
  IconGlobe,
  IconClock,
  IconRocket,
  IconHeart
} from '../../components/icons';

const benefits = [
  {
    title: 'Flexible Hours',
    description: 'Work when it suits you best. We believe in work-life balance.',
    icon: IconClock
  },
  {
    title: 'Remote Work',
    description: 'Work from anywhere in the world. Our team is fully distributed.',
    icon: IconGlobe
  },
  {
    title: 'Competitive Pay',
    description: 'We offer industry-competitive salaries and performance bonuses.',
    icon: IconMoneybag
  },
  {
    title: 'Growth Opportunities',
    description: 'Regular training and clear career progression paths.',
    icon: IconRocket
  },
  {
    title: 'Great Team',
    description: 'Join a diverse, passionate team of industry experts.',
    icon: IconUsers
  },
  {
    title: 'Health Benefits',
    description: 'Comprehensive health insurance for you and your family.',
    icon: IconHeart
  }
];

const openPositions = [
  {
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time'
  },
  {
    title: 'Community Manager',
    department: 'Operations',
    location: 'Remote',
    type: 'Full-time'
  },
  {
    title: 'Content Writer',
    department: 'Marketing',
    location: 'Remote',
    type: 'Part-time'
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time'
  }
];

export default function Careers() {
  return (
    <div className="relative isolate">
      {/* Hero section */}
      <div className="relative pt-14">
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-2xl text-center"
            >
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                Join Our Growing Team
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Help us revolutionize how people earn through Telegram. We're looking for passionate
                individuals who want to make a difference.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Benefits section */}
      <div className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Why Work With Us
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              We offer more than just a job - we offer a career with growth opportunities and great benefits.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex flex-col"
                >
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <benefit.icon className="h-5 w-5 text-primary-600" />
                    {benefit.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">{benefit.description}</p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Open positions section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Open Positions
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Find your next role and join us in our mission.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:mt-20">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {position.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-4">
                    <span className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <IconBriefcase className="h-4 w-4 mr-1" />
                      {position.department}
                    </span>
                    <span className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <IconGlobe className="h-4 w-4 mr-1" />
                      {position.location}
                    </span>
                    <span className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <IconClock className="h-4 w-4 mr-1" />
                      {position.type}
                    </span>
                  </div>
                </div>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`/careers/${position.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="mt-4 sm:mt-0 rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Apply Now
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-primary-600 py-16 px-6 sm:py-24 sm:px-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Don't see the right position?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-primary-100">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:careers@telegramtasks.com"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50"
            >
              Send your resume
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
