import React from "react";

/* REACT BOOTSTRAP */
import { Nav } from "react-bootstrap";

/* REACT ROUTER BOOTSTRAP */
import { LinkContainer } from "react-router-bootstrap";

import { useTranslation } from 'react-i18next';

function CheckoutSteps({ step1, step2, step3, step4 }) {
  const { t, i18n } = useTranslation();
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>{t('Login')}</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>{t('Login')}</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/details">
            <Nav.Link>{t('Details')}</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>{t('details')}</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>{t('Payment')}</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>{t('Payment')}</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>{t('Place Order')}</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>{t('Place Order')}</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
}

export default CheckoutSteps;
