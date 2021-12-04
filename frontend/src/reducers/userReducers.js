import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  if (action.type === USER_LOGIN_REQUEST) {
    return {
      loading: true,
    };
  }
  if (action.type === USER_LOGIN_SUCCESS) {
    return {
      loading: false,
      userInfo: action.payload,
    };
  }
  if (action.type === USER_LOGIN_FAIL) {
    return {
      loading: false,
      error: action.payload,
    };
  }
  if (action.type === USER_LOGOUT) {
    return {};
  } else {
    return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  if (action.type === USER_REGISTER_REQUEST) {
    return {
      loading: true,
    };
  }
  if (action.type === USER_REGISTER_SUCCESS) {
    return {
      loading: false,
      userInfo: action.payload,
    };
  }
  if (action.type === USER_REGISTER_FAIL) {
    return {
      loading: false,
      error: action.payload,
    };
  } else {
    return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  if (action.type === USER_DETAILS_REQUEST) {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === USER_DETAILS_SUCCESS) {
    return {
      loading: false,
      user: action.payload,
    };
  }
  if (action.type === USER_DETAILS_FAIL) {
    return {
      loading: false,
      error: action.payload,
    };
  } else {
    return state;
  }
};

export const userUpdateProfileReducer = (state = { user: {} }, action) => {
  if (action.type === USER_UPDATE_PROFILE_REQUEST) {
    return {
      loading: true,
    };
  }
  if (action.type === USER_UPDATE_PROFILE_SUCCESS) {
    return {
      loading: false,
      success: true,
      user: action.payload,
    };
  }
  if (action.type === USER_UPDATE_PROFILE_FAIL) {
    return {
      loading: false,
      error: action.payload,
    };
  } else {
    return state;
  }
};
