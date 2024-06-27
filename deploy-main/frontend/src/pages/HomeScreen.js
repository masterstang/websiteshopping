import React, { useEffect } from "react";

/* REACT-BOOTSTRAP */
import { Row, Col } from "react-bootstrap";

/* COMPONENTS */
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import "../pages-css/home.css";


/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { listProducts } from "../actions/productActions";
import { Box, Card } from "@mui/material";

import "../pages-css/home.css";

import { useTranslation } from 'react-i18next';

function HomeScreen({ history }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const productList = useSelector((state) => state.productList);
  const { products, page, pages, loading, error } = productList;

  /* FIRING OFF THE ACTION CREATORS USING DISPATCH */

  let keyword =
    history.location
      .search; /* IF USER SEARCHES FOR ANYTHING THEN THIS KEYWORD CHANGES AND USE EFFECT GETS TRIGGERED */

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      <div className="homebg">
        <Card sx={{ bgcolor: "#ffff" }}>
          <h1>Welcome to PSU LOCAL GUIDE</h1>
        </Card>
      </div>
      <div className="toptop">{!keyword && <ProductCarousel />}</div>
      <div className="homebg">
        <Card sx={{ bgcolor: "#cfc7cd" }}>
          <h3>{t('ALL Package')}</h3>
        </Card>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Card className="cardaom" sx={{ padding: "30px", bgcolor: "#ffff" }}>
          <Row>
            {products.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Box>
                    <Product product={product} />
                  </Box>
                </Col>
              );
            })}
          </Row>
        </Card>
      )}
      <Box className="page">
        <Paginate page={page} pages={pages} keyword={keyword} />
      </Box>
    </div>
  );
}

export default HomeScreen;
