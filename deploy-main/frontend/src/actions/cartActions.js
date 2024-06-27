/* AXIOS */
import axios from "axios";
import configs from "../config";

/* ACTION TYPES */
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_BOOKING_DETAILS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

/* ACTION CREATOR USED IN CartScreen COMPONENT */

/* FOR ADDING PRODUCTS TO CART */
export const addToCart = (id, qty) => async (dispatch, getState) => {
  // FETCHING PRODUCT DATA
  const { data } = await axios.get(`${configs.UrlPrefix}/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  // SETTING VALUE OF CART ITEMS IN LOCAL STORAGE
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

/* FOR REMOVING PRODUCTS FROM CART */
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  // SETTING VALUE OF CART ITEMS IN LOCAL STORAGE
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

/* ACTION CREATOR USED IN  COMPONENT */
export const saveBookingDetails = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_BOOKING_DETAILS,
    payload: data,
  });

  // SETTING VALUE OF ADDRESS IN LOCAL STORAGE
  localStorage.setItem("bookingDetails", JSON.stringify(data));
};

/* ACTION CREATOR USED IN PaymentScreen COMPONENT */
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  // SETTING VALUE OF PAYMENT METHOD IN LOCAL STORAGE
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
