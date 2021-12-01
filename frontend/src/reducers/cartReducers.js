import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  if (action.type === CART_ADD_ITEM) {
    const item = action.payload;
    const existsItem = state.cartItems.find((i) => i.product === item.product);

    if (existsItem) {
      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x.product === existsItem.product ? item : x
        ),
      };
    } else {
      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };
    }
  }
  if (action.type === CART_REMOVE_ITEM) {
    return {
      ...state,
      cartItems: state.cartItems.filter(
        (item) => item.product !== action.payload
      ),
    };
  } else {
    return state;
  }
};
