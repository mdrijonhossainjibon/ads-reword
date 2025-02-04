import { 
  FETCH_VIDEO_REQUEST,
  FETCH_VIDEO_SUCCESS,
  FETCH_VIDEO_FAILURE,
  ADD_VIEW_REQUEST,
  ADD_VIEW_SUCCESS,
  ADD_VIEW_FAILURE,
  FETCH_RELATED_VIDEOS_REQUEST,
  FETCH_RELATED_VIDEOS_SUCCESS,
  FETCH_RELATED_VIDEOS_FAILURE,
  VideoData,
  RelatedVideo
} from './types';

export const fetchVideoRequest = (videoId: string) => ({
  type: FETCH_VIDEO_REQUEST,
  payload: videoId,
});

export const fetchVideoSuccess = (video: VideoData) => ({
  type: FETCH_VIDEO_SUCCESS,
  payload: video,
});

export const fetchVideoFailure = (error: string) => ({
  type: FETCH_VIDEO_FAILURE,
  payload: error,
});

export const addViewRequest = (videoId: string) => ({
  type: ADD_VIEW_REQUEST,
  payload: videoId,
});

export const addViewSuccess = () => ({
  type: ADD_VIEW_SUCCESS,
});

export const addViewFailure = (error: string) => ({
  type: ADD_VIEW_FAILURE,
  payload: error,
});

export const fetchRelatedVideosRequest = (videoId: string) => ({
  type: FETCH_RELATED_VIDEOS_REQUEST,
  payload: videoId,
});

export const fetchRelatedVideosSuccess = (videos: RelatedVideo[]) => ({
  type: FETCH_RELATED_VIDEOS_SUCCESS,
  payload: videos,
});

export const fetchRelatedVideosFailure = (error: string) => ({
  type: FETCH_RELATED_VIDEOS_FAILURE,
  payload: error,
});
