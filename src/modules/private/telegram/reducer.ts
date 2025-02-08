import { TelegramState, TELEGRAM_INITIAL_STATE } from './types';
import { TelegramActions } from './actions';
import * as actions from './actions';

export const telegramReducer = (
  state: TelegramState = TELEGRAM_INITIAL_STATE,
  action: TelegramActions
): TelegramState => {
  switch (action.type) {
    case actions.TELEGRAM_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case actions.TELEGRAM_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        error: null
      };

    case actions.TELEGRAM_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload
      };

    case actions.TELEGRAM_LOGOUT:
      return TELEGRAM_INITIAL_STATE;

    case actions.TELEGRAM_CHECK_AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case actions.TELEGRAM_CHECK_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        error: null
      };

    case actions.TELEGRAM_CHECK_AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload
      };

    default:
      return state;
  }
};
