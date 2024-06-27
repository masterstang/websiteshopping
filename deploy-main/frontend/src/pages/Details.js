import React, { useState } from "react";

/* REACT BOOTSTRAP */
import { Button, Card, Form } from "react-bootstrap";
import "../pages-css/list.css"



/* COMPONENTS */
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { saveBookingDetails } from "../actions/cartActions";
import { Box } from "@mui/system";

import { useTranslation } from 'react-i18next';

function Bookdetails({ history }) {
  const { t, i18n } = useTranslation();
  // PULLING OUT BOOKING DETAILS FROM CART
  const cart = useSelector((state) => state.cart);

  const { bookingDetails } = cart;

  // STATE
  const [namebook, setNamebook] = useState(bookingDetails.namebook);
  const [tel, setTel] = useState(bookingDetails.tel);
  const [bdate, setBdate] = useState(bookingDetails.bdate);
  const [bookgo, setBookgo] = useState(bookingDetails.bookgo);

  const dispatch = useDispatch();

  // HANDLERS
  const submitHandler = (e) => {
    e.preventDefault();

    /* FIRING OFF THE ACTION CREATORS USING DISPATCH TO SAVE DETAILS */
    dispatch(
      saveBookingDetails({
        namebook,
        tel,
        bdate,
        bookgo,
      })
    );

    // PUSHING USER TO PAYMENTS PAGE AFTER SAVING ADDRESS
    history.push("./payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <Card className="carddetails" sx={{ margin: '2%' }}>

        <Box className="bookdetails" sx={{ margin: '2%' }}>



          <h1>{t('Booking Details')}</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="bookname">
              <Form.Label>{t('Name')}</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Name"
                value={namebook ? namebook : ""}
                onChange={(e) => setNamebook(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>{t('Phonenumber')}</Form.Label>
              <Form.Control
                required
                type="phone"
                placeholder="Enter Phone"
                value={tel ? tel : ""}
                onChange={(e) => setTel(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="postalCode">
              <Form.Label>{t('Birthday')}</Form.Label>
              <Form.Control
                required
                type="date"
                value={bdate ? bdate : ""}
                onChange={(e) => setBdate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="country">
              <Form.Label>{t('Bookingdate')}</Form.Label>
              <Form.Control
                required
                type="date"

                value={bookgo ? bookgo : ""}
                onChange={(e) => setBookgo(e.target.value)}
              />
            </Form.Group>

            <Button className="my-3" type="submit" variant="primary">
              {t('Continue')}
            </Button>
          </Form>
      </Box>
    </Card>
    </FormContainer >
  );
}

export default Bookdetails;
