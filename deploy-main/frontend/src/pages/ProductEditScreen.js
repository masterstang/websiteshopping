import React, { useState, useEffect } from "react";

/* AXIOS */
import axios from "axios";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Button, Card, Form } from "react-bootstrap";
import { Divider } from "@mui/material";


/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import "../pages-css/list.css"


/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { listProductDetails, updateProduct } from "../actions/productActions";

/* ACTION TYPES */
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import { Box } from "@mui/material";

import { useTranslation } from 'react-i18next';
import configs from "../config";

function ProductEditScreen({ match, history }) {
  const { t, i18n } = useTranslation();
  /* GETTING USER ID FROM URL */
  const productId = match.params.id;

  /* STATE */
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = productUpdate;

  useEffect(() => {
    // CHECK IF PRODUCT WAS UDPATED
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== Number(productId)) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, product, productId, history, successUpdate]);

  /* HANDLERS */

  const submitHandler = (e) => {
    e.preventDefault();

    // DISPATCH TO UDPATE PRODUCT
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        countInStock,
        description,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", productId);

    setUploading(true);

    try {
      const config = {
        header: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `${configs.UrlPrefix}/api/products/upload/`,
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <div>
      <Link className="btn btn-light my-3" to="/admin/productlist">{t('Go Back')}</Link>

      <FormContainer>
      <Card  className="cardorderlist" sx={{margin: '2%'}}>
      <Box sx={{margin:'2%' }}>
        <h1>{t('Edit Package')}</h1>
        <Divider />


        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Box sx={{ margin: '2%' }}>
              <Form.Group controlId="name">
                <Form.Label>{t('Package Name')}</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Package Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label>{t('Price')}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label>{t('Image')}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />

                <Form.File
                  id="image-file"
                  label="Choose File"
                  custom
                  onChange={uploadFileHandler}
                />

                {uploading && <Loader />}
              </Form.Group>

              <Form.Group controlId="countinstock">
                <Form.Label>{t('Maximum People')}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Maximum"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="category">
                <Form.Label>{t('Category')}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>{t('Description')}</Form.Label>
                <Form.Control
                  rows="10"

                  as="textarea"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="mt-3">
                {t('Update')}
              </Button>
            </Box>
          </Form>
        )}
        </Box>
        </Card>

      </FormContainer >
    </div>
  );
}

export default ProductEditScreen;
