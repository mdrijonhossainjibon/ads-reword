'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

export default function Blog() {
  const categories = [
    "All",
    "Advertising Tips",
    "Product Updates",
    "Case Studies",
    "Design Tips",
    "Analytics",
    "Industry Insights"
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [userPoints, setUserPoints] = useState(0);
  const [readArticles, setReadArticles] = useState<string[]>([]);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);
  const [animatingPoints, setAnimatingPoints] = useState(0);

  const blogPosts = [
    {
      title: "Maximizing ROI with Telegram Ads: A Complete Guide",
      date: "February 4, 2025",
      author: "Marketing Team",
      authorImage: "https://ui-avatars.com/api/?name=Marketing+Team&background=0D8ABC&color=fff",
      category: "Advertising Tips",
      readTime: "8 min read",
      points: 80,
      excerpt: "Learn how to optimize your Telegram ad campaigns for better return on investment. We'll cover targeting strategies, budget optimization, and performance tracking.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      tags: ["ROI", "Optimization", "Strategy"]
    },
    {
      title: "New Features: Enhanced Targeting Options",
      date: "February 1, 2025",
      author: "Product Team",
      authorImage: "https://ui-avatars.com/api/?name=Product+Team&background=2563EB&color=fff",
      category: "Product Updates",
      readTime: "5 min read",
      points: 50,
      excerpt: "We're excited to announce new targeting capabilities that help you reach your ideal audience with greater precision. Discover how to use these new features.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      tags: ["Features", "Updates", "Targeting"]
    },
    {
      title: "Case Study: How Brand X Achieved 300% Growth",
      date: "January 28, 2025",
      author: "Success Team",
      authorImage: "https://ui-avatars.com/api/?name=Success+Team&background=059669&color=fff",
      category: "Case Studies",
      readTime: "10 min read",
      points: 100,
      excerpt: "Discover how Brand X leveraged Telegram Ads to triple their customer base in just three months. A detailed analysis of their strategy and implementation.",
      imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
      tags: ["Success Story", "Growth", "Strategy"]
    },
    {
      title: "Best Practices for Creative Ad Design",
      date: "January 25, 2025",
      author: "Design Team",
      authorImage: "https://ui-avatars.com/api/?name=Design+Team&background=DC2626&color=fff",
      category: "Design Tips",
      readTime: "6 min read",
      points: 60,
      excerpt: "Create eye-catching ads that convert. Learn about effective design principles, image selection, and copywriting techniques for Telegram ads.",
      imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
      tags: ["Design", "Creative", "Best Practices"]
    },
    {
      title: "Understanding Telegram Ads Analytics",
      date: "January 22, 2025",
      author: "Analytics Team",
      authorImage: "https://ui-avatars.com/api/?name=Analytics+Team&background=7C3AED&color=fff",
      category: "Analytics",
      readTime: "7 min read",
      points: 70,
      excerpt: "A comprehensive guide to understanding and utilizing your campaign analytics. Learn how to make data-driven decisions for better results.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      tags: ["Analytics", "Data", "Insights"]
    },
    {
      title: "2025 Digital Advertising Trends",
      date: "January 18, 2025",
      author: "Research Team",
      authorImage: "https://ui-avatars.com/api/?name=Research+Team&background=9333EA&color=fff",
      category: "Industry Insights",
      readTime: "9 min read",
      points: 90,
      excerpt: "Stay ahead of the curve with our analysis of emerging digital advertising trends and how they'll impact your Telegram advertising strategy.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      tags: ["Trends", "Future", "Strategy"]
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const handleReadArticle = (title: string, points: number) => {
    if (!readArticles.includes(title)) {
      setReadArticles([...readArticles, title]);
      setUserPoints(prev => prev + points);
      setAnimatingPoints(points);
      setShowPointsAnimation(true);
      setTimeout(() => setShowPointsAnimation(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Blog & Resources
            </h1>
            <div className="flex items-center bg-yellow-100 dark:bg-yellow-900 px-4 py-2 rounded-full">
              <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM10 2a6 6 0 100 12 6 6 0 000-12z" clipRule="evenodd"/>
              </svg>
              <span className="font-semibold text-yellow-600 dark:text-yellow-400">{userPoints} Points</span>
            </div>
          </div>
          
          {showPointsAnimation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: -20 }}
              exit={{ opacity: 0 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
            >
              <div className="bg-yellow-400 text-white px-4 py-2 rounded-lg font-bold text-xl">
                +{animatingPoints} Points!
              </div>
            </motion.div>
          )}
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Insights, updates, and guides to help you succeed with Telegram Ads
          </p>

          {/* Search and Filter Section */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6">
              <div className="relative w-full sm:w-96">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPosts.map((post, index) => (
            <motion.article
              key={index}
              variants={cardVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm rounded-full">
                    {post.category}
                  </span>
                  <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 text-sm rounded-full flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM10 2a6 6 0 100 12 6 6 0 000-12z" clipRule="evenodd"/>
                    </svg>
                    {post.points} Points
                  </span>
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={post.authorImage}
                      alt={post.author}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {post.author}
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleReadArticle(post.title, post.points)}
                    className={`text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center space-x-1 ${
                      readArticles.includes(post.title) ? 'text-green-500 hover:text-green-600' : ''
                    }`}
                  >
                    <span>{readArticles.includes(post.title) ? 'Read ✓' : 'Read'}</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No articles found matching your criteria.
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Want to contribute?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Share your expertise with our community. We're always looking for insightful articles about Telegram advertising.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Submit an Article
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
