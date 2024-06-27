import React, { useEffect } from "react";

/* REACT ROUTER BOOTSTRAP */
import { LinkContainer } from "react-router-bootstrap";

/* REACT BOOTSTRAP */
import { Table, Button, Card } from "react-bootstrap";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";
import "../pages-css/list.css"


/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { listOrders } from "../actions/orderActions";
import { Box, Divider } from "@mui/material";

import { useTranslation } from 'react-i18next';

function OrderListScreen({ history }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  /* PULLING OUT STATE */
  const orderList = useSelector((state) => state.orderList);
  const { orders, loading, error } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // WE DON'T WANT NON ADMINS TO ACCESS THIS PAGE SO REDIRECT IF SOMEBODY TRIES TO

    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  /* HANDLER */

  return (
    <Card className="cardorderlist" sx={{margin: '2%'}}>
    <Box sx={{margin:'2%',}}>

    <div>
      <h1>Orders</h1>
      <Divider />
      <Box sx={{margin:'2%' }}>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>{t('ID')}</th>
              <th>{t('USER')}</th>
              <th>{t('DATE')}</th>
              <th>{t('TOTAL')}</th>
              <th>{t('PAID')}</th>
              <th>{t('CONFIRM')}</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.User && order.User.name}</td>
                <td>{order.createdAt && order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>

                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  {order.isConfirm ? (
                    order.confirmAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="dark" className="btn-sm">
                      {t('Details')}
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      </Box>


    </div>
    </Box>
    </Card>
  );
}

export default OrderListScreen;
