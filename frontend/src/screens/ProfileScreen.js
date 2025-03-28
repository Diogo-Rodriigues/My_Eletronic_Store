import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateUser } from "../redux/slices/userSlice";
import { listMyOrders, getOrderDetails } from "../redux/slices/orderSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import CancelIcon from '@mui/icons-material/Cancel';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    backgroundColor: "rgba(18, 18, 30, 0.85)", // Fundo escuro
    borderRadius: "8px",
    padding: theme.spacing(3),
    boxShadow: "0 0 20px rgba(0, 183, 255, 0.3)",
  },
  title: {
    color: "#00b7ff",
    textShadow: "0 0 5px rgba(0, 183, 255, 0.4)",
    marginBottom: theme.spacing(2),
  },
  formLabel: {
    color: "#f5f5f5",
    fontWeight: "500",
  },
  formControl: {
    backgroundColor: "rgba(40, 40, 40, 0.8)", // Cor de fundo escura
    color: "#f5f5f5", // Cor do texto
    border: "1px solid rgba(0, 183, 255, 0.4)",
    "&:focus": {
      borderColor: "#00b7ff",
      boxShadow: "none", // Remover sombra ao focar
      backgroundColor: "rgba(40, 40, 40, 0.8)", // Manter a mesma cor de fundo
    },
    "&::placeholder": {
      color: "#f5f5f5", // Cor do texto do placeholder
    },
    "&:not(:placeholder-shown)": {
      color: "#f5f5f5", // Manter a cor do texto digitado
    },
  },
  dangerButton: {
    backgroundColor: "#ff1744",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#ff5252",
    },
  },
  ordersTable: {
    backgroundColor: 'rgba(18, 18, 30, 1)', // Fundo escuro sólido
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 0 20px rgba(0, 183, 255, 0.3)',
    border: '1px solid rgba(0, 183, 255, 0.4)',
    '& th, & td': {
      color: '#f5f5f5 !important',
      borderColor: 'rgba(0, 183, 255, 0.2) !important',
    },
    '& thead': {
      backgroundColor: 'rgba(0, 183, 255, 0.1)',
      borderBottom: '2px solid rgba(0, 183, 255, 0.4)',
    },
    '& tbody tr:nth-of-type(even)': {
      backgroundColor: 'rgba(30, 30, 46, 0.7)',
    },
    '& tbody tr:hover': {
      backgroundColor: 'rgba(0, 183, 255, 0.05)',
    }
  },
  tableHeader: {
    color: '#00b7ff !important',
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: '1px',
  },
  tableCell: {
    padding: '16px !important',
    verticalAlign: 'middle !important',
  },
  detailButton: {
    backgroundColor: '#ff1744 !important',
    color: '#fff !important',
    border: 'none',
    padding: '6px 12px !important',
    '&:hover': {
      backgroundColor: '#ff5252 !important',
    }
  }
}));

function ProfileScreen({ history }) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userDetails, loading, error } = user;

  const order = useSelector((state) => state.order);
  const { listorder, loading: loadingOrders, error: errorOrders } = order;

  useEffect(() => {
    if (!userDetails) {
      history.push("/login");
    } else {
      dispatch(listMyOrders());
      setName(userDetails.name);
      setEmail(userDetails.username);
    }
  }, [dispatch, history, userDetails]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password does not match");
    } else {
      dispatch(updateUser(userDetails.id, { id: userDetails._id, name, email, password }));
      setMessage("");
    }
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(userDetails.id));
    history.push('/');
    window.location.reload();
  };

  return (
    <Row>
      <Col md={3}>
        <div className={classes.profileContainer}>
          <h2 className={classes.title}>User Profile</h2>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label className={classes.formLabel}>Name</Form.Label>
              <Form.Control
                required
                type="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={classes.formControl}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label className={classes.formLabel}>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={classes.formControl}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label className={classes.formLabel}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={classes.formControl}
              />
            </Form.Group>

            <Form.Group controlId="passwordConfirm">
              <Form.Label className={classes.formLabel}>Confirm your password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={classes.formControl}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Refresh
            </Button>
          </Form>
          <Button type="submit" variant="danger" className={`${classes.dangerButton} mt-3`} onClick={handleDeleteUser}>
            <div style={{ fontSize: "7px" }}><CancelIcon /> Account </div>
          </Button>
        </div>
      </Col>

      <Col md={9}>
        <h2 className={classes.title}>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table responsive className={classes.ordersTable}>
            <thead>
              <tr>
                <th className={`${classes.tableHeader} ${classes.tableCell}`}>ID</th>
                <th className={`${classes.tableHeader} ${classes.tableCell}`}>Date</th>
                <th className={`${classes.tableHeader} ${classes.tableCell}`}>Total</th>
                <th className={`${classes.tableHeader} ${classes.tableCell}`}>Paid</th>
                <th className={`${classes.tableHeader} ${classes.tableCell}`}>Delivered</th>
              </tr>
            </thead>

            <tbody>
              {listorder
                .filter((order) => order.isPaid)
                .map((order) => (
                  <tr key={order._id}>
                    <td className={classes.tableCell}>{order._id}</td>
                    <td className={classes.tableCell}>{order.createdAt?.substring(0, 10)}</td>
                    <td className={classes.tableCell}>${order.totalPrice}</td>
                    <td className={classes.tableCell}>
                      {order.isPaid ? (
                        order.paidAt?.substring(0, 10)
                      ) : (
                        <CancelIcon style={{ color: '#ff1744', fontSize: '1.2rem' }} />
                      )}
                    </td>
                    <td className={classes.tableCell}>
                      <LinkContainer to={`/orderDetail`}>
                        <Button 
                          className={classes.detailButton}
                          onClick={() => dispatch(getOrderDetails(order._id))}
                        >
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default ProfileScreen;