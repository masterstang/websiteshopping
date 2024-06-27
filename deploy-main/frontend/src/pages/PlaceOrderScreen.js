import React, { useEffect } from "react";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";

/* COMPONENTS */
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import "../pages-css/list.css"


/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { createOrder } from "../actions/orderActions";

/* ACTION TYPES */
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

import { useTranslation } from 'react-i18next';
import configs from "../config";

function PlaceOrderScreen({ history }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const orderCrate = useSelector((state) => state.orderCreate);

  const { order, error, success } = orderCrate;

  const cart = useSelector((state) => state.cart);

  // PRICE CALCULATIONS, WE ARE SETTING AN ATTRIBUTE TO OUR CART OBJECT BUT IT WON'T UPDATE OUR STATE, IT'S JUST FOR THIS PAGE
  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  cart.taxPrice = Number(0.07 * cart.itemsPrice).toFixed(2);

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  // REDIRECT
  if (!cart.paymentMethod) {
    history.push("/payment");
  }

  /* IF ORDER SUCCESSFULL AND WE HAVE ORDER ID, SEND USER TO USERS ACCOUNT TO VIEW THE ORDER */
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);

      // RESET STATE
      dispatch({
        type: ORDER_CREATE_RESET,
      });
    }
    // eslint-disable-next-line
  }, [success, history]);

  // HANDLERS
  const placeorder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        bookingDetails: cart.bookingDetails,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
          <Card className="cardplaceorder" sx={{margin: '2%'}}>


            <ListGroup.Item>
              <h2>{t('Booking Details')}</h2>
              <strong>{t('Name')} : {cart.bookingDetails.namebook}</strong>
              <br></br>
              <strong>{t('Phonenumber')} : {cart.bookingDetails.tel}</strong>
              <br></br>
              <strong>{t('Birthday')} : {cart.bookingDetails.bdate}</strong>
              <br></br>
              <strong>{t('Bookingdate')} : {cart.bookingDetails.bookgo}</strong>

        
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>{t('Payment')}</h2>

              <p>
              <strong>{t('Payment Method')}: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>{t('Order Booking')}</h2>

              {cart.cartItems.length === 0 ? (
                <Message variant="info">{t('Your cart is empty')}</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={`${configs.UrlPrefix}${item.image}`}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} X {item.price} {t('THB')} = 
                          {(item.qty * item.price).toFixed(2)} {t('THB')}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
            </Card>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card className="ordersummary">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{t('Order Summary')}</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>{t('Price Package')} :</Col>

                  <Col>{cart.itemsPrice} {t('THB')}</Col>
                </Row>
              </ListGroup.Item>

              

              <ListGroup.Item>
                <Row>
                  <Col>{t('Tax')} :</Col>

                  <Col>{cart.taxPrice} {t('THB')}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>{t('Total')} :</Col>

                  <Col>{cart.totalPrice} {t('THB')}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="w-100"
                  disabled={cart.cartItems === 0}
                  onClick={placeorder}
                >
                  {t('Confirm Orders')}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
