'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/layouts/AdminLayout';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface PostForm {
  title: string;
  content: string;
  status: 'published' | 'draft' | 'scheduled';
  date: string;
  author: string;
  category: string;
  image: string;
}

const categories = [
  "Advertising Tips",
  "Product Updates",
  "Case Studies",
  "Design Tips",
  "Analytics",
  "Industry Insights"
];

export default function CreatePost() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [form, setForm] = useState<PostForm>({
    title: '',
    content: '',
    status: 'draft',
    date: new Date().toISOString().split('T')[0],
    author: '',
    category: categories[0],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically make an API call to save the post
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/admin/blog');
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AdminLayout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Post</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Share your knowledge with the community
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  {previewMode ? (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Mode
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Preview
                    </>
                  )}
                </button>
                <button
                  onClick={() => router.back()}
                  className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {previewMode ? (
              <div className="prose dark:prose-invert max-w-none">
                <h1>{form.title || 'Untitled Post'}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>{form.author || 'Anonymous'}</span>
                  <span>•</span>
                  <span>{form.date}</span>
                  <span>•</span>
                  <span>{form.category}</span>
                </div>
                {form.image && (
                  <div className="my-6 relative h-[400px] rounded-xl overflow-hidden">
                    <Image
                      src={form.image}
                      alt="Post cover"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="whitespace-pre-wrap">
                  {form.content || 'No content yet...'}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Enter a captivating title..."
                        className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                      />
                    </div>

                    <div>
                      <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Content
                      </label>
                      <textarea
                        id="content"
                        name="content"
                        required
                        rows={12}
                        value={form.content}
                        onChange={handleChange}
                        placeholder="Write your post content here..."
                        className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Author
                        </label>
                        <input
                          type="text"
                          id="author"
                          name="author"
                          required
                          value={form.author}
                          onChange={handleChange}
                          placeholder="Who's writing this post?"
                          className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        />
                      </div>

                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Category
                        </label>
                        <select
                          id="category"
                          name="category"
                          required
                          value={form.category}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        >
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Status
                        </label>
                        <select
                          id="status"
                          name="status"
                          required
                          value={form.status}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="scheduled">Scheduled</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Date
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          required
                          value={form.date}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Cover Image URL
                      </label>
                      <input
                        type="url"
                        id="image"
                        name="image"
                        required
                        value={form.image}
                        onChange={handleChange}
                        placeholder="Enter the URL of your cover image..."
                        className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                      />
                      {form.image && (
                        <div className="mt-4 relative h-[200px] rounded-xl overflow-hidden">
                          <Image
                            src={form.image}
                            alt="Post preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Creating...
                      </div>
                    ) : (
                      'Create Post'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
