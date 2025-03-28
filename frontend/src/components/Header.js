import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Typography,
  Box,
} from "@material-ui/core";
import { ShoppingCart, AccountCircle } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import SearchBox from "./SearchBox";
import logo from "../logo.png";
import { logout } from "../redux/slices/userSlice";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#000000",
    borderBottom: "1px solid rgba(0, 183, 255, 0.3)",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.7)",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 16px",
    [theme.breakpoints.up("md")]: {
      padding: "0 24px",
    },
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    width: "25%", 
    minWidth: "200px",
  },
  centerSection: {
    display: "flex",
    justifyContent: "center",
    width: "50%", 
    padding: "0 16px",
  },
  rightSection: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "25%", 
  },
  menuItem: {
    minWidth: 180,
    backgroundColor: "#121212",
    color: "#f5f5f5",
    "&:hover": {
      backgroundColor: "#1e1e1e",
      color: "#00b7ff",
    },
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: 60,
    filter: "drop-shadow(0 0 8px rgba(0, 183, 255, 0.7))",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  searchContainer: {
    width: "100%",
    maxWidth: "500px",
  },
  iconButton: {
    color: "#f5f5f5",
    margin: theme.spacing(0, 1),
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#00b7ff",
      transform: "translateY(-2px)",
    },
  },
  menu: {
    "& .MuiPaper-root": {
      backgroundColor: "#121212",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.7)",
      border: "1px solid rgba(0, 183, 255, 0.3)",
    },
  },
  storeName: {
    fontFamily: "'Orbitron', 'Roboto', sans-serif",
    fontWeight: "bold",
    color: "#00b7ff",
    marginLeft: theme.spacing(2),
    letterSpacing: "1px",
    textShadow: "0 0 5px rgba(0, 183, 255, 0.5)",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const { userDetails } = userLogin;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    window.location.reload(); 
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {/* Seção Esquerda - Logo */}
        <Box className={classes.leftSection}>
          <Link to="/" className={classes.link}>
            <img
              src={logo}
              alt="ElectronicsStore"
              className={classes.logo}
            />
            <Typography variant="h5" className={classes.storeName}>
            ElectronicStore
            </Typography>
          </Link>
        </Box>

        {/* Seção Central - Barra de Pesquisa */}
        <Box className={classes.centerSection}>
          <div className={classes.searchContainer}>
            <SearchBox />
          </div>
        </Box>

        {/* Seção Direita - Ícones */}
        <Box className={classes.rightSection}>
          <IconButton
            aria-label="show cart items"
            className={classes.iconButton}
            component={Link}
            to="/cart"
          >
            <ShoppingCart />
          </IconButton>

          {userDetails ? (
            <>
              <IconButton
                edge="end"
                aria-label="current user account"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                className={classes.iconButton}
              >
                <AccountCircle />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleMenuClose}
                className={classes.menu}
              >
                <MenuItem
                  className={classes.menuItem}
                  component={Link}
                  to="/profile"
                  onClick={handleMenuClose}
                >
                  Profile
                </MenuItem>

                <MenuItem className={classes.menuItem} onClick={handleLogout}>
                  Exit
                </MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton
              aria-label="login"
              className={classes.iconButton}
              component={Link}
              to="/login"
            >
              <AccountCircle />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
