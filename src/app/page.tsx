'use client';

import { features } from '../data/features';
import { motion } from 'framer-motion';
import { 
  IconCheck, 
  IconUsers, 
  IconMoneybag, 
  IconStar,
  IconBuilding,
  IconHelp,
  IconBook,
  IconBriefcase,
  IconPhone,
  IconQuestionMark,
  IconShield,
  IconDocument,
  IconCookie,
  IconBrandTelegram,
  IconBrandTwitter,
  IconBrandDiscord
} from '../components/icons';
import { signOut } from 'next-auth/react';

const stats = [
  { name: 'Active Users', value: '10,000+', icon: IconUsers },
  { name: 'Tasks Completed', value: '50,000+', icon: IconCheck },
  { name: 'Money Earned', value: '$100,000+', icon: IconMoneybag },
];

const testimonials = [
  {
    content: "This platform has completely changed how I earn online. The tasks are straightforward and the payments are always on time.",
    author: "Alex Johnson",
    role: "Freelancer"
  },
  {
    content: "I've been using this platform for 3 months and already earned more than I expected. Highly recommended!",
    author: "Sarah Williams",
    role: "Content Creator"
  },
];

export default function Home() {

  
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
                Earn Money with{' '}
                <span className="text-primary-600 dark:text-primary-400">
                  Telegram Tasks
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Join our platform and start earning money by completing simple Telegram-related tasks.
                We offer various opportunities including channel promotion, content creation,
                and community engagement.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/tasks"
                  className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Get started
                </motion.a>
                <a href="#features" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className="text-base leading-7 text-gray-600 dark:text-gray-300">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {stat.value}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>

      {/* Features section */}
      <div id="features" className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything you need to earn with Telegram
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Our platform provides all the tools and features you need to start earning through Telegram tasks.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <IconStar className="h-5 w-5 text-primary-600" />
                  {feature.title}
                </dt>
                <dd className="mt-2 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">{feature.text}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>

      {/* Testimonials section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            What our users say
          </h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white dark:bg-gray-700 p-6 shadow-lg"
              >
                <p className="text-lg text-gray-600 dark:text-gray-300">{testimonial.content}</p>
                <div className="mt-6">
                  <p className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
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
            Ready to start earning?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-primary-100">
            Join thousands of users who are already earning through our platform.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/register"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50"
            >
              Sign up now
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Footer section */}
      <footer className="bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <IconBuilding className="h-5 w-5 text-primary-600" />
                Company
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="/about" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2">
                    <IconBook className="h-4 w-4" />
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/careers" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2">
                    <IconBriefcase className="h-4 w-4" />
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2">
                    <IconDocument className="h-4 w-4" />
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <IconHelp className="h-5 w-5 text-primary-600" />
                Support
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="/help" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2">
                    <IconHelp className="h-4 w-4" />
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2">
                    <IconPhone className="h-4 w-4" />
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/faq" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2">
                    <IconQuestionMark className="h-4 w-4" />
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <IconShield className="h-5 w-5 text-primary-600" />
                Legal
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="/privacy" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2">
                    <IconShield className="h-4 w-4" />
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2">
                    <IconDocument className="h-4 w-4" />
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/cookies" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2">
                    <IconCookie className="h-4 w-4" />
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <IconUsers className="h-5 w-5 text-primary-600" />
                Connect
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="https://t.me/your_channel" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2">
                    <IconBrandTelegram className="h-4 w-4" />
                    Telegram Channel
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/your_handle" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2">
                    <IconBrandTwitter className="h-4 w-4" />
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="https://discord.gg/your_server" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2">
                    <IconBrandDiscord className="h-4 w-4" />
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              {new Date().getFullYear()} Telegram Tasks. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
