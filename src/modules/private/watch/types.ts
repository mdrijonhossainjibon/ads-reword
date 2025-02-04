export interface VideoData {
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
  descriptionDetails: {
    text: string;
    uploadDate: string;
    category: string;
    tags: string[];
  }
  youtubeId : string;
  points : string;
  relatedVideos : any[]
}

export interface Comment {
  id: string;
  content: string;
  username: string;
  avatar: string;
  likes: number;
  createdAt: string;
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
  youtubeId : string;
  points : string
}

export interface WatchState {
  video: VideoData | null;
  comments: Comment[];
  relatedVideos: RelatedVideo[];
  loading: boolean;
  error: string | null;
}

export const FETCH_VIDEO_REQUEST = 'watch/FETCH_VIDEO_REQUEST';
export const FETCH_VIDEO_SUCCESS = 'watch/FETCH_VIDEO_SUCCESS';
export const FETCH_VIDEO_FAILURE = 'watch/FETCH_VIDEO_FAILURE';

export const ADD_VIEW_REQUEST = 'watch/ADD_VIEW_REQUEST';
export const ADD_VIEW_SUCCESS = 'watch/ADD_VIEW_SUCCESS';
export const ADD_VIEW_FAILURE = 'watch/ADD_VIEW_FAILURE';

export const FETCH_RELATED_VIDEOS_REQUEST = 'watch/FETCH_RELATED_VIDEOS_REQUEST';
export const FETCH_RELATED_VIDEOS_SUCCESS = 'watch/FETCH_RELATED_VIDEOS_SUCCESS';
export const FETCH_RELATED_VIDEOS_FAILURE = 'watch/FETCH_RELATED_VIDEOS_FAILURE';
