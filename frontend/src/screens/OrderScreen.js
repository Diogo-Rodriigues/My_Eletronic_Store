import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { payOrder } from "../redux/slices/orderSlice";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "rgba(18, 18, 30, 0.85)",
    borderRadius: "8px",
    padding: theme.spacing(3),
    boxShadow: "0 0 20px rgba(0, 183, 255, 0.3)",
  },
  title: {
    color: "#00b7ff !important", // Força o azul para os títulos
    textShadow: "0 0 5px rgba(0, 183, 255, 0.4)",
    marginBottom: theme.spacing(2),
  },
  tableHeader: {
    backgroundColor: "rgba(0, 183, 255, 0.1)",
    color: "#00b7ff",
  },
  table: {
    backgroundColor: "rgba(18, 18, 30, 0.85)",
    color: "#f5f5f5",
    border: "1px solid rgba(0, 183, 255, 0.4)",
  },
  cardDark: {
    backgroundColor: "rgba(18, 18, 30, 0.85)",
    border: "1px solid rgba(0, 183, 255, 0.4)",
    color: "#f5f5f5",
  },
  listItemDark: {
    backgroundColor: "rgba(18, 18, 30, 0.85)",
    border: "none",
    color: "#f5f5f5",
  },
  productImage: {
    backgroundColor: "transparent",
    borderRadius: "8px",
  },
  productLink: {
    color: "#ffffff",
    textDecoration: "none",
    "&:hover": {
      color: "#00b7ff",
    },
  },
  emailLink: {
    color: "#ffffff !important", 
    textDecoration: "underline",   
    "&:hover": {
      color: "#00b7ff",
    },
  },
}));

function OrderScreen({ history }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);

  const order = useSelector((state) => state.order);
  const { orderDetails, error, loading } = order;

  const userLogin = useSelector((state) => state.user);
  const { userDetails } = userLogin;

  let updatedOrderDetails = orderDetails;

  if (
    updatedOrderDetails &&
    updatedOrderDetails.orderItems &&
    updatedOrderDetails.orderItems.length > 0
  ) {
    const itemsPrice = updatedOrderDetails.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
    updatedOrderDetails = { ...updatedOrderDetails, itemsPrice };
  }

  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "I would put it here if I had it";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!userDetails) {
      history.push("/login");
    } else if (!orderDetails.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderDetails, history, userDetails]);

  const calculateItemsPrice = () => {
    if (orderDetails.orderItems && orderDetails.orderItems.length > 0) {
      return orderDetails.orderItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.price) * item.qty;
        return total + itemPrice;
      }, 0);
    }
    return 0;
  };

  const itemsPrice = calculateItemsPrice();

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderDetails._id, paymentResult));
    console.log(orderDetails._id);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className={classes.container}>
      <h1 className={classes.title}>Order: {orderDetails._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item className={classes.listItemDark}>
              <h2 className={classes.title}>Shipping</h2>
              <p>
                <strong>Name: {orderDetails.User.name}</strong>
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${orderDetails.User.username}`} className={classes.emailLink}>
                  {orderDetails.User.username}
                </a>
              </p>
              <p>
                <strong>Shipping address: </strong>
                {orderDetails.shippingAddress.address},{" "}
                {orderDetails.shippingAddress.city},{" "}
                {orderDetails.shippingAddress.postalCode},{" "}
                {orderDetails.shippingAddress.country}
              </p>
              {orderDetails.isDeliver ? (
                <Message variant="success">
                  Delivered on{" "}
                  {orderDetails.deliveredAt
                    ? orderDetails.deliveredAt.substring(0, 10)
                    : null}
                </Message>
              ) : (
                <Message variant="warning">Not delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item className={classes.listItemDark}>
              <h2 className={classes.title}>Payment</h2>
              <p>
                <strong>Payment method: </strong>
                {orderDetails.paymentMethod}
              </p>
              {orderDetails.isPaid ? (
                <Message variant="success">
                  Paid{" "}
                  {orderDetails.paidAt
                    ? orderDetails.paidAt.substring(0, 10)
                    : null}
                </Message>
              ) : (
                <Message variant="warning">Not paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item className={classes.listItemDark}>
              <h2 className={classes.title}>Orders</h2>
              {orderDetails.orderItems.length === 0 ? (
                <Message variant="info">Orders are empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {orderDetails.orderItems.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      className={classes.listItemDark}
                    >
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                            className={classes.productImage}
                          />
                        </Col>
                        <Col>
                          <Link
                            to={`/product/${item.product}`}
                            className={classes.productLink}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X {item.price}€ ={" "}
                          {(item.qty * item.price).toFixed(2)}€
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
          <Card className={classes.cardDark}>
            <ListGroup variant="flush">
              <ListGroup.Item className={classes.listItemDark}>
                <h2 className={classes.title}>Total Orders</h2>
              </ListGroup.Item>
              <ListGroup.Item className={classes.listItemDark}>
                <Row>
                  <Col>Products costs:</Col>
                  <Col>{itemsPrice}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className={classes.listItemDark}>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>{orderDetails.shippingPrice}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className={classes.listItemDark}>
                <Row>
                  <Col>Taxes:</Col>
                  <Col>{orderDetails.taxPrice}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className={classes.listItemDark}>
                <Row>
                  <Col>Total:</Col>
                  <Col>{orderDetails.totalPrice}€</Col>
                </Row>
              </ListGroup.Item>
              {!orderDetails.isPaid && (
                <ListGroup.Item className={classes.listItemDark}>
                  {loading && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={orderDetails.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;

