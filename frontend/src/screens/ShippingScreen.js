import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../redux/slices/cartSlice";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formLabel: {
    color: "#f5f5f5",
    fontWeight: "500",
  },
  formControl: {
    backgroundColor: "rgba(40, 40, 40, 0.8)",
    color: "#f5f5f5",
    border: "1px solid rgba(0, 183, 255, 0.4)",
    "&:focus": {
      borderColor: "#00b7ff",
      boxShadow: "none",
      backgroundColor: "rgba(40, 40, 40, 0.8)",
    },
    "&::placeholder": {
      color: "#f5f5f5",
    },
    "&:not(:placeholder-shown)": {
      color: "#f5f5f5",
    },
  },
  title: {
    color: "#f5f5f5",
    fontWeight: "500",
  },
}));

function ShippingScreen({ history }) {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );
    history.push("./payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1 className={classes.title}>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label className={classes.formLabel}>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter your address"
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
            className={classes.formControl}
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label className={classes.formLabel}>City</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter the city"
            value={city ? city : ""}
            onChange={(e) => setCity(e.target.value)}
            className={classes.formControl}
          />
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label className={classes.formLabel}>Postal Code</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter the postal code"
            value={postalCode ? postalCode : ""}
            onChange={(e) => setPostalCode(e.target.value)}
            className={classes.formControl}
          />
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label className={classes.formLabel}>Country</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter the country"
            value={country ? country : ""}
            onChange={(e) => setCountry(e.target.value)}
            className={classes.formControl}
          />
        </Form.Group>

        <Button className="my-3" type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
