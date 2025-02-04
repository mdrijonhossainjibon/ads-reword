export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelName: string;
  channelAvatar: string;
  subscribers: string;
  views: number;
  likes: number;
  uploadDate: string;
  duration: string;
  videoUrl: string;
  tags?: string[];
  category?: string;
}

export interface Comment {
  id: string;
  content: string;
  username: string;
  avatar: string;
  likes: number;
  createdAt: string;
  replies?: Comment[];
}

export interface RelatedVideo {
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
}
