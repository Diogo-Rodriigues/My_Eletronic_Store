import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import { fetchTopRatedProducts } from "../redux/slices/productSlice";
import { Box, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import Rating from "./Rating";

const useStyles = makeStyles((theme) => ({
  carouselContainer: {
    position: "relative",
    marginBottom: "2rem",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 0 30px rgba(0, 183, 255, 0.4)",
    border: "1px solid rgba(0, 183, 255, 0.3)",
    maxHeight: "250px", // Altura reduzida para layout horizontal
  },
  slideWrapper: {
    position: "relative",
    zIndex: 1,
    padding: "12px",
    display: "flex", // Layout horizontal
    alignItems: "center", // Centralizar verticalmente
    justifyContent: "center", // Centralizar horizontalmente
    height: "100%",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(10, 10, 18, 0.6)",
      zIndex: -1,
    },
  },
  productLink: {
    display: "flex",
    width: "90%",
    maxWidth: "900px",
    alignItems: "center",
    textDecoration: "none",
  },
  imageContainer: {
    width: "40%", // Imagem ocupa 40% do espaço
    padding: "8px",
    display: "flex",
    justifyContent: "center",
  },
  productImage: {
    height: "160px",
    width: "auto",
    maxWidth: "100%",
    objectFit: "contain",
    filter: "drop-shadow(0 0 10px rgba(0, 230, 118, 0.3))",
    transition: "transform 0.3s ease, filter 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      filter: "drop-shadow(0 0 15px rgba(0, 183, 255, 0.5))",
    },
  },
  productInfo: {
    width: "60%", // Informações ocupam 60% do espaço
    backgroundColor: "rgba(12, 12, 20, 0.85)",
    backdropFilter: "blur(10px)",
    padding: "15px",
    borderRadius: "8px",
    margin: "0 10px",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.5)",
    border: "1px solid rgba(0, 183, 255, 0.4)",
    textAlign: "center", // Alinhamento centralizado
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "2px",
      background: "linear-gradient(90deg, transparent, #00b7ff, transparent)",
      animation: "$glowLine 2s linear infinite",
    },
  },
  productName: {
    color: "#00b7ff",
    fontWeight: "600",
    textShadow: "0 0 5px rgba(0, 183, 255, 0.4)",
    fontSize: "1.1rem",
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: "1px",
    marginBottom: "8px",
    textAlign: "center", // Centralizar texto
  },
  productPrice: {
    color: "#00e676",
    fontSize: "1rem",
    fontWeight: "bold",
    display: "inline-block",
    padding: "3px 8px",
    borderRadius: "4px",
    background: "rgba(0, 230, 118, 0.1)",
    border: "1px solid rgba(0, 230, 118, 0.3)",
    marginTop: "8px",
  },
  customIndicator: {
    width: "10px",
    height: "10px",
    backgroundColor: "transparent",
    border: "2px solid rgba(0, 183, 255, 0.5)",
    borderRadius: "50%",
    margin: "0 5px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    position: "relative",
    "&.active": {
      backgroundColor: "#00b7ff",
      boxShadow: "0 0 10px #00b7ff",
    },
  },
  indicatorsContainer: {
    position: "absolute",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    zIndex: 10,
  },
  rating: {
    "& .MuiRating-iconFilled": {
      color: "#00b7ff",
    },
    "& span": {
      fontSize: "0.9rem",
    },
    textAlign: "center", // Centralizar
    display: "flex",
    justifyContent: "center", // Centralizar horizontalmente
    "& div": {
      justifyContent: "center", // Centralizar os itens
    }
  },
  reviewCount: {
    color: "#aaa",
    fontSize: "0.8rem",
    marginLeft: "5px",
  },
  circuitOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    opacity: 0.15,
    pointerEvents: "none",
    background: `
      linear-gradient(135deg, transparent 25%, rgba(0, 183, 255, 0.1) 25%, rgba(0, 183, 255, 0.1) 50%, transparent 50%, transparent 75%, rgba(0, 183, 255, 0.1) 75%)
    `,
    backgroundSize: "20px 20px",
  },
  customNavButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    width: "30px",
    height: "30px",
    minWidth: "30px", // Para Material-UI IconButton
    backgroundColor: "rgba(0, 183, 255, 0.15)",
    color: "#fff",
    border: "1px solid rgba(0, 183, 255, 0.2)",
    borderRadius: "50%",
    padding: 0,
    "&:hover": {
      backgroundColor: "rgba(0, 183, 255, 0.25)",
      boxShadow: "0 0 5px rgba(0, 183, 255, 0.3)",
    },
    "&:focus": {
      outline: "none",
    },
  },
  prevButton: {
    left: "10px",
  },
  nextButton: {
    right: "10px",
  },
  navIcon: {
    fontSize: "16px",
  },
  "@keyframes glowLine": {
    "0%": {
      transform: "translateX(-100%)",
    },
    "100%": {
      transform: "translateX(100%)",
    },
  },
}));

function ProductCarousel() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const topRatedProducts = useSelector((state) => state.product.topRatedProducts);
  const { error, loading, products } = topRatedProducts || { products: [] };
  
  useEffect(() => {
    dispatch(fetchTopRatedProducts());
  }, [dispatch]);

  const carouselRef = React.useRef(null);

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  // Custom indicator component
  const CustomIndicator = ({ active, onClick }) => (
    <div 
      className={`${classes.customIndicator} ${active ? 'active' : ''}`} 
      onClick={onClick}
    />
  );

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <Box className={classes.carouselContainer}>
      <div className={classes.circuitOverlay}></div>
      
      {/* Botões de navegação personalizados */}
      <IconButton 
        className={`${classes.customNavButton} ${classes.prevButton}`}
        onClick={handlePrev}
        aria-label="Previous slide"
        disableRipple={true}
      >
        <NavigateBefore className={classes.navIcon} />
      </IconButton>
      
      <IconButton 
        className={`${classes.customNavButton} ${classes.nextButton}`}
        onClick={handleNext}
        aria-label="Next slide"
        disableRipple={true}
      >
        <NavigateNext className={classes.navIcon} />
      </IconButton>
      
      <Carousel 
        ref={carouselRef}
        pause="hover" 
        interval={4500}
        indicators={false}
        controls={false}
      >
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Box className={classes.slideWrapper}>
              <Link to={`/product/${product._id}`} className={classes.productLink}>
                <Box className={classes.imageContainer}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className={classes.productImage}
                  />
                </Box>
                <Box className={classes.productInfo}>
                  <Typography className={classes.productName}>
                    {product.name}
                  </Typography>
                  <div className={classes.rating}>
                    <Rating 
                      value={product.rating}
                      text={`${product.numReviews} Reviews`}
                      color="#00e676"
                    />
                  </div>
                  <Typography className={classes.productPrice}>
                    {product.price}€
                  </Typography>
                </Box>
              </Link>
            </Box>
          </Carousel.Item>
        ))}
      </Carousel>
    </Box>
  );
}

export default ProductCarousel;
