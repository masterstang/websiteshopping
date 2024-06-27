import React, { useEffect, useState } from "react";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Row, Col, ListGroup, Image, Card, Button, Form } from "react-bootstrap";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import {
  getOrderDetails,
  payOrder,
  confirmOrder,
} from "../actions/orderActions";

/* ACTION TYPES */
import {
  ORDER_PAY_RESET,
  ORDER_CONFIRM_RESET,
} from "../constants/orderConstants";

import { useTranslation } from 'react-i18next';
import configs from "../config";
import { Box, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

function OrderScreen({ history, match }) {
  const { t, i18n } = useTranslation();
  const orderId = match.params.id;

  const dispatch = useDispatch();


  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderConfirm = useSelector((state) => state.orderConfirm);
  const { loading: loadingConfirm, success: successConfirm } = orderConfirm;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [image, setImage] = useState();
  const [dis ,setDis] = useState(false);

  // ITEMS PRICE GETS CALCULATED ONLY IF WE HAVE AN ORDER
  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }


  useEffect(() => {
    // IS USER IS NOT LOGGED IN THEN REDIRECT TO LOGIN PAGE
    if (!userInfo) {
      history.push("/login");
    }

    // CHECK IF WE HAVE THE ORDER DETAILS, IF NOT DISPATCH AN ACTION TO GET THE ORDER DETAILS
    if (
      !order ||
      successPay ||
      order._id !== Number(orderId) ||
      successConfirm
    ) {
      dispatch({ type: ORDER_PAY_RESET });

      dispatch({ type: ORDER_CONFIRM_RESET });

      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId, successPay, successConfirm, history, userInfo]);

  /* HANDLERS */
  const successPaymentHandler = () => {
    dispatch(payOrder(orderId));
  };
  const uplodeslip = () => {
    
    const uploadData = new FormData();
    uploadData.append('slip', image);
    uploadData.append("order_id", orderId);


    fetch(`${configs.UrlPrefix}/api/orders/slip/`, {
      method: 'POST',
      body: uploadData
    })
    setDis(true)
  };

  const confirmHandler = () => {
    dispatch(confirmOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>{t('Order')}: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
            <h2>{t('Details')}</h2>

              <p>
                <strong>{t('Name')}: {order.User.name}</strong>
              </p>

              <p>
                <strong>{t('Email')}: </strong>
                <a href={`mailto:${order.User.email}`}>{order.User.email}</a>
              </p>

              <p>
                <strong>{t('Name Booking')} : </strong>{order.bookingDetails.namebook}
                </p>
                <p>
                <strong>{t('Phone Number')} : </strong>{order.bookingDetails.tel}
                </p>
                <p>
                <strong>{t('Birthday')} : </strong>{order.bookingDetails.bdate}
                </p>
                <p>
                <strong>{t('Booking date')} : </strong>{order.bookingDetails.bookgo}
              </p>

              {order.isConfirm ? (
                <Message variant="success">
                  {t('Confirm on')}{" "}
                  {order.confirmAt
                    ? order.confirmAt.substring(0, 10)
                    : null}
                </Message>
              ) : (
                <Message variant="warning">{t('Not Confirm')}</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>{t('Payment')}</h2>

              <p>
                <strong>{t('Payment Method')}: </strong>
                {order.paymentMethod}
              </p>
              <Box className='prompay'>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="500"
                      image="prompay.png"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        <div>
                          Account Name: นาย ปณัฐฑรณ์ ชนาชน
                        </div>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>


              {order.isPaid ? (
                <Message variant="success">
                  {t('Paid Date')} {order.paidAt ? order.paidAt.substring(0, 10) : null}
                  <br></br>
                  {t('Paid Time')} {order.paidAt ? order.paidAt.substring(11, 19) : null}
                </Message>
              ) : (
                <Message variant="warning">{t('Not Paid')}</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>{t('Order Items')}</h2>

              {order.orderItems.length === 0 ? (
                <Message variant="info">{t('Order is empty')}</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
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
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{t('Order Summary')}</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>{t('Items')}:</Col>

                  <Col>{order.itemsPrice} {t('THB')}</Col>
                </Row>
              </ListGroup.Item>



              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>

                  <Col>{order.taxPrice} {t('THB')}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>

                  <Col>{order.totalPrice} {t('THB')}</Col>
                </Row>
              </ListGroup.Item>
              {loadingPay && <Loader />}
              {!order.isPaid && (
                <Form>
                  <ListGroup.Item>
                    <Form.File
                      id="image-file"
                      label="Choose File"
                      custom
                      required
                      onChange={(evt) => setImage(evt.target.files[0])}
                    />
                    <button
                      type="submit"
                      className="btn btn-success"
                      required
                      onClick={() => uplodeslip()}
                      disabled={dis}

                    >
                      UPLOADE
                    </button>
                    <p>

                    </p>
                  </ListGroup.Item>
                </Form>
              )}
            </ListGroup>
            {!order.isPaid && (
            <ListGroup>
              <Button
                type="submit"
                className="btn w-100"
                amount={order.totalPrice}
                onClick={successPaymentHandler}
              >
                {t('UPLOADE PAMENT SLIP')}
              </Button>

            </ListGroup>
            )}

            {loadingConfirm && <Loader />}

            {order.isPaid && (
              <ListGroup.Item>
                <Image
                  src={`${configs.UrlPrefix}${order.slip}`}
                  fluid
                  rounded
                />

              </ListGroup.Item>
            )}

            {loadingConfirm && <Loader />}

            {userInfo && userInfo.isAdmin && order.isPaid && !order.isConfirm && (
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn w-100"
                  onClick={confirmHandler}
                >
                  {t('Confirm')}
                </Button>
              </ListGroup.Item>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;