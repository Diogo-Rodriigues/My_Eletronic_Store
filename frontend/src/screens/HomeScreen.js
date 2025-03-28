import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCarousel from "../components/ProductCarousel";
import { fetchProductList } from "../redux/slices/productSlice";
import Paginate from "../components/Paginate";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sectionTitle: {
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: "600",
    fontSize: "1.8rem",
    color: "#00b7ff",
    textShadow: "0 0 5px rgba(0, 183, 255, 0.4)",
    margin: "30px 0 15px 0",
    position: "relative",
    display: "inline-block",
    paddingLeft: "15px",
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: "50%",
      width: "5px",
      height: "70%",
      transform: "translateY(-50%)",
      background: "linear-gradient(to bottom, #00b7ff, #00e676)",
      borderRadius: "3px",
    },
  },
  carouselContainer: {
    position: "relative",
    marginBottom: "40px",
    "&::before": {
      content: '""',
      position: "absolute",
      left: "50%",
      bottom: "-20px",
      transform: "translateX(-50%)",
      width: "60%",
      height: "1px",
      background: "linear-gradient(90deg, transparent, #00b7ff, transparent)",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      left: "50%",
      bottom: "-25px",
      transform: "translateX(-50%)",
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      background: "#00b7ff",
      boxShadow: "0 0 10px #00b7ff, 0 0 20px #00b7ff",
    },
  },
  techCorner: {
    position: "absolute",
    width: "20px",
    height: "20px",
    borderRadius: "0",
    border: "2px solid #00b7ff",
    boxShadow: "0 0 5px rgba(0, 183, 255, 0.5)",
    backgroundColor: "transparent",
    pointerEvents: "none",
    zIndex: 1,
  },
  topLeft: {
    top: "-5px",
    left: "-5px",
    borderRight: "none",
    borderBottom: "none",
  },
  topRight: {
    top: "-5px",
    right: "-5px",
    borderLeft: "none",
    borderBottom: "none",
  },
  bottomLeft: {
    bottom: "-5px",
    left: "-5px",
    borderRight: "none",
    borderTop: "none",
  },
  bottomRight: {
    bottom: "-5px",
    right: "-5px",
    borderLeft: "none",
    borderTop: "none",
  },
  productGrid: {
    position: "relative",
    padding: "15px 0",
  },
  techPanel: {
    height: "2px",
    background: "linear-gradient(90deg, transparent, #00b7ff, transparent)",
    width: "100%",
    margin: "5px 0 25px 0",
    position: "relative",
    animation: "$techPulse 2s infinite",
  },
  "@keyframes techPulse": {
    "0%, 100%": {
      opacity: 0.3,
      height: "1px",
    },
    "50%": {
      opacity: 1,
      height: "2px",
    },
  },
}));

function HomeScreen({ history }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);
  const topRatedProducts = useSelector((state) => state.product.topRatedProducts);

  const { products, loading, error, page, pages } = productList;
  const { pageNumber } = useParams()
  const { products: topProducts, loading: topLoading, error: topError } = topRatedProducts;
  console.log(productList)
  let keyword =
    history.location
      .search;
  console.log(keyword)
  useEffect(() => {
    dispatch(fetchProductList(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);


  return (
    <Container>
      {!keyword && (
        <>
          <Typography className={classes.sectionTitle} variant="h4">
            BEST RATED
          </Typography>
          <Box className={classes.carouselContainer}>
            <div className={`${classes.techCorner} ${classes.topLeft}`}></div>
            <div className={`${classes.techCorner} ${classes.topRight}`}></div>
            <div className={`${classes.techCorner} ${classes.bottomLeft}`}></div>
            <div className={`${classes.techCorner} ${classes.bottomRight}`}></div>
            <ProductCarousel />
          </Box>
        </>
      )}

      <Typography className={classes.sectionTitle} variant="h4">
        LATEST PRODUCTS
      </Typography>
      <div className={classes.techPanel}></div>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className={classes.productGrid}>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </div>
      )}
      <Paginate page={page} pages={pages} keyword={keyword} />
    </Container>
  );
}


export default HomeScreen;

 