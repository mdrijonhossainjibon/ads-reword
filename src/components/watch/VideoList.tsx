import { RootState } from '@/modules/app';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

interface RelatedVideo {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  channelAvatar: string;
  views: string;
  uploadDate: string;
  duration: string;
  subscribers: string;
  likes: number;
  description?: string; 
  isNew?: boolean;
  isUpdated?: boolean;
}

const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`;
  return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
};

const formatPoints = (points: number): string => {
  if (points >= 1000000) {
    return `${(points / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (points >= 1000) {
    return `${(points / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return points.toString();
};

interface VideoListProps {
  videos: RelatedVideo[];
  onLoadMore: () => void;
}

const VideoList: FC<VideoListProps> = ({ onLoadMore }) => {
  const videos : any[] = useSelector((state: RootState) => state.private.watch.relatedVideos);
  const router = useRouter();

  const handleVideoClick = (videoId: string) => {
    router.push(`/mobile/watch/${videoId}`);
  };

  return (
    <div className="border-t border-gray-800 mt-4">
      {/* Video List */}
      <div className="space-y-3 px-4 pb-4">
        {videos.map((video) => (
          <div 
            key={video.id} 
            className="flex gap-3 cursor-pointer active:opacity-80"
            onClick={() => handleVideoClick(video.id)}
          >
            {/* Thumbnail */}
            <div className="relative flex-shrink-0">
              <img
                src={video?.thumbnail}
                alt={video.title}
                className="w-40 h-24 object-cover rounded-xl"
              />
              <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                {video.duration}
              </span>
              {video.isNew && (
                <span className="absolute top-1 left-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  NEW
                </span>
              )}
              {video.isUpdated && !video.isNew && (
                <span className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  UPDATED
                </span>
              )}
            </div>

            {/* Video Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-[15px] font-medium line-clamp-2 leading-tight text-white">
                {video.title}
              </h3>
              
              {/* Channel Info */}
              <div className="flex items-center gap-2 mt-1">
                <img 
                  src={video.channelAvatar} 
                  alt={video.channelName}
                  className="w-4 h-4 rounded-full"
                />
                <span className="text-[13px] text-gray-400">{video.channelName}</span>
              </div>

              <div className="flex items-center text-[13px] text-gray-400 mt-1 whitespace-nowrap">
                <span>{video.views} views</span>
                <span className="mx-1">•</span>
                <span>{formatRelativeTime(video.uploadDate)}</span>
                <span className="mx-1">•</span>
                <div className="flex items-center text-yellow-500 text-xs">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
                  </svg>
                  <span className="ml-0.5">{formatPoints(video.points)}</span>
                </div>
              </div>
            </div>

            {/* Options Button */}
            <button className="p-1 h-fit text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
