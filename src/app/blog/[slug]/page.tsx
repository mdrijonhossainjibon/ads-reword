'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(100005);
  const [hasEarned, setHasEarned] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Format time function
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isReading && !isPaused && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !hasEarned) {
      setHasEarned(true);
      // Show toast notification with confetti effect
      toast.success(
        (t) => (
          <div className="flex flex-col items-center space-y-2">
            <span className="text-lg font-bold">🎉 Congratulations!</span>
            <span>You've earned points for reading this article!</span>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-yellow-400">+100</span>
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM10 2a6 6 0 100 12 6 6 0 000-12z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        ),
        {
          duration: 4000,
          position: 'bottom-center',
          style: {
            background: '#10B981',
            color: '#fff',
            fontSize: '16px',
            borderRadius: '10px',
            padding: '16px 24px',
          },
        }
      );
      
      // Store the earned status in localStorage
      const slug = params.slug as string;
      localStorage.setItem(`article-${slug}-earned`, 'true');
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLeft, isReading, hasEarned, params.slug, isPaused]);

  useEffect(() => {
    // Check if already earned
    const slug = params.slug as string;
    const earned = localStorage.getItem(`article-${slug}-earned`);
    if (earned) {
      setHasEarned(true);
    }
    
    // Start reading timer when user scrolls
    const handleScroll = () => {
      if (!isReading && !hasEarned) {
        setIsReading(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [params.slug, isReading, hasEarned]);

  // This would typically come from an API or database
  const post : any = {
    title: "Maximizing ROI with Telegram Ads: A Complete Guide",
    date: "February 4, 2025",
    author: "Marketing Team",
    authorImage: "https://ui-avatars.com/api/?name=Marketing+Team&background=0D8ABC&color=fff",
    category: "Advertising Tips",
    readTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tags: ["ROI", "Optimization", "Strategy"],
    content: [
      {
        type: 'paragraph',
        content: 'In the ever-evolving landscape of digital advertising, maximizing Return on Investment (ROI) has become more crucial than ever. This comprehensive guide will walk you through proven strategies to optimize your Telegram advertising campaigns for better returns.'
      },
      {
        type: 'heading',
        content: 'Understanding Telegram Ad Metrics'
      },
      {
        type: 'paragraph',
        content: `'Before diving into optimization strategies, it's essential to understand the key metrics that determine your campaign's success. Telegram Ads provides several important metrics:'`
      },
      {
        type: 'list',
        items: [
          'Click-Through Rate (CTR)',
          'Conversion Rate',
          'Cost Per Click (CPC)',
          'Return on Ad Spend (ROAS)',
          'Engagement Rate'
        ]
      },
      {
        type: 'heading',
        content: 'Targeting Strategies'
      },
      {
        type: 'paragraph',
        content: 'Effective targeting is the foundation of any successful advertising campaign. Telegram offers various targeting options that can help you reach your ideal audience:'
      },
      {
        type: 'list',
        items: [
          'Geographic targeting',
          'Interest-based targeting',
          'Behavioral targeting',
          'Custom audience creation',
          'Lookalike audiences'
        ]
      },
      {
        type: 'quote',
        content: 'The key to advertising success is reaching the right person with the right message at the right time.'
      },
      {
        type: 'heading',
        content: 'Budget Optimization'
      },
      {
        type: 'paragraph',
        content: 'Managing your advertising budget effectively is crucial for maximizing ROI. Here are some proven strategies for budget optimization:'
      },
      {
        type: 'list',
        items: [
          'Start with small test budgets',
          'Scale successful campaigns gradually',
          'Monitor and adjust bids regularly',
          'Use automated bidding strategies',
          'Implement dayparting for optimal timing'
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Timer display */}
        {isReading && !hasEarned && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-20 right-4 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-gray-800 dark:to-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 border border-blue-400/30 dark:border-gray-700/30 backdrop-blur-sm"
          >
            <div className="flex items-center space-x-3">
               
              <div className="flex items-center space-x-2">
                <svg className={`w-5 h-5 ${!isPaused ? 'animate-spin' : ''} text-blue-200 dark:text-gray-400`} viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-sm text-blue-200 dark:text-gray-400">Reading time</span>
                  <span className="font-medium text-lg">{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Toast Container */}
        <Toaster />
        
        {/* Back to Blog Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link 
            href="/blog"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="relative h-96">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                  {post.category}
                </span>
                {post.tags.map((tag : string, index : number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/20 text-white text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                {post.title}
              </h1>
              <div className="flex items-center space-x-4">
                <Image
                  src={post.authorImage}
                  alt={post.author}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="text-white font-medium">{post.author}</p>
                  <div className="flex items-center space-x-2 text-white/80">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {post.content.map((section : any, index : number) => {
                switch (section.type) {
                  case 'paragraph':
                    return (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-gray-600 dark:text-gray-300 mb-6"
                      >
                        {section.content}
                      </motion.p>
                    );
                  case 'heading':
                    return (
                      <motion.h2
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4"
                      >
                        {section.content}
                      </motion.h2>
                    );
                  case 'list':
                    return (
                      <motion.ul
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6"
                      >
                        {section?.items.map((item : string, itemIndex : number) => (
                          <li key={itemIndex} className="mb-2">{item}</li>
                        ))}
                      </motion.ul>
                    );
                  case 'quote':
                    return (
                      <motion.blockquote
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-l-4 border-blue-500 pl-4 italic text-gray-700 dark:text-gray-300 my-6"
                      >
                        {section.content}
                      </motion.blockquote>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        </motion.article>

        {/* Share and Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 flex justify-between items-center"
        >
          <div className="flex space-x-4">
            <button className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
              </svg>
              Share on Facebook
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-[#1DA1F2] hover:bg-[#1a91da] text-white rounded-lg transition-colors duration-200">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
              </svg>
              Share on Twitter
            </button>
          </div>
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <button className="hover:text-blue-500 transition-colors duration-200">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
