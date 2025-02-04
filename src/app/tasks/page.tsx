'use client';

export default function Tasks() {
  const tasks = [
    {
      id: 1,
      title: 'Join Telegram Channel',
      description: 'Join our Telegram channel and stay active for 24 hours to earn rewards.',
      reward: '$0.5',
      time: '24h',
      status: 'available',
    },
    {
      id: 2,
      title: 'Share Content',
      description: 'Share our promotional content with your Telegram contacts.',
      reward: '$1.0',
      time: '1h',
      status: 'available',
    },
    {
      id: 3,
      title: 'Create Post',
      description: 'Create and post content about our service in your Telegram channel.',
      reward: '$2.0',
      time: '2h',
      status: 'available',
    },
    {
      id: 4,
      title: 'Watch and Like Video',
      description: 'Watch our promotional video and like it on YouTube to earn quick rewards.',
      reward: '$0.3',
      time: '10m',
      status: 'available',
    },
    {
      id: 5,
      title: 'Complete Survey',
      description: 'Fill out a short survey about your experience with crypto and earn rewards.',
      reward: '$0.8',
      time: '15m',
      status: 'available',
    },
    {
      id: 6,
      title: 'Invite Friends',
      description: 'Invite 3 friends to join our platform and earn rewards for each successful referral.',
      reward: '$3.0',
      time: '48h',
      status: 'available',
    },
    {
      id: 7,
      title: 'Follow Twitter',
      description: 'Follow our Twitter account and retweet our pinned post.',
      reward: '$0.7',
      time: '30m',
      status: 'available',
    },
    {
      id: 8,
      title: 'Create YouTube Review',
      description: 'Create and post a video review about our platform on YouTube.',
      reward: '$5.0',
      time: '24h',
      status: 'available',
    },
    {
      id: 9,
      title: 'Join Discord Community',
      description: 'Join our Discord server and participate in discussions.',
      reward: '$0.6',
      time: '12h',
      status: 'available',
    }
  ];

  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Available Tasks
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Complete tasks to earn rewards. The more tasks you complete, the more you earn!
          </p>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            {tasks.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {task.title}
                        </h3>
                        <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-100">
                          {task.reward}
                        </span>
                      </div>
                      <p className="mt-3 text-base text-gray-500 dark:text-gray-300">
                        {task.description}
                      </p>
                      <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <svg
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Time required: {task.time}
                      </div>
                    </div>
                    <div className="mt-6">
                      <button
                        type="button"
                        className="w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                      >
                        Start Task
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                  Coming Soon
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  New tasks are being prepared. Check back soon for more earning opportunities!
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                    onClick={() => window.location.reload()}
                  >
                    Refresh Page
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
