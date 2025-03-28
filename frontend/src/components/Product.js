import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia, Paper, Typography, Box } from "@mui/material";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <Paper 
      elevation={6} 
      sx={{ 
        maxWidth: 345, 
        margin: "15px",
        background: 'linear-gradient(135deg, #1e1e1e 0%, #121212 100%)',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 10px 20px rgba(0, 183, 255, 0.3)'
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '3px',
          background: 'linear-gradient(90deg, #00b7ff, #00e676)',
          zIndex: 1
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '30%',
          height: '1px',
          background: 'linear-gradient(90deg, #00b7ff, transparent)',
          zIndex: 1,
          animation: 'slideLine 2s infinite ease-in-out alternate'
        },
        '@keyframes slideLine': {
          '0%': {
            transform: 'translateX(0)',
            opacity: 0.7,
            width: '30%'
          },
          '100%': {
            transform: 'translateX(235%)',
            opacity: 0.3,
            width: '10%'
          }
        }
      }}
      className="tech-card circuit-advanced"
    >
      <Box 
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#00e676',
          boxShadow: '0 0 10px #00e676',
          animation: 'pulse 1.5s infinite ease-in-out',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 0.5, transform: 'scale(0.8)' },
            '50%': { opacity: 1, transform: 'scale(1.2)' }
          },
          zIndex: 10
        }}
      />
      <CardActionArea component={Link} to={`/product/${product._id}`}>
        <Box 
          className="product-image-container" 
          sx={{ 
            padding: '20px', 
            background: 'rgba(0,0,0,0.4)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at center, transparent 30%, rgba(0, 183, 255, 0.1) 100%)',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              zIndex: 1
            },
            '&:hover::before': {
              opacity: 1
            }
          }}
        >
          <CardMedia
            component="img"
            sx={{ 
              objectFit: "contain", 
              height: 160,
              transition: 'all 0.4s ease',
              '&:hover': {
                transform: 'scale(1.08)',
                filter: 'drop-shadow(0 0 12px rgba(0, 183, 255, 0.6))'
              },
              filter: 'drop-shadow(0 0 8px rgba(0, 183, 255, 0.4))'
            }}
            image={product.image}
            alt={product.name}
            className="product-image"
          />
        </Box>
        <CardContent style={{textAlign:"center", background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a14 100%)' }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div"
            sx={{ 
              color: '#00b7ff', 
              fontWeight: 'bold',
              fontSize: '1rem',
              letterSpacing: '0.5px',
              textShadow: '0 0 5px rgba(0, 183, 255, 0.4)',
              fontFamily: "'Orbitron', sans-serif",
            }}
            className="neon-text tech-title"
          >
            {product.name}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{
              display:'flex',
              flexDirection:"column", 
              alignItems:'center',
              margin: '8px 0' 
            }} 
            component="div"
          >
            <Rating 
              value={product.rating}
              text={`${product.numReviews} Reviews`}
              color="#00e676"
            />
          </Typography>
          <Typography 
            variant="h6" 
            component="div"
            sx={{ 
              fontWeight: 'bold', 
              color: '#00e676',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '4px',
              padding: '5px 12px',
              display: 'inline-block',
              boxShadow: '0 0 8px rgba(0, 230, 118, 0.3)',
              border: '1px solid rgba(0, 230, 118, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, transparent, rgba(0, 230, 118, 0.2), transparent)',
                transform: 'translateX(-100%)',
                animation: 'shine 2s infinite',
                zIndex: 1
              },
              '@keyframes shine': {
                '0%': { transform: 'translateX(-100%)' },
                '60%, 100%': { transform: 'translateX(100%)' }
              }
            }}
          >
            {product.price}€
          </Typography>
          <Box
            sx={{
              margin: '12px auto 0',
              width: '70%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(0, 183, 255, 0.3), transparent)',
            }}
          />
          <Typography 
            variant="body2" 
            component="div"
            sx={{ 
              marginTop: '8px',
              fontSize: '0.8rem',
              color: 'rgba(245, 245, 245, 0.7)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 500
            }}
          >
            High-Tech Electronics
          </Typography>
        </CardContent>
      </CardActionArea>
    </Paper>
  );
}

export default Product;
