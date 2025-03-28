import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, IconButton } from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import Message from "../components/Message";
import { removeFromCart } from "../redux/slices/cartSlice";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "rgba(12, 12, 20, 0.85)",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
    border: "1px solid rgba(0, 183, 255, 0.3)",
    position: "relative",
    overflow: "hidden",
    marginBottom: "30px",
  },
  pageTitle: {
    color: "#00b7ff",
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: "600",
    marginBottom: "20px",
    textShadow: "0 0 5px rgba(0, 183, 255, 0.4)",
  },
  cartItem: {
    backgroundColor: "rgba(18, 18, 30, 0.7)",
    borderColor: "rgba(0, 183, 255, 0.2)",
    marginBottom: "10px",
    color: "#f5f5f5",
    borderRadius: "4px",
  },
  itemImage: {
    borderRadius: "4px",
    boxShadow: "0 0 10px rgba(0, 183, 255, 0.2)",
    border: "1px solid rgba(0, 183, 255, 0.3)",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: "5px",
  },
  itemName: {
    color: "#00b7ff",
    textDecoration: "none",
    fontWeight: "500",
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#00e676",
      textDecoration: "none",
      textShadow: "0 0 5px rgba(0, 230, 118, 0.4)",
    },
  },
  itemQty: {
    color: "#f5f5f5",
    fontSize: "0.95rem",
  },
  itemPrice: {
    color: "#00e676",
    fontWeight: "bold",
    textShadow: "0 0 5px rgba(0, 230, 118, 0.3)",
  },
  deleteButton: {
    color: "#ff1744",
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#ff5252",
      transform: "translateY(-2px)",
    },
  },
  summaryCard: {
    backgroundColor: "rgba(18, 18, 30, 0.8)",
    borderRadius: "8px",
    border: "1px solid rgba(0, 183, 255, 0.3)",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
  },
  summaryItem: {
    backgroundColor: "transparent",
    borderColor: "rgba(0, 183, 255, 0.2)",
    color: "#f5f5f5",
  },
  summaryTitle: {
    color: "#00b7ff",
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: "600",
    marginBottom: "10px",
    fontSize: "1.5rem",
    textShadow: "0 0 5px rgba(0, 183, 255, 0.4)",
  },
  subtotalText: {
    color: "#f5f5f5",
    fontWeight: "500",
  },
  totalPrice: {
    color: "#00e676",
    fontWeight: "bold",
    fontSize: "1.2rem",
    textShadow: "0 0 5px rgba(0, 230, 118, 0.4)",
  },
  checkoutButton: {
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
  goBackLink: {
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
  },
}));

function CartScreen({ history }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((acc, item) => acc + parseInt(item.qty), 0);
  };

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((acc, item) => acc + (parseFloat(item.price) * parseInt(item.qty)), 0)
      .toFixed(2);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.pageTitle}>
        Shopping Cart
      </Typography>

      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message variant="info">
              Your cart is empty. <Link to="/" className={classes.goBackLink}>Go back to shopping</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product} className={classes.cartItem}>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fluid 
                        rounded 
                        className={classes.itemImage}
                      />
                    </Col>
                    <Col md={5}>
                      <Link to={`/product/${item._id}`} className={classes.itemName}>
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2} className={classes.itemQty}>
                      Qty: {item.qty}
                    </Col>
                    <Col md={2} className={classes.itemPrice}>
                      {parseFloat(item.price).toFixed(2)}€
                    </Col>
                    <Col md={1}>
                      <IconButton
                        aria-label="delete item"
                        className={classes.deleteButton}
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <Card className={classes.summaryCard}>
            <ListGroup variant="flush">
              <ListGroup.Item className={classes.summaryItem}>
                <Typography className={classes.summaryTitle} variant="h5">
                  Order Summary
                </Typography>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Typography className={classes.subtotalText}>
                    Items:
                  </Typography>
                  <Typography className={classes.subtotalText}>
                    {calculateTotalItems()}
                  </Typography>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <Typography className={classes.subtotalText}>
                    Total:
                  </Typography>
                  <Typography className={classes.totalPrice}>
                    {calculateTotalPrice()}€
                  </Typography>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className={classes.summaryItem}>
                <Button
                  variant="contained"
                  className={`${classes.checkoutButton} btn-tech-pulse`}
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CartScreen;
