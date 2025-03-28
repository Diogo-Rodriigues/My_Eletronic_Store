import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../redux/slices/orderSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "rgba(18, 18, 30, 0.85)",
    borderRadius: "8px",
    padding: theme.spacing(3),
    boxShadow: "0 0 20px rgba(0, 183, 255, 0.3)",
  },
  title: {
    color: "#00b7ff !important", 
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
  productLink: {
    color: "#ffffff",
    textDecoration: "none",
    "&:hover": {
      color: "#00b7ff",
    },
  },
  productImage: {
    backgroundColor: "transparent",
    borderRadius: "8px",
  },
}));



function PlaceOrderScreen({ history }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const { orderDetails, loading, error } = order;
  const cart = useSelector((state) => state.cart);
  
  const itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.082 * itemsPrice).toFixed(2));
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  if (!cart.paymentMethod) {
    history.push("/payment");
  }

  const data = {
    orderItems: cart.cartItems,
    shippingAddress: cart.shippingAddress,
    paymentMethod: cart.paymentMethod,
    itemsPrice: itemsPrice.toFixed(2).toString(),
    shippingPrice: shippingPrice.toFixed(2).toString(),
    taxPrice: taxPrice.toFixed(2).toString(),
    totalPrice: totalPrice.toString(),
  };

  const placeOrder = () => {
    dispatch(createOrder(data))
      .then(() => {
        setTimeout(() => {
          history.push(`/orderDetail`);
        }, 1000);
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <div className={classes.container}>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item className={classes.listItemDark}>
              <h2 className={classes.title}>Shipping</h2>
              <p>
                <strong>Shipping address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item className={classes.listItemDark}>
              <h2 className={classes.title}>Payment</h2>
              <p>
                <strong>Payment method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item className={classes.listItemDark}>
              <h2 className={classes.title}>Products Ordered</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index} className={classes.listItemDark}>
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
                          <Link to={`/product/${item.product}`} className={classes.productLink}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X {item.price}€ = {(item.qty * item.price).toFixed(2)}€
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
                  <Col>{itemsPrice.toFixed(2)}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className={classes.listItemDark}>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>{shippingPrice.toFixed(2)}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className={classes.listItemDark}>
                <Row>
                  <Col>Taxes:</Col>
                  <Col>{taxPrice}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className={classes.listItemDark}>
                <Row>
                  <Col>Total:</Col>
                  <Col>{totalPrice}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className={classes.listItemDark}>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item className={classes.listItemDark}>
                <Button
                  type="button"
                  className="w-100"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrder}
                >
                  Place your order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
