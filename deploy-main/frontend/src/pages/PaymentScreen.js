import React, { useState } from "react";

/* REACT BOOTSTRAP */
import { Button, Form, Col, Card } from "react-bootstrap";



/* COMPONENTS */
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import "../pages-css/list.css"


/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { savePaymentMethod } from "../actions/cartActions";

import { useTranslation } from 'react-i18next';

function PaymentScreen({ history }) {
  const { t, i18n } = useTranslation();
  // PULLING OUT BOOKING DETAILS FROM CART
  const cart = useSelector((state) => state.cart);

  const { bookingDetails } = cart;

  // STATE
  const [paymentMethod, setPaymentMethod] = useState("Bank Tranfer");

  /* IF NO BOOKING DETAILS THEN REDIRECT TO BOOKING DETAILS SCREEN */
  if (!bookingDetails.namebook) {
    history.push("./details");
  }

  // HANDLERS

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));

    // AFTER CHOSING THE PAYMENT METHOD REDIRECT USER TO PlaceOrder SCREEN
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>
        <Card className="Cardpayment" sx={{ margin: '20%' }}>
          <Form.Group>
            <Form.Label className="boxselectmethod" as="legend">{t('Select Method')}</Form.Label>
            <Col>
              <div className="boxselectmethod">

                <Form.Check
                  type="radio"
                  label="Banking Tranfer"
                  id="BankingTranfer"
                  name="paymentMethod"
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </div>

            </Col>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-3">
          {t('Continue')}
        </Button>
      </Card>
    </Form>
    </FormContainer >
  );
}

export default PaymentScreen;

