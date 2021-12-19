import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  PAYMENT_DETAILS_UPDATED,
  UPDATE_ISPAID,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from '../constants/orderConstants';
import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { userInfo } = userLogin;

    dispatch({ type: ORDER_CREATE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { userInfo } = userLogin;

    dispatch({ type: ORDER_DETAILS_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${orderId}`, config);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (orderId) => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { userInfo } = userLogin;

    dispatch({ type: ORDER_PAY_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/orders/stripe-checkout/${orderId}`,
      config
    );

    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    localStorage.setItem(
      'checkoutUrl',
      JSON.stringify({ url: data?.url, id: data?.id })
    );
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPaymentDetails = (paymentId) => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { userInfo } = userLogin;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/orders/payment-details/${paymentId}`,
      config
    );

    dispatch({ type: PAYMENT_DETAILS_UPDATED, payload: data });
  } catch (error) {
    console.log(error + 'Payment Details Error');
  }
};

export const updateIsPaid =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      const { userLogin } = getState();
      const { userInfo } = userLogin;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/updateIsPaid`,
        paymentResult,
        config
      );
      dispatch({ type: UPDATE_ISPAID, payload: data });
      localStorage.removeItem('cartItems');
    } catch (error) {
      console.log(error + 'Update ISPAID Error');
    }
  };

export const getMyOrders = () => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { userInfo } = userLogin;

    dispatch({ type: MY_ORDERS_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myOrders`, config);

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error + 'Payment Details Error');
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { userInfo } = userLogin;

    dispatch({ type: ORDER_LIST_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders`, config);

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateIsDelivered = (order) => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { userInfo } = userLogin;

    dispatch({ type: ORDER_DELIVER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/orders/${order._id}/updateIsDelivered`, {}, config);

    dispatch({ type: ORDER_DELIVER_SUCCESS });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
