"use client";

import { FC, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/modules/app';
import { fetchVideoRequest, addViewRequest } from '@/modules/private/watch/actions';

import VideoPlayer from '@/components/watch/VideoPlayer';
import VideoInfo from '@/components/watch/VideoInfo';
import ActionButtons from '@/components/watch/ActionButtons';
import CommentsSection from '@/components/watch/CommentsSection';
import VideoList from '@/components/watch/VideoList';

interface Comment {
  id: string;
  content: string;
  username: string;
  avatar: string;
  likes: number;
  createdAt: string;
}

const VideoWatchPage: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { video, loading, error, relatedVideos } = useSelector((state: RootState) => state.private.watch);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      content: 'Great video! Keep up the good work ',
      username: 'Gaming Pro',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      likes: 245,
      createdAt: '2024-02-01T12:00:00Z'
    },
  ]);
  const [newComment, setNewComment] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hasViewed, setHasViewed] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Video started handler
  const handleVideoStart = useCallback(() => {
    if (!videoStarted && !hasViewed && video) {
      setVideoStarted(true);
      dispatch(addViewRequest(video.id));
      setHasViewed(true);
    }
  }, [video, videoStarted, hasViewed, dispatch]);

  // Subscribe handler
  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  // Share handler
  const handleShare = async () => {
    if (navigator.share && video) {
      try {
        await navigator.share({
          title: video.title,
          text: `Check out this video: ${video.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  // Download handler
  const handleDownload = () => {
    if (video) {
      const videoUrl = `/api/watch/${video.id}/download`;
      const link = document.createElement('a');
      link.href = videoUrl;
      link.setAttribute('download', `${video.title}.mp4`);
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Load more videos
  const handleLoadMore = () => {
    // Implement load more functionality if needed
  };

  // Fetch video data
  useEffect(() => {
    const videoId = window.location.pathname.split('/').pop();
    if (videoId) {
      dispatch(fetchVideoRequest(videoId));
    }
  }, [dispatch]);

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  if (error) {
     router.push('/mobile');
    return null;
  }

  if (!video) {
    return <div className="min-h-screen bg-black"></div>;
  }

  return (
    <div className="min-h-screen bg-black text-white font-roboto">
      <VideoPlayer
        videoId={video.id}
        onStart={handleVideoStart}
      />

      <VideoInfo
        title={video.title}
        views={video.views}
        uploadDate={video.uploadDate}
        channelName={video.channelName}
        channelAvatar={video.channelAvatar}
        subscribers={video.subscribers}
        isSubscribed={isSubscribed}
        onSubscribe={handleSubscribe}
        description={video.description}
        descriptionDetails={video.descriptionDetails}
      />

      <ActionButtons
        likes={video.likes}
        onLike={() => {}}
        onShare={handleShare}
        onDownload={handleDownload}
      />

      <CommentsSection
        comments={comments}
        showComments={showComments}
        setShowComments={setShowComments}
        newComment={newComment}
        setNewComment={setNewComment}
      />

      <VideoList
        videos={relatedVideos}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default VideoWatchPage;
