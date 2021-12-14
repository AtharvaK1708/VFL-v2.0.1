import {
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  PAYMENT_DETAILS_UPDATED,
  UPDATE_ISPAID,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
  if (action.type === ORDER_CREATE_REQUEST) {
    return {
      loading: true,
    };
  }
  if (action.type === ORDER_CREATE_SUCCESS) {
    return {
      loading: false,
      success: true,
      order: action.payload,
    };
  }
  if (action.type === ORDER_CREATE_FAIL) {
    return {
      loading: false,
      error: action.payload,
    };
  } else {
    return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  if (action.type === ORDER_DETAILS_REQUEST) {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === ORDER_DETAILS_SUCCESS) {
    return {
      loading: false,
      order: action.payload,
    };
  }
  if (action.type === ORDER_DETAILS_FAIL) {
    return {
      loading: false,
      error: action.payload,
    };
  } else {
    return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  if (action.type === ORDER_PAY_REQUEST) {
    return {
      loading: true,
    };
  }
  if (action.type === ORDER_PAY_SUCCESS) {
    return {
      loading: false,
      success: true,
      paymentDetails: action.payload,
    };
  }
  if (action.type === PAYMENT_DETAILS_UPDATED) {
    return {
      loading: false,
      success: true,
      paymentDetailsUpdated: action.payload,
    };
  }
  if (action.type === UPDATE_ISPAID) {
    return {
      ...state,
      updatedOrder: action.payload,
    };
  }
  if (action.type === ORDER_PAY_FAIL) {
    return {
      loading: false,
      error: action.payload,
    };
  }
  if (action.type === ORDER_PAY_RESET) {
    return {};
  } else {
    return state;
  }
};

export const myOrdersReducer = (state = { orders: [] }, action) => {
  if (action.type === MY_ORDERS_REQUEST) {
    return {
      loading: true,
    };
  }
  if (action.type === MY_ORDERS_SUCCESS) {
    return {
      loading: false,
      orders: action.payload,
    };
  }
  if (action.type === MY_ORDERS_FAIL) {
    return {
      loading: false,
      error: action.payload,
    };
  } else {
    return state;
  }
};
