/* ACTION TYPES */
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_BOOKING_DETAILS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
} from "../constants/cartConstants";

/* REDUCER USED IN CartScreen & Bookingdetails COMPONENT */
export const cartReducer = (
  state = {
    cartItems: [],
    bookingDetails: {},
  },
  action
) => {
  switch (action.type) {
    // IF ITEM DOESN'T EXIST IN CART WE ADD IT, IF IT ALREADY EXISTS THEN WE UPDATE IT'S QUANTITY

    /* CartScreen COMPONENT */

    case CART_ADD_ITEM: {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    }

    case CART_REMOVE_ITEM: {
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    }

    /* bookingDetailsScreen COMPONENT */

    case CART_SAVE_BOOKING_DETAILS:
      return {
        ...state,
        bookingDetails: action.payload,
      };

    /* PaymentScreen COMPONENT */

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    /* PlaceOrderScreen COMPONENT */
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
