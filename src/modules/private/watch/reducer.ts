"use client";

import {
  WatchState,
  FETCH_VIDEO_REQUEST,
  FETCH_VIDEO_SUCCESS,
  FETCH_VIDEO_FAILURE,
  ADD_VIEW_REQUEST,
  ADD_VIEW_SUCCESS,
  ADD_VIEW_FAILURE,
  FETCH_RELATED_VIDEOS_REQUEST,
  FETCH_RELATED_VIDEOS_SUCCESS,
  FETCH_RELATED_VIDEOS_FAILURE,
} from './types';

const initialState: WatchState = {
  video: null,
  comments: [],
  relatedVideos: [],
  loading: false,
  error: null,
};

export const watchReducer = (state = initialState, action: any): WatchState => {
  switch (action.type) {
    case FETCH_VIDEO_REQUEST:
    case ADD_VIEW_REQUEST:
    case FETCH_RELATED_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        video: action.payload,
        error: null,
      };
    case FETCH_RELATED_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        relatedVideos: action.payload,
        error: null,
      };
    case FETCH_VIDEO_FAILURE:
    case ADD_VIEW_FAILURE:
    case FETCH_RELATED_VIDEOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_VIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
