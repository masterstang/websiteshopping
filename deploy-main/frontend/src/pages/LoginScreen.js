import React, { useState, useEffect } from "react";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Row, Col, Button, Form } from "react-bootstrap";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { login } from "../actions/userActions";
import "../pages-css/list.css"
import Divider from '@mui/material/Divider';
import { Box } from "@mui/material";

import { useTranslation } from 'react-i18next';

function LoginScreen({ location, history }) {
  const { t, i18n } = useTranslation();
  /* STATE */
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();

  /* SETTING UP REDIRECT */
  const redirect = location.search ? location.search.split("=")[1] : "/";

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo, loading, error } = userLogin;

  /* REDIRECTING AN ALREADY LOGGED IN USER, AS WE DON'T WANT THEM TO SEE THE LOGIN PAGE */
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  /* HANDLERS */

  const submitHandler = (e) => {
    e.preventDefault();

    /* FIRING OFF THE ACTION CREATORS USING DISPATCH FOR LOGIN */
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
       <Box className="boxlogin" sx={{margin:'2%' ,bgcolor:'#ffffff',borderRadius:'2%' }}>
      <div className="boxsignin">

      <h1>{t('Sign In')}</h1>

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <div className="boxsignin">
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>{t('Email Address')}</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>{t('Password')}</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          {t('Sign In')}
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          {t('New Customer ?')}{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            {t('Register')}
          </Link>
        </Col>
      </Row>
      </div>
      </div>
      </Box>

    </FormContainer>
  );
}

export default LoginScreen;
