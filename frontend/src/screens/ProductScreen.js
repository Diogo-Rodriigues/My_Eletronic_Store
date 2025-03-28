import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import {
  fetchProductDetails,
  createReview 
} from "../redux/slices/productSlice";
  
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../redux/slices/cartSlice";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "rgba(12, 12, 20, 0.85)",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
    border: "1px solid rgba(0, 183, 255, 0.3)",
    position: "relative",
    overflow: "hidden",
  },
  backButton: {
    backgroundColor: "rgba(0, 183, 255, 0.1)",
    color: "#00b7ff",
    border: "1px solid rgba(0, 183, 255, 0.3)",
    padding: "8px 16px",
    borderRadius: "4px",
    transition: "all 0.3s ease",
    marginBottom: "20px",
    textDecoration: "none",
    display: "inline-block",
    "&:hover": {
      backgroundColor: "rgba(0, 183, 255, 0.2)",
      borderColor: "#00b7ff",
      transform: "translateY(-2px)",
      boxShadow: "0 5px 15px rgba(0, 183, 255, 0.2)",
    },
  },
  productImage: {
    width: "100%",
    borderRadius: "8px",
    boxShadow: "0 0 20px rgba(0, 183, 255, 0.2)",
    border: "1px solid rgba(0, 183, 255, 0.3)",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: "10px",
  },
  productInfo: {
    backgroundColor: "rgba(18, 18, 30, 0.7)",
    borderRadius: "8px",
    padding: "20px",
    border: "1px solid rgba(0, 183, 255, 0.2)",
  },
  productTitle: {
    color: "#00b7ff",
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: "600",
    marginBottom: "15px",
    textShadow: "0 0 5px rgba(0, 183, 255, 0.4)",
  },
  description: {
    color: "#f5f5f5",
    marginTop: "10px",
    fontSize: "0.95rem",
    lineHeight: "1.6",
  },
  price: {
    color: "#00e676",
    fontWeight: "bold",
    fontSize: "1.2rem",
    textShadow: "0 0 5px rgba(0, 230, 118, 0.4)",
  },
  cartCard: {
    backgroundColor: "rgba(18, 18, 30, 0.8)",
    borderRadius: "8px",
    border: "1px solid rgba(0, 183, 255, 0.3)",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
  },
  cartItem: {
    backgroundColor: "transparent",
    borderColor: "rgba(0, 183, 255, 0.2)",
    color: "#f5f5f5",
  },
  selectControl: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    color: "#f5f5f5",
    border: "2px solid rgba(0, 183, 255, 0.3)",
    borderRadius: "4px",
    padding: "8px",
    width: "100%",
    "&:focus": {
      borderColor: "#00b7ff",
      boxShadow: "0 0 0 2px rgba(0, 183, 255, 0.2)",
    },
  },
  addButton: {
    backgroundColor: "#00b7ff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    width: "100%",
    "&:hover": {
      backgroundColor: "#00e676",
      transform: "translateY(-2px)",
      boxShadow: "0 5px 15px rgba(0, 230, 118, 0.3)",
    },
    "&:disabled": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: "rgba(255, 255, 255, 0.3)",
    },
  },
  reviewSection: {
    backgroundColor: "rgba(18, 18, 30, 0.7)",
    borderRadius: "8px",
    padding: "20px",
    marginTop: "20px",
    border: "1px solid rgba(0, 183, 255, 0.2)",
  },
  reviewTitle: {
    color: "#00b7ff",
    fontFamily: "'Orbitron', sans-serif",
    marginBottom: "15px",
    fontSize: "1.5rem",
  },
  reviewForm: {
    "& .form-control": {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      color: "#f5f5f5",
      border: "1px solid rgba(0, 183, 255, 0.3)",
      "&:focus": {
        borderColor: "#00b7ff",
        boxShadow: "0 0 0 2px rgba(0, 183, 255, 0.2)",
      },
    },
    "& .form-label": {
      color: "#f5f5f5",
    },
  },
  reviewItem: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderColor: "rgba(0, 183, 255, 0.2)",
    marginBottom: "10px",
    color: "#f5f5f5",
  },
  reviewDate: {
    color: "rgba(245, 245, 245, 0.6)",
    fontSize: "0.9rem",
  },
  reviewerName: {
    color: "#00b7ff",
    fontWeight: "500",
  },
  signInLink: {
    color: "#00e676",
    fontWeight: "bold",
    textDecoration: "underline",
    textShadow: "0 0 8px rgba(0, 230, 118, 0.6)",
    padding: "0 5px",
    transition: "all 0.3s ease",
    borderRadius: "3px",
    "&:hover": {
      color: "#00b7ff",
      backgroundColor: "rgba(0, 183, 255, 0.1)",
      boxShadow: "0 0 10px rgba(0, 183, 255, 0.3)",
      textDecoration: "none",
    },
  }
}));

function ProductScreen({ match, history }) {
  const classes = useStyles();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.product.productDetails);
  const { product, loading, error } = productDetails;

  const userLogin = useSelector((state) => state.user);
  const { userDetails } = userLogin;

  const productReviewCreate = useSelector((state) => state.product.createReview);
  const { loading: loadingProductReview, error: errorProductReview, success: successProductReview } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    dispatch(fetchProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
    dispatch(addToCart(match.params.id, qty));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createReview(match.params.id, { rating, comment }));
  };

  return (
    <div className={classes.container}>
      <Link to="/" className={classes.backButton}>
        Go back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={3}>
              <img src={product.image} alt={product.name} className={classes.productImage} />
            </Col>

            <Col md={6}>
              <div className={classes.productInfo}>
                <Typography variant="h4" className={classes.productTitle}>
                  {product.name}
                </Typography>

                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={"#00e676"}
                />

                <Typography variant="h5" className={classes.price}>
                  Price: {product.price}€
                </Typography>

                <Typography className={classes.description}>
                  {product.description}
                </Typography>
              </div>
            </Col>

            <Col md={3}>
              <Card className={classes.cartCard}>
                <ListGroup variant="flush">
                  <ListGroup.Item className={classes.cartItem}>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong className={classes.price}>{product.price}€</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item className={classes.cartItem}>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <span style={{ color: "#00e676" }}>In Stock</span>
                        ) : (
                          <span style={{ color: "#ff1744" }}>Out of Stock</span>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item className={classes.cartItem}>
                      <Row>
                        <Col>Quantity:</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            className={classes.selectControl}
                          >
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item className={classes.cartItem}>
                    <Button
                      onClick={addToCartHandler}
                      className={`${classes.addButton} btn-tech-pulse`}
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className={classes.reviewSection}>
                <Typography variant="h4" className={classes.reviewTitle}>
                  Reviews
                </Typography>
                {product.reviews.length === 0 && (
                  <Message variant="info">No Reviews</Message>
                )}
                <ListGroup variant="flush">
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id} className={classes.reviewItem}>
                      <strong className={classes.reviewerName}>{review.name}</strong>
                      <Rating value={review.rating} color="#00e676" />
                      <p className={classes.reviewDate}>
                        {review.createdAt.substring(0, 10)}
                      </p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item className={classes.reviewItem}>
                    <h4 className={classes.reviewTitle}>Write a Review</h4>
                    {loadingProductReview && <Loader />}
                    {successProductReview && (
                      <Message variant="success">Review submitted successfully</Message>
                    )}
                    {errorProductReview && (
                      <Message variant="danger">{errorProductReview}</Message>
                    )}
                    {userDetails ? (
                      <Form onSubmit={submitHandler} className={classes.reviewForm}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          type="submit"
                          className={`${classes.addButton} mt-3`}
                          disabled={loadingProductReview}
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message variant="info">
                        Please <Link to="/login" className={classes.signInLink}>sign in</Link> to write a review
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
